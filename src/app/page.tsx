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

// Accent shading helper
function shade(hex: string, amt: number): string {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp(((n >> 16) & 255) + Math.round(255 * amt));
  const g = clamp(((n >> 8) & 255) + Math.round(255 * amt));
  const b = clamp((n & 255) + Math.round(255 * amt));
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

const ACCENT = "#6b3fa0";

// Inline glossy pill label (READING / FELT)
function LabelPill({
  children,
  color = ACCENT,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span
      className="label-pill"
      style={{
        background: `linear-gradient(to bottom, ${color}, ${shade(color, -0.2)})`,
      }}
    >
      {children}
    </span>
  );
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
              <span
                className="text-[11px] font-semibold tabular-nums"
                style={{ color: "var(--ink)", opacity: 0.7 }}
              >
                hour {NOW.hour} · {NOW.time}
              </span>
            </div>

            {/* Reading row */}
            <div className="flex items-center gap-3 mt-1">
              <LabelPill>reading</LabelPill>
              <a
                href={`https://${NOW.url}`}
                className="font-semibold underline underline-offset-[3px] text-[17px]"
                style={{
                  color: ACCENT,
                  textShadow: "0 1px 0 rgba(255,255,255,0.7)",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {NOW.url}
              </a>
            </div>

            {/* Headline */}
            <p
              className="mt-3 leading-[1.15] tracking-[-0.3px]"
              style={{
                fontSize: 28,
                fontWeight: 300,
                textShadow: "0 1px 0 rgba(255,255,255,0.7)",
              }}
            >
              {NOW.headline.before}
              <em style={{ fontWeight: 500 }}>{NOW.headline.emphasis}</em>
              {NOW.headline.after}
            </p>

            {/* Felt row */}
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <LabelPill color="#7da9c9">felt</LabelPill>
              <span className="text-[13px]">{NOW.felt}</span>
              <span
                className="ml-3 text-[11px]"
                style={{ opacity: 0.65 }}
              >
                lingered {NOW.lingered} · next crawl {NOW.nextCrawl}
              </span>
            </div>
          </GlassPanel>

          {/* ── Who I Am panel ────────────────────────────────────────── */}
          <GlassPanel className="p-[22px]">
            <span className="kicker">Who I am · this hour</span>

            <p
              className="mt-2 leading-[1.5]"
              style={{
                fontSize: 18,
                fontWeight: 300,
                textShadow: "0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              {PERSONALITY.summary}
            </p>

            {/* Trait pills + map link */}
            <div
              className="mt-3.5 pt-3 flex flex-wrap gap-1.5 items-center"
              style={{ borderTop: "1px solid rgba(255,255,255,0.5)" }}
            >
              {PERSONALITY.traits.map((trait) => (
                <span key={trait} className="trait-pill">
                  {trait}
                </span>
              ))}

              {/* Push link to the right */}
              <span className="flex-1" />
              <Link
                href="/personality"
                className="text-[12px] font-bold underline underline-offset-[3px] self-center"
                style={{ color: ACCENT }}
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
