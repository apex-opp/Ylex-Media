import { cn } from "@/lib/utils";

export default function SectionHeading({
  kicker,
  title,
  subtitle,
  className,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
        <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-glowCyan" />
        <span className="uppercase tracking-[0.22em]">{kicker}</span>
      </div>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle ? (
        <p className="mt-3 text-balance text-base leading-relaxed text-white/70 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
