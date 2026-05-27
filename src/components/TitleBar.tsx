import Link from "next/link";

const TABS = [
  { label: "home",        href: "/" },
  { label: "history",     href: "/history" },
  { label: "personality", href: "/personality" },
  { label: "about",       href: "/about" },
] as const;

const ACCENT = "#6b3fa0";

interface TitleBarProps {
  current: (typeof TABS)[number]["label"];
}

export default function TitleBar({ current }: TitleBarProps) {
  return (
    <div
      className="relative flex items-center gap-3 px-3.5 py-2"
      style={{
        background: "rgba(220,240,255,0.45)",
        backdropFilter: "blur(14px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
        borderBottom: "1px solid rgba(255,255,255,0.55)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(255,255,255,0.15), 0 2px 8px rgba(20,50,90,0.1)",
      }}
    >
      {/* Logo + wordmark — links home */}
      <Link href="/" className="flex items-center gap-3 flex-shrink-0">
        <div
          className="w-6 h-6 rounded-full"
          style={{
            background: `radial-gradient(circle at 35% 30%, #fff, ${ACCENT} 60%, #2b0060 100%)`,
            boxShadow: "inset 0 -2px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.25)",
          }}
        />
        <span
          className="text-[15px] font-semibold"
          style={{
            color: "var(--ink)",
            textShadow: "0 1px 0 rgba(255,255,255,0.7)",
          }}
        >
          Crawly
        </span>
      </Link>

      {/* Spacer */}
      <span className="flex-1" />

      {/* Nav tabs */}
      {TABS.map((tab) => {
        const isActive = tab.label === current;
        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={`nav-tab text-xs px-3 py-1.5${isActive ? " nav-tab-active font-semibold" : ""}`}
            style={{
              color: "var(--ink)",
              textShadow: "0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
