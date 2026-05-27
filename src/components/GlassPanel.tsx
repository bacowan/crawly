import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

// Frosted-glass panel with Aero gloss overlay (via ::before pseudo-element).
export default function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div className={`glass gloss relative overflow-hidden ${className}`}>
      <div className="relative">{children}</div>
    </div>
  );
}