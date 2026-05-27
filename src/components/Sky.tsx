// Frutiger Aero sky background — sky gradient + cloud blobs.
// Pure CSS, no assets.

const clouds = [
  { left: -20,  top: 60,  width: 240, opacity: 0.85 },
  { left: 280,  top: 130, width: 200, opacity: 0.65 },
  { left: 60,   top: 480, width: 320, opacity: 0.55 },
  { left: 360,  top: 540, width: 220, opacity: 0.45 },
];

export default function Sky() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sky gradient + sun glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 80% 0%, #fff7d8 0%, #fde6a5 12%, rgba(253,230,165,0) 28%)," +
            "linear-gradient(180deg, #d9efff 0%, #aedcff 35%, #6cb8ee 75%, #3a8fd0 100%)",
        }}
      />

      {/* Soft cloud blobs */}
      {clouds.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: c.left,
            top: c.top,
            width: c.width,
            height: c.width * 0.45,
            background: [
              `radial-gradient(50% 60% at 30% 60%, rgba(255,255,255,${c.opacity}) 0%, rgba(255,255,255,0) 70%)`,
              `radial-gradient(40% 55% at 65% 55%, rgba(255,255,255,${c.opacity * 0.9}) 0%, rgba(255,255,255,0) 70%)`,
              `radial-gradient(35% 45% at 80% 70%, rgba(255,255,255,${c.opacity * 0.7}) 0%, rgba(255,255,255,0) 70%)`,
            ].join(", "),
            filter: "blur(2px)",
          }}
        />
      ))}

    </div>
  );
}
