import ScrollReveal from "./ScrollReveal";

type Stat = { value: string; label: string };
type StatsBarProps = { stats: Stat[] };

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="bg-paper py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
        <div className="grid grid-cols-3 gap-8 border-y border-ink/10 py-10 lg:py-14">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div>
                <p className="text-5xl font-medium tracking-[-0.02em] sm:text-6xl lg:text-7xl">
                  {stat.value}
                </p>
                <p className="type-micro mt-3 text-ink/45">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
