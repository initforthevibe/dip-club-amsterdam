#!/usr/bin/env node
/**
 * Renders scripts/og/og-image.html to public/og-image.png at 1200×630.
 *
 * Uses headless Chrome directly, so there is no npm dependency to install.
 * Point CHROME_PATH at a binary if none of the defaults resolve.
 *
 *   node scripts/og/render.mjs
 */
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, statSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const source = join(here, "og-image.html");
const output = join(root, "public/og-image.png");

const CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const chrome = CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error("No Chrome binary found. Set CHROME_PATH and retry.");
  process.exit(1);
}

if (existsSync(output)) unlinkSync(output);

const profile = mkdtempSync(join(tmpdir(), "dipclub-og-"));
const child = spawn(chrome, [
  "--headless",
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  "--disable-sync",
  "--hide-scrollbars",
  // The card loads Switzer and the logo over file:// — Chrome blocks those
  // subresource reads from a file:// document without this flag.
  "--allow-file-access-from-files",
  "--force-device-scale-factor=1",
  "--window-size=1200,630",
  `--user-data-dir=${profile}`,
  `--screenshot=${output}`,
  `file://${source}`,
], { stdio: "ignore" });

// Chrome's new headless mode writes the screenshot but does not exit, so poll
// for the file and stop the process once its size settles.
let ok = false;
let previous = -1;
for (let i = 0; i < 60; i++) {
  await sleep(500);
  if (!existsSync(output)) continue;
  const { size } = statSync(output);
  if (size > 0 && size === previous) { ok = true; break; }
  previous = size;
}

child.kill("SIGKILL");
rmSync(profile, { recursive: true, force: true });

if (!ok) {
  console.error("Timed out waiting for the screenshot.");
  process.exit(1);
}
console.log(`Wrote ${output} (${statSync(output).size} bytes)`);
