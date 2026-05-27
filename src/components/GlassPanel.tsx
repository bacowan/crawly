import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

// Frosted-glass panel with Aero gloss overlay.
export default function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div className={`glass relative overflow-hidden ${className}`}>
      {/* Gloss overlay — top-half white sheen */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: "inherit",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.33) 35%, rgba(255,255,255,0) 50%)",
        }}
      />
      {/* Content sits above the gloss */}
      <div className="relative">{children}</div>
    </div>
  );
}
