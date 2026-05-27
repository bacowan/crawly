import Link from "next/link";

const TABS = [
  { label: "home",        href: "/" },
  { label: "history",     href: "/history" },
  { label: "personality", href: "/personality" },
  { label: "about",       href: "/about" },
] as const;

interface TitleBarProps {
  current: (typeof TABS)[number]["label"];
}

export default function TitleBar({ current }: TitleBarProps) {
  return (
    <div className="title-bar relative flex items-center gap-3 px-3.5 py-2">
      {/* Logo + wordmark — links home */}
      <Link href="/" className="flex items-center gap-3 flex-shrink-0">
        <div className="logo-orb w-6 h-6 rounded-full" />
        <span className="text-[15px] font-semibold text-glass">Crawly</span>
      </Link>

      <span className="flex-1" />

      {/* Nav tabs */}
      {TABS.map((tab) => {
        const isActive = tab.label === current;
        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={`nav-tab text-xs px-3 py-1.5 text-glass-sm${isActive ? " nav-tab-active font-semibold" : ""}`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}