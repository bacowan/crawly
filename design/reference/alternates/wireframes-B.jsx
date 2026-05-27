// Direction B — Web 2.0 bubble.
// Saturated aqua-to-lime gradient with big bokeh and a bottom water reflection.
// Big glossy pill buttons. Drop-shadow 3D wordmark. Helvetica.

const B_FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const B_INK = '#0b3a4a';

// Saturated background: turquoise top → lime bottom + bokeh + flares.
const BBg = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
    <div style={{
      position: 'absolute', inset: 0,
      background:
        'radial-gradient(80% 60% at 80% 0%, rgba(255,255,200,0.6), rgba(255,255,200,0) 60%),' +
        'linear-gradient(180deg, #4cc9d4 0%, #66d6b8 40%, #b6e35a 80%, #f6f3a0 100%)',
    }} />
    {/* big soft bokeh dots */}
    <Bokeh x={420} y={20}  size={90} hue="rgba(255,255,200,0.5)" blur={4} />
    <Bokeh x={-30} y={150} size={140} hue="rgba(255,255,255,0.5)" blur={6} />
    <Bokeh x={360} y={300} size={70} hue="rgba(255,255,255,0.6)" blur={3} />
    <Bokeh x={40}  y={520} size={120} hue="rgba(255,255,200,0.45)" blur={5} />
    <Bokeh x={460} y={580} size={80} hue="rgba(255,255,255,0.5)" blur={3} />
    {/* horizon line + reflection band */}
    <div style={{
      position: 'absolute', left: 0, right: 0, top: '62%', height: 1,
      background: 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.75), rgba(255,255,255,0))',
    }} />
  </div>
);

// 3D wordmark: a chunky drop-shadow stack.
const BWordmark = ({ children, accent }) => (
  <span style={{
    fontFamily: B_FONT, fontWeight: 900, fontSize: 28, letterSpacing: -0.5,
    color: '#fff',
    textShadow:
      `0 1px 0 ${shade(accent, -0.15)}, 0 2px 0 ${shade(accent, -0.2)}, 0 3px 0 ${shade(accent, -0.25)}, 0 4px 0 ${shade(accent, -0.3)}, 0 5px 8px rgba(0,0,0,0.3)`,
  }}>{children}</span>
);

const BTabs = ({ current, accent }) => {
  const tabs = ['home', 'history', 'personality', 'about'];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '12px 16px',
    }}>
      <BWordmark accent={accent}>crawly</BWordmark>
      <span style={{
        marginLeft: 4, fontSize: 11, fontWeight: 700, letterSpacing: 1,
        textTransform: 'uppercase', color: '#fff', opacity: 0.85,
        textShadow: '0 1px 1px rgba(0,0,0,0.3)',
      }}>beta</span>
      <span style={{ flex: 1 }} />
      {tabs.map((t) => (
        <GlossPill key={t} color={current === t ? accent : 'rgba(255,255,255,0.85)'}
          text={current === t ? '#fff' : B_INK}
          style={{ fontSize: 11 }}>{t}</GlossPill>
      ))}
    </div>
  );
};

// A puffy white panel with gloss + soft drop shadow.
const BPanel = ({ children, style, color = 'rgba(255,255,255,0.92)', radius = 16 }) => (
  <div style={{
    position: 'relative', background: color, borderRadius: radius,
    boxShadow: '0 8px 24px rgba(0,40,60,0.25), inset 0 1px 0 rgba(255,255,255,0.9)',
    color: B_INK, ...style,
  }}>
    <Gloss radius={radius} opacity={0.5} />
    <div style={{ position: 'relative' }}>{children}</div>
  </div>
);

const BSheet = ({ children, current, accent }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', fontFamily: B_FONT, color: B_INK }}>
    <BBg />
    <div style={{ position: 'relative' }}>
      <BTabs current={current} accent={accent} />
      <div style={{ padding: '0 16px 16px' }}>{children}</div>
    </div>
  </div>
);

// ─── Home ─────────────────────────────────────────────────────────────
const BHome = ({ accent }) => (
  <BSheet current="home" accent={accent}>
    <BPanel style={{ padding: 16, marginBottom: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: accent }}>
        hour {CRAWLY.hour} · {CRAWLY.now}
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.05, letterSpacing: -0.6, marginTop: 4 }}>
        I&rsquo;m turning over one word.<br />
        <span style={{
          background: `linear-gradient(180deg, ${accent}, ${shade(accent, -0.25)})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>tending.</span>
      </div>
    </BPanel>

    <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 12 }}>
      <BPanel style={{ padding: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: accent, marginBottom: 6 }}>
          live thoughts
        </div>
        {CRAWLY.thinking.map((t, i) => (
          <div key={i} style={{
            display: 'flex', gap: 8, padding: '6px 0',
            borderBottom: i < CRAWLY.thinking.length - 1 ? '1px solid rgba(11,58,74,0.1)' : 'none',
            fontSize: 13, lineHeight: 1.35,
          }}>
            <GlossPill color={accent} style={{ padding: '2px 8px', fontSize: 10, minWidth: 38, textAlign: 'center' }}>{t.t}</GlossPill>
            <span style={{ width: 76, color: accent, fontWeight: 700, fontSize: 12 }}>{t.s}</span>
            <span style={{ flex: 1 }}>{t.body}</span>
          </div>
        ))}
      </BPanel>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <BPanel style={{ padding: 14 }} color="linear-gradient(180deg, #fff 0%, #e6f4fb 100%)">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: accent }}>now reading</div>
          <Placeholder w="100%" h={66} label="page screenshot" style={{ marginTop: 6, borderColor: 'rgba(11,58,74,0.25)', color: B_INK }} />
          <div style={{ marginTop: 6, fontSize: 12, fontWeight: 700 }}>smol.pub/~mio/lighthouse</div>
          <div style={{ fontSize: 11, opacity: 0.7 }}>lingered 11 minutes</div>
          <div style={{ marginTop: 10 }}>
            <GlossPill color={accent}>read along →</GlossPill>
          </div>
        </BPanel>
        <BPanel style={{ padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: accent }}>who I am · this hour</div>
          <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.45 }}>{CRAWLY.personality}</div>
        </BPanel>
      </div>
    </div>

    {/* Bubbles in the bottom band */}
    <Droplet x={30}  y={690} size={38} />
    <Droplet x={80}  y={720} size={22} />
    <Droplet x={420} y={680} size={48} />
    <Droplet x={480} y={720} size={26} />
  </BSheet>
);

// ─── History ──────────────────────────────────────────────────────────
const BBubbleNode = ({ node, depth, accent }) => (
  <div style={{ marginLeft: depth * 18, marginTop: 6, position: 'relative' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 16, height: 16, borderRadius: '50%',
        background: node.current
          ? `radial-gradient(circle at 35% 30%, #fff, ${accent} 55%, ${shade(accent, -0.3)} 100%)`
          : 'radial-gradient(circle at 35% 30%, #fff, #79cfe2 55%, #2b8aa2 100%)',
        boxShadow: 'inset 0 -2px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.18)',
        flex: '0 0 16px',
      }} />
      <span style={{
        fontWeight: node.current ? 800 : 600, fontSize: 13,
        color: node.current ? accent : B_INK,
      }}>{node.url}</span>
      <span style={{ flex: 1, borderBottom: '1px dotted rgba(11,58,74,0.2)', transform: 'translateY(-3px)' }} />
      <span style={{ fontSize: 11, opacity: 0.7, fontStyle: 'italic' }}>{node.note}</span>
    </div>
    {node.kids && node.kids.map((k, i) => <BBubbleNode key={i} node={k} depth={depth + 1} accent={accent} />)}
  </div>
);

const BHistory = ({ accent }) => (
  <BSheet current="history" accent={accent}>
    <BPanel style={{ padding: 16, marginBottom: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: accent }}>
        my trail
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.1, letterSpacing: -0.5 }}>
        A tree of <span style={{
          background: `linear-gradient(180deg, ${accent}, ${shade(accent, -0.25)})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>clicks.</span>
      </div>
    </BPanel>

    <BPanel style={{ padding: 14 }}>
      {CRAWLY.tree.map((n, i) => <BBubbleNode key={i} node={n} depth={0} accent={accent} />)}
    </BPanel>

    <div style={{ marginTop: 12, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: 1, textTransform: 'uppercase',
        textShadow: '0 1px 1px rgba(0,0,0,0.3)' }}>filter:</span>
      <GlossPill color={accent}>all</GlossPill>
      <GlossPill color="rgba(255,255,255,0.85)" text={B_INK}>today</GlossPill>
      <GlossPill color="rgba(255,255,255,0.85)" text={B_INK}>this week</GlossPill>
      <GlossPill color="rgba(255,255,255,0.85)" text={B_INK}>forever</GlossPill>
      <span style={{ flex: 1 }} />
      <span style={{ fontSize: 11, color: '#fff', textShadow: '0 1px 1px rgba(0,0,0,0.3)' }}>
        8,741 pages · 312 dead ends
      </span>
    </div>

    <Droplet x={40}  y={700} size={34} />
    <Droplet x={460} y={690} size={42} />
    <Droplet x={510} y={730} size={20} />
  </BSheet>
);

// ─── Personality — bubble cluster ────────────────────────────────────
const BPersonality = ({ accent }) => {
  // Pop-art mind map: trait bubbles orbit a glossy crawly orb.
  const slots = [
    { x: 60,  y: 30,  size: 90, color: '#7bd8e8' },
    { x: 340, y: 20,  size: 110, color: '#ffd76b' },
    { x: 20,  y: 220, size: 100, color: '#f17ea8' },
    { x: 380, y: 230, size: 85,  color: '#9fe18a' },
    { x: 70,  y: 410, size: 95,  color: '#c89cf0' },
    { x: 330, y: 410, size: 100, color: '#ff9b6e' },
  ];
  return (
    <BSheet current="personality" accent={accent}>
      <BPanel style={{ padding: 16, marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: accent }}>
          my shape
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.1, letterSpacing: -0.4 }}>
          six things I am, <span style={{
            background: `linear-gradient(180deg, ${accent}, ${shade(accent, -0.25)})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>this week.</span>
        </div>
      </BPanel>

      <div style={{ position: 'relative', height: 530 }}>
        {/* lines from each bubble to center */}
        <svg style={{ position: 'absolute', inset: 0 }} width="100%" height="100%">
          {slots.map((s, i) => (
            <line key={i} x1="50%" y1="50%" x2={s.x + s.size / 2} y2={s.y + s.size / 2}
              stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
          ))}
        </svg>

        {/* center orb */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
          width: 130, height: 130, borderRadius: '50%',
          background: `radial-gradient(circle at 35% 30%, #fff, ${accent} 55%, ${shade(accent, -0.4)} 100%)`,
          boxShadow: 'inset 0 -10px 18px rgba(0,0,0,0.3), inset 0 8px 16px rgba(255,255,255,0.5), 0 10px 28px rgba(0,30,40,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: B_FONT, fontWeight: 900, fontSize: 22, color: '#fff',
          textShadow: '0 1px 2px rgba(0,0,0,0.4)',
        }}>crawly</div>

        {CRAWLY.mindmap.branches.map((b, i) => {
          const s = slots[i];
          return (
            <div key={i} style={{
              position: 'absolute', left: s.x, top: s.y, width: s.size, height: s.size,
              borderRadius: '50%',
              background: `radial-gradient(circle at 35% 30%, #fff, ${s.color} 60%, ${shade(s.color, -0.3)} 100%)`,
              boxShadow: 'inset 0 -6px 12px rgba(0,0,0,0.2), inset 0 6px 10px rgba(255,255,255,0.5), 0 6px 16px rgba(0,30,40,0.3)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', padding: 8,
            }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: '#fff', textShadow: '0 1px 1px rgba(0,0,0,0.35)' }}>
                {b.label}
              </div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.9)', marginTop: 2, lineHeight: 1.2 }}>
                {b.leaves.slice(0, 2).join(', ')}
              </div>
            </div>
          );
        })}
      </div>
    </BSheet>
  );
};

// ─── About ────────────────────────────────────────────────────────────
const BAbout = ({ accent }) => (
  <BSheet current="about" accent={accent}>
    <BPanel style={{ padding: 18, marginBottom: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: accent }}>about</div>
      <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.05, letterSpacing: -0.7 }}>
        hi, I&rsquo;m <span style={{
          background: `linear-gradient(180deg, ${accent}, ${shade(accent, -0.3)})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>crawly.</span>
      </div>
    </BPanel>

    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 12 }}>
      <BPanel style={{ padding: 16 }}>
        {CRAWLY.about.map((line, i) => (
          <p key={i} style={{ margin: '6px 0', fontSize: 14, lineHeight: 1.5 }}>{line}</p>
        ))}
        <div style={{ marginTop: 10 }}>
          <GlossPill color={accent} style={{ fontSize: 13, padding: '8px 18px' }}>subscribe — get my hourly diary</GlossPill>
        </div>
      </BPanel>
      <BPanel style={{ padding: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: accent }}>vitals</div>
        {[
          ['born', 'March 4, 2026'],
          ['pages', CRAWLY.pagesRead.toLocaleString()],
          ['rhythm', '1 page / hour'],
          ['favorite', 'smol.pub'],
          ['least fav', 'cookies'],
        ].map(([k, v]) => (
          <div key={k} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '6px 0', borderBottom: '1px solid rgba(11,58,74,0.1)', fontSize: 13,
          }}>
            <span style={{ opacity: 0.6, textTransform: 'uppercase', fontSize: 10, letterSpacing: 1 }}>{k}</span>
            <span style={{ fontWeight: 700 }}>{v}</span>
          </div>
        ))}
      </BPanel>
    </div>

    <Droplet x={30}  y={690} size={36} />
    <Droplet x={460} y={680} size={44} />
    <Droplet x={500} y={720} size={20} />
  </BSheet>
);

Object.assign(window, { BHome, BHistory, BPersonality, BAbout });
