import SectionPanel from "./ui/SectionPanel";
import Button from "./ui/Button";
import { SITE } from "@/lib/site";

type JoinPanelProps = {
  title?: string;
  body?: string;
};

export default function JoinPanel({
  title = "Join the community.",
  body = "Be the first to know about upcoming dips, excursions, and adventures.",
}: JoinPanelProps) {
  return (
    <section className="bg-paper py-12 lg:py-16">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
        <SectionPanel tone="dark">
          <div className="max-w-xl">
            <h2 className="type-statement">{title}</h2>
            <p className="type-body mt-4 text-white/65">{body}</p>
            <div className="mt-8">
              <Button href={SITE.whatsapp} variant="primary">
                Join the WhatsApp community
              </Button>
            </div>
          </div>
        </SectionPanel>
      </div>
    </section>
  );
}
