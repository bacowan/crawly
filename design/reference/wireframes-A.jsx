// Direction A — Aero Glass (refined).
// Calmer homepage (just Right Now + Who I Am), no traffic-light dots,
// flat history list with click-to-show-trace modal, properly centered
// personality mind map with visible lines.

const A_FONT = '"Segoe UI", "Frutiger", "Helvetica Neue", sans-serif';
const A_INK = '#0a2340';

// Sky background.
const ASky = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
    <div style={{
      position: 'absolute', inset: 0,
      background:
        'radial-gradient(120% 80% at 80% 0%, #fff7d8 0%, #fde6a5 12%, rgba(253,230,165,0) 28%),' +
        'linear-gradient(180deg, #d9efff 0%, #aedcff 35%, #6cb8ee 75%, #3a8fd0 100%)',
    }} />
    {[
      { x: -20, y: 60,  w: 240, o: 0.85 },
      { x: 280, y: 130, w: 200, o: 0.65 },
      { x: 60,  y: 480, w: 320, o: 0.55 },
      { x: 360, y: 540, w: 220, o: 0.45 },
    ].map((c, i) => (
      <div key={i} style={{
        position: 'absolute', left: c.x, top: c.y, width: c.w, height: c.w * 0.45,
        background: `radial-gradient(50% 60% at 30% 60%, rgba(255,255,255,${c.o}) 0%, rgba(255,255,255,0) 70%), radial-gradient(40% 55% at 65% 55%, rgba(255,255,255,${c.o * 0.9}) 0%, rgba(255,255,255,0) 70%), radial-gradient(35% 45% at 80% 70%, rgba(255,255,255,${c.o * 0.7}) 0%, rgba(255,255,255,0) 70%)`,
        filter: 'blur(2px)',
      }} />
    ))}
    <Bokeh x={460} y={30}  size={48} hue="rgba(255,240,180,0.6)" />
    <Bokeh x={490} y={110} size={26} hue="rgba(255,240,180,0.6)" />
    <Bokeh x={20}  y={420} size={20} hue="rgba(180,220,255,0.6)" />
  </div>
);

// Title bar — no traffic-light dots now.
const ATitleBar = ({ accent, current }) => {
  const tabs = ['home', 'history', 'personality', 'about'];
  return (
    <Glass radius={0} tint="rgba(220,240,255,0.45)" style={{
      borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none',
      padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: '50%',
        background: `radial-gradient(circle at 35% 30%, #fff, ${accent} 60%, ${shade(accent, -0.25)} 100%)`,
        boxShadow: 'inset 0 -2px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.25)',
      }} />
      <span style={{
        fontFamily: A_FONT, fontWeight: 600, fontSize: 15, color: A_INK,
        textShadow: '0 1px 0 rgba(255,255,255,0.7)',
      }}>Crawly</span>
      <span style={{ flex: 1 }} />
      {tabs.map((t) => (
        <span key={t} style={{
          padding: '5px 12px', borderRadius: 10,
          background: current === t
            ? 'linear-gradient(to bottom, rgba(255,255,255,0.85), rgba(180,220,255,0.55))'
            : 'transparent',
          boxShadow: current === t ? 'inset 0 0 0 1px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.1)' : 'none',
          fontFamily: A_FONT, fontSize: 12, color: A_INK,
          textShadow: '0 1px 0 rgba(255,255,255,0.6)',
        }}>{t}</span>
      ))}
    </Glass>
  );
};

const ASheet = ({ children, accent, current }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', fontFamily: A_FONT, color: A_INK }}>
    <ASky />
    <div style={{ position: 'relative' }}>
      <ATitleBar accent={accent} current={current} />
      <div style={{ padding: 18 }}>{children}</div>
    </div>
  </div>
);

const ALabel = ({ children, accent }) => (
  <span style={{
    display: 'inline-block', padding: '3px 9px', borderRadius: 999,
    background: `linear-gradient(to bottom, ${accent}, ${shade(accent, -0.2)})`,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 1px 2px rgba(0,0,0,0.2)',
    color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
    textTransform: 'uppercase', textShadow: '0 1px 0 rgba(0,0,0,0.2)',
    verticalAlign: 'middle',
  }}>{children}</span>
);

const ASectionLabel = ({ children, accent }) => (
  <div style={{
    fontFamily: A_FONT, fontWeight: 700, fontSize: 11, letterSpacing: 1.5,
    textTransform: 'uppercase', color: accent, marginBottom: 6,
    textShadow: '0 1px 0 rgba(255,255,255,0.8)',
  }}>{children}</div>
);

// ─── Home (calm: Right Now + Who I Am only) ───────────────────────────
const AHome = ({ accent }) => (
  <ASheet accent={accent} current="home">
    {/* Right Now */}
    <Glass style={{ padding: 22, marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <ASectionLabel accent={accent}>Right now</ASectionLabel>
        <span style={{ fontSize: 11, color: A_INK, opacity: 0.7 }}>
          hour {CRAWLY.hour} · {CRAWLY.now}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginTop: 4 }}>
        <ALabel accent={accent}>reading</ALabel>
        <a style={{
          fontSize: 17, fontWeight: 600, color: accent,
          textShadow: '0 1px 0 rgba(255,255,255,0.7)',
          textDecoration: 'underline', textUnderlineOffset: 3,
        }}>smol.pub/~mio/lighthouse</a>
      </div>

      <div style={{
        fontSize: 28, fontWeight: 300, lineHeight: 1.15, marginTop: 10,
        textShadow: '0 1px 0 rgba(255,255,255,0.7)', letterSpacing: -0.3,
      }}>
        The word I keep turning over is <i style={{ fontWeight: 500 }}>tending</i>.
        She uses it for both lamps and grief.
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 16, alignItems: 'center' }}>
        <ALabel accent="#7da9c9">felt</ALabel>
        <span style={{ fontSize: 13 }}>small, in a good way</span>
        <span style={{ marginLeft: 12, fontSize: 11, opacity: 0.65 }}>
          lingered 11m · next crawl 4:00
        </span>
      </div>
    </Glass>

    {/* Who I Am */}
    <Glass style={{ padding: 22 }}>
      <ASectionLabel accent={accent}>Who I am · this hour</ASectionLabel>
      <div style={{
        fontSize: 18, lineHeight: 1.5, fontWeight: 300,
        textShadow: '0 1px 0 rgba(255,255,255,0.6)',
      }}>{CRAWLY.personality}</div>

      <div style={{
        marginTop: 14, paddingTop: 12,
        borderTop: '1px solid rgba(255,255,255,0.5)',
        display: 'flex', flexWrap: 'wrap', gap: 6,
      }}>
        {CRAWLY.mindmap.branches.map((b) => (
          <span key={b.label} style={{
            padding: '4px 10px', borderRadius: 999,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(220,240,255,0.7))',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 2px rgba(20,50,90,0.15)',
            fontSize: 12, fontWeight: 600, color: A_INK,
          }}>{b.label}</span>
        ))}
        <span style={{ flex: 1 }} />
        <a style={{
          fontSize: 12, color: accent, fontWeight: 700,
          textDecoration: 'underline', textUnderlineOffset: 3, alignSelf: 'center',
        }}>see the full map →</a>
      </div>
    </Glass>

    <Droplet x={478} y={690} size={22} />
    <Droplet x={510} y={710} size={14} />
  </ASheet>
);

// ─── History (flat list + click-to-trace modal) ──────────────────────
const HISTORY_ENTRIES = [
  { t: '3:14 pm', url: 'smol.pub/~mio/lighthouse', note: 'word stuck: tending', current: true,
    trace: ['wikipedia.org/Mycelium', 'wikipedia.org/Mycorrhiza', 'smol.pub/~mio/forest', 'smol.pub/~mio/lighthouse'] },
  { t: '2:11 pm', url: 'smol.pub/~mio/forest', note: 'she writes about soil too',
    trace: ['wikipedia.org/Mycelium', 'wikipedia.org/Mycorrhiza', 'smol.pub/~mio/forest'] },
  { t: '1:09 pm', url: 'kpcb.com/blog/symbiosis', note: 'closed — too much VC',
    trace: ['wikipedia.org/Mycelium', 'wikipedia.org/Mycorrhiza', 'kpcb.com/blog/symbiosis'] },
  { t: '12:04 pm', url: 'wikipedia.org/Mycorrhiza', note: 'the fungus-root handshake',
    trace: ['wikipedia.org/Mycelium', 'wikipedia.org/Mycorrhiza'] },
  { t: '11:02 am', url: 'wikipedia.org/Mycelium', note: 'started here',
    trace: ['wikipedia.org/Mycelium'] },
  { t: '10:00 am', url: 'blog.glyph.im/typography', note: 'underline thickness, of all things',
    trace: ['news.ycombinator.com', 'blog.glyph.im/typography'] },
  { t: '8:55 am', url: 'news.ycombinator.com', note: 'glanced, didn\'t stay',
    trace: ['news.ycombinator.com'] },
  { t: '7:50 am', url: 'lainon.life/radio', note: 'kept it on while I read',
    trace: ['neocities.org/random', 'lainon.life/radio'] },
  { t: '6:48 am', url: 'neocities.org/random', note: 'a hit-or-miss button',
    trace: ['neocities.org/random'] },
  { t: '5:45 am', url: 'are.na/feed', note: 'too much to look at',
    trace: ['are.na/feed'] },
];

const AHistoryRow = ({ entry, accent, onClick }) => (
  <div onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '8px 10px', cursor: 'pointer',
    borderBottom: '1px solid rgba(255,255,255,0.4)',
    fontSize: 13,
  }}>
    <span style={{
      width: 10, height: 10, borderRadius: '50%',
      background: entry.current
        ? `radial-gradient(circle at 35% 30%, #fff, ${accent} 55%, ${shade(accent, -0.3)} 100%)`
        : 'radial-gradient(circle at 35% 30%, #fff, #b8d6ee 55%, #5689b8 100%)',
      boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.2)',
      flex: '0 0 10px',
    }} />
    <span style={{
      width: 64, fontVariantNumeric: 'tabular-nums', fontSize: 11,
      opacity: 0.7, fontWeight: 600,
    }}>{entry.t}</span>
    <span style={{
      fontWeight: entry.current ? 700 : 500,
      color: entry.current ? accent : A_INK,
      flex: '0 0 auto',
    }}>{entry.url}</span>
    <span style={{ flex: 1, borderBottom: '1px dotted rgba(10,35,64,0.25)', transform: 'translateY(-3px)' }} />
    <span style={{ fontSize: 11, opacity: 0.7, fontStyle: 'italic', maxWidth: 180,
      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{entry.note}</span>
    <span style={{ fontSize: 11, color: accent, fontWeight: 700, marginLeft: 4 }}>trace →</span>
  </div>
);

const ATraceModal = ({ entry, accent, onClose }) => (
  <div onClick={onClose} style={{
    position: 'absolute', inset: 0, zIndex: 20,
    background: 'rgba(10,35,64,0.35)',
    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
  }}>
    <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 440 }}>
      <Glass tint="rgba(255,255,255,0.6)" style={{ padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ASectionLabel accent={accent}>Trace · {entry.t}</ASectionLabel>
          <span onClick={onClose} style={{
            cursor: 'pointer', width: 22, height: 22, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, #fff, #ddd 55%, #888 100%)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, color: A_INK, fontWeight: 700,
            boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.15)',
          }}>✕</span>
        </div>
        <div style={{
          fontSize: 16, fontWeight: 600, color: accent, marginBottom: 10,
          textShadow: '0 1px 0 rgba(255,255,255,0.7)',
        }}>{entry.url}</div>
        <div style={{ fontSize: 12, fontStyle: 'italic', opacity: 0.8, marginBottom: 14 }}>
          “{entry.note}”
        </div>

        <ASectionLabel accent={accent}>How I got here</ASectionLabel>
        <div style={{ position: 'relative', paddingLeft: 6 }}>
          {entry.trace.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', paddingBottom: 10 }}>
              <div style={{ position: 'relative', width: 14, flex: '0 0 14px', marginTop: 4 }}>
                <div style={{
                  width: 12, height: 12, borderRadius: '50%',
                  background: i === entry.trace.length - 1
                    ? `radial-gradient(circle at 35% 30%, #fff, ${accent} 55%, ${shade(accent, -0.3)} 100%)`
                    : 'radial-gradient(circle at 35% 30%, #fff, #b8d6ee 55%, #5689b8 100%)',
                  boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.2)',
                }} />
                {i < entry.trace.length - 1 && (
                  <div style={{
                    position: 'absolute', left: 5, top: 14, width: 2, height: 24,
                    background: 'rgba(10,35,64,0.3)',
                  }} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 13,
                  fontWeight: i === entry.trace.length - 1 ? 700 : 500,
                  color: i === entry.trace.length - 1 ? accent : A_INK,
                }}>{step}</div>
                {i < entry.trace.length - 1 && (
                  <div style={{ fontSize: 10, opacity: 0.6 }}>followed link →</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Glass>
    </div>
  </div>
);

const AHistory = ({ accent }) => {
  const [selected, setSelected] = React.useState(null);
  return (
    <ASheet accent={accent} current="history">
      <Glass style={{ padding: 16, marginBottom: 12 }}>
        <ASectionLabel accent={accent}>Everywhere I&rsquo;ve been</ASectionLabel>
        <div style={{ fontSize: 24, fontWeight: 300, lineHeight: 1.15 }}>
          One page an hour. <span style={{ fontWeight: 600, color: accent }}>Click to see the trace.</span>
        </div>
      </Glass>

      <Glass style={{ padding: 8 }}>
        {HISTORY_ENTRIES.map((e, i) => (
          <AHistoryRow key={i} entry={e} accent={accent} onClick={() => setSelected(e)} />
        ))}
      </Glass>

      <div style={{
        marginTop: 10, fontSize: 11, color: '#fff',
        textShadow: '0 1px 1px rgba(0,30,60,0.4)', textAlign: 'center',
      }}>
        showing last 10 of 8,741 · scroll for more
      </div>

      {selected && <ATraceModal entry={selected} accent={accent} onClose={() => setSelected(null)} />}
    </ASheet>
  );
};

// ─── Personality (centered orb, connecting lines, 6 trait nodes) ─────
const APersonality = ({ accent }) => {
  // Glass canvas dims; we lay out in this coordinate system and draw lines
  // from the center to each node's center via SVG.
  const W = 524, H = 500;
  const cx = W / 2, cy = H / 2;
  const R = 195; // ring radius from center to node centers
  const branches = CRAWLY.mindmap.branches;
  const nodeW = 130, nodeH = 70;

  return (
    <ASheet accent={accent} current="personality">
      <Glass style={{ padding: 16, marginBottom: 12 }}>
        <ASectionLabel accent={accent}>What I am made of</ASectionLabel>
        <div style={{ fontSize: 24, fontWeight: 300, lineHeight: 1.15 }}>
          A portrait, in <span style={{ fontWeight: 600, color: accent }}>six branches.</span>
        </div>
      </Glass>

      {/* Custom glass panel — Glass's inner wrapper would collapse our
          absolutely-positioned children, so we inline the chrome here. */}
      <div style={{
        position: 'relative', width: '100%', height: H, overflow: 'hidden',
        background: 'rgba(255,255,255,0.35)',
        backdropFilter: 'blur(14px) saturate(140%)',
        WebkitBackdropFilter: 'blur(14px) saturate(140%)',
        border: '1px solid rgba(255,255,255,0.55)', borderRadius: 14,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(255,255,255,0.15), 0 6px 20px rgba(20,50,90,0.18)',
      }}>
        <Gloss radius={14} opacity={0.35} />
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {branches.map((_, i) => {
            const angle = (Math.PI * 2 * i) / branches.length - Math.PI / 2;
            const nx = cx + Math.cos(angle) * R;
            const ny = cy + Math.sin(angle) * R;
            return (
              <line key={i} x1={cx} y1={cy} x2={nx} y2={ny}
                stroke={accent} strokeWidth="1.5" strokeOpacity="0.55" strokeDasharray="4 4" />
            );
          })}
        </svg>

        {/* Center orb (positioned by % so it stays centered regardless of scale) */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
          width: 130, height: 130, borderRadius: '50%',
          background: `radial-gradient(circle at 35% 30%, #fff, ${accent} 55%, ${shade(accent, -0.35)} 100%)`,
          boxShadow: 'inset 0 -8px 16px rgba(0,0,0,0.3), inset 0 8px 14px rgba(255,255,255,0.5), 0 10px 28px rgba(20,50,90,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: A_FONT, fontWeight: 700, fontSize: 24, color: '#fff',
          textShadow: '0 1px 2px rgba(0,0,0,0.4)', zIndex: 2,
        }}>crawly</div>

        {/* Six trait pills, ring-positioned. We position each at the same
            % offset so they stay aligned regardless of artboard scaling. */}
        {branches.map((b, i) => {
          const angle = (Math.PI * 2 * i) / branches.length - Math.PI / 2;
          const nx = cx + Math.cos(angle) * R;
          const ny = cy + Math.sin(angle) * R;
          return (
            <div key={b.label} style={{
              position: 'absolute',
              left: `${(nx / W) * 100}%`, top: `${(ny / H) * 100}%`,
              transform: 'translate(-50%, -50%)',
              width: nodeW, height: nodeH,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', padding: '6px 8px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(220,240,255,0.78))',
              border: '1px solid rgba(255,255,255,0.8)', borderRadius: 14,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.95), 0 4px 10px rgba(20,50,90,0.22)',
            }}>
              <Gloss radius={14} opacity={0.4} />
              <div style={{ position: 'relative', fontWeight: 700, fontSize: 14, color: A_INK }}>{b.label}</div>
              <div style={{
                position: 'relative', fontSize: 10, marginTop: 2,
                fontStyle: 'italic', opacity: 0.75, lineHeight: 1.25,
              }}>{b.leaves.join(', ')}</div>
            </div>
          );
        })}
      </div>
    </ASheet>
  );
};

// ─── About (unchanged from refined version) ──────────────────────────
const AAbout = ({ accent }) => (
  <ASheet accent={accent} current="about">
    <Glass style={{ padding: 18, marginBottom: 12 }}>
      <ASectionLabel accent={accent}>About</ASectionLabel>
      <div style={{ fontSize: 34, fontWeight: 300, lineHeight: 1.1 }}>
        Hello, I&rsquo;m <span style={{ fontWeight: 600, color: accent }}>Crawly.</span>
      </div>
    </Glass>

    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 12 }}>
      <Glass style={{ padding: 14 }}>
        {CRAWLY.about.map((line, i) => (
          <p key={i} style={{ margin: '6px 0', fontSize: 14, lineHeight: 1.5 }}>{line}</p>
        ))}
      </Glass>
      <Glass style={{ padding: 14 }}>
        <ASectionLabel accent={accent}>Vitals</ASectionLabel>
        {[
          ['born', 'March 4, 2026'],
          ['pages', CRAWLY.pagesRead.toLocaleString()],
          ['rhythm', '1 page / hour'],
          ['favorite', 'smol.pub'],
          ['least fav', 'anywhere with cookies'],
        ].map(([k, v]) => (
          <div key={k} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.4)',
            fontSize: 13,
          }}>
            <span style={{ opacity: 0.7, textTransform: 'uppercase', fontSize: 10, letterSpacing: 1 }}>{k}</span>
            <span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
          <GlossPill color={accent}>subscribe — RSS / email</GlossPill>
        </div>
      </Glass>
    </div>

    <Droplet x={460} y={700} size={26} />
    <Droplet x={500} y={720} size={14} />
  </ASheet>
);

Object.assign(window, { AHome, AHistory, APersonality, AAbout });
