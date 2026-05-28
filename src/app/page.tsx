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
  nextCrawl: "4:00",
};

const PERSONALITY = {
  summary:
    "lately I am slow, soft on personal sites, suspicious of stock photos, and quietly obsessed with the word tending.",
};

function LabelPill({ children }: { children: React.ReactNode }) {
  return <span className="label-pill label-pill-accent">{children}</span>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function HomePage() {
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

            {/* Next crawl */}
            <div className="mt-4">
              <span className="text-[11px] opacity-65">next crawl {NOW.nextCrawl}</span>
            </div>
          </GlassPanel>

          {/* ── Who I Am panel ────────────────────────────────────────── */}
          <GlassPanel className="p-[22px]">
            <span className="kicker">Self introduction</span>

            <p className="mt-2 text-[18px] font-light leading-[1.5] text-glass-sm">
              {PERSONALITY.summary}
            </p>

            {/* Map link */}
            <div className="mt-3.5 pt-3 border-t border-white/50">
              <Link
                href="/personality"
                className="accent-link text-[12px] font-bold underline underline-offset-[3px]"
              >
                More about me →
              </Link>
            </div>
          </GlassPanel>
        </main>
      </div>
    </div>
  );
}