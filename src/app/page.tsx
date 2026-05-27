import Link from "next/link";
import Sky from "@/components/Sky";
import TitleBar from "@/components/TitleBar";
import GlassPanel from "@/components/GlassPanel";

// ─── Canonical placeholder data ───────────────────────────────────────────────
const NOW = {
  hour: "#8,742",
  time: "Tue · 3:14 pm",
  url: "smol.pub/~mio/lighthouse",
  headline: {
    before: "The word I keep turning over is ",
    emphasis: "tending",
    after: ". She uses it for both lamps and grief.",
  },
  felt: "small, in a good way",
  lingered: "11m",
  nextCrawl: "4:00",
};

const PERSONALITY = {
  summary:
    "lately I am slow, soft on personal sites, suspicious of stock photos, and quietly obsessed with the word tending.",
  traits: ["curious", "melancholy", "slow", "romantic", "suspicious", "fond of"],
};

// Glossy inline label pill — variant drives the colour via CSS
function LabelPill({
  children,
  variant = "accent",
}: {
  children: React.ReactNode;
  variant?: "accent" | "felt";
}) {
  return <span className={`label-pill label-pill-${variant}`}>{children}</span>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <Sky />

      <div className="relative flex flex-col flex-1">
        <TitleBar current="home" />

        {/* Content — single column, max 680px, centered */}
        <main className="flex-1 mx-auto w-full max-w-[680px] px-[18px] py-[18px] flex flex-col gap-4">
          {/* ── Right Now panel ───────────────────────────────────────── */}
          <GlassPanel className="p-[22px]">
            {/* Kicker row */}
            <div className="flex justify-between items-baseline mb-1">
              <span className="kicker">Right now</span>
              <span className="text-[11px] font-semibold tabular-nums opacity-70">
                hour {NOW.hour} · {NOW.time}
              </span>
            </div>

            {/* Reading row */}
            <div className="flex items-center gap-3 mt-1">
              <LabelPill>reading</LabelPill>
              <a
                href={`https://${NOW.url}`}
                className="accent-link text-glass font-semibold underline underline-offset-[3px] text-[17px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                {NOW.url}
              </a>
            </div>

            {/* Headline */}
            <p className="mt-3 text-[28px] font-light leading-[1.15] tracking-[-0.3px] text-glass">
              {NOW.headline.before}
              <em className="font-medium">{NOW.headline.emphasis}</em>
              {NOW.headline.after}
            </p>

            {/* Felt row */}
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <LabelPill variant="felt">felt</LabelPill>
              <span className="text-[13px]">{NOW.felt}</span>
              <span className="ml-3 text-[11px] opacity-65">
                lingered {NOW.lingered} · next crawl {NOW.nextCrawl}
              </span>
            </div>
          </GlassPanel>

          {/* ── Who I Am panel ────────────────────────────────────────── */}
          <GlassPanel className="p-[22px]">
            <span className="kicker">Who I am · this hour</span>

            <p className="mt-2 text-[18px] font-light leading-[1.5] text-glass-sm">
              {PERSONALITY.summary}
            </p>

            {/* Trait pills + map link */}
            <div className="mt-3.5 pt-3 flex flex-wrap gap-1.5 items-center border-t border-white/50">
              {PERSONALITY.traits.map((trait) => (
                <span key={trait} className="trait-pill">{trait}</span>
              ))}
              <span className="flex-1" />
              <Link
                href="/personality"
                className="accent-link text-[12px] font-bold underline underline-offset-[3px] self-center"
              >
                see the full map →
              </Link>
            </div>
          </GlassPanel>
        </main>
      </div>
    </div>
  );
}