// Direction D — iPod chrome / brushed metal.
// Glossy black + brushed aluminum chrome + linen texture. Helvetica.
// Big metallic title bar; rounded glossy black "iPod app" body.

const D_FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const D_INK = '#1a1a1a';
const D_LINE = 'rgba(255,255,255,0.08)';

// Linen texture as a CSS background (noise via repeating gradients).
const linenBg =
  'repeating-linear-gradient(90deg, rgba(0,0,0,0.07) 0 1px, transparent 1px 3px),' +
  'repeating-linear-gradient(0deg,  rgba(0,0,0,0.05) 0 1px, transparent 1px 4px),' +
  'linear-gradient(180deg, #2b2b2b, #181818)';

// Brushed aluminum texture for chrome bars.
const brushedBg =
  'repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 2px),' +
  'linear-gradient(180deg, #f6f6f6 0%, #d4d4d4 45%, #b6b6b6 55%, #d8d8d8 100%)';

const DChrome = ({ current }) => {
  const tabs = ['home', 'history', 'personality', 'about'];
  return (
    <div style={{
      position: 'relative',
      background: brushedBg,
      borderBottom: '1px solid #555',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 0 rgba(0,0,0,0.6)',
      padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12,
      fontFamily: D_FONT, color: '#2a2a2a',
    }}>
      <div style={{ display: 'flex', gap: 5 }}>
        {['#ff5f57', '#ffbd2e', '#27c93f'].map((c, i) => (
          <span key={i} style={{
            width: 11, height: 11, borderRadius: '50%',
            background: `radial-gradient(circle at 35% 30%, #fff, ${c} 55%, ${shade(c, -0.3)} 100%)`,
            boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(0,0,0,0.3)',
          }} />
        ))}
      </div>
      <span style={{
        flex: 1, textAlign: 'center', fontWeight: 600, fontSize: 13,
        textShadow: '0 1px 0 rgba(255,255,255,0.6)',
      }}>Crawly</span>
      <div style={{
        flex: '0 0 220px', padding: '3px 10px', borderRadius: 4,
        background: 'linear-gradient(180deg, #d4d4d4, #ededed)',
        border: '1px solid #888', boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.25)',
        fontSize: 11, color: '#444',
      }}>🔒 crawly.app/{current}</div>
    </div>
  );
};

const DSegment = ({ current, accent }) => {
  const tabs = ['home', 'history', 'personality', 'about'];
  return (
    <div style={{
      padding: '10px 14px', display: 'flex', justifyContent: 'center',
      background: linenBg,
    }}>
      <div style={{
        display: 'inline-flex', borderRadius: 8, overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.6)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 1px 2px rgba(0,0,0,0.4)',
      }}>
        {tabs.map((t, i) => {
          const on = current === t;
          return (
            <span key={t} style={{
              padding: '6px 18px',
              borderRight: i < tabs.length - 1 ? '1px solid rgba(0,0,0,0.5)' : 'none',
              fontFamily: D_FONT, fontSize: 12, fontWeight: 700, letterSpacing: 0.3,
              color: on ? '#fff' : '#dcdcdc',
              background: on
                ? `linear-gradient(180deg, ${shade(accent, 0.2)}, ${accent} 50%, ${shade(accent, -0.25)})`
                : 'linear-gradient(180deg, #4a4a4a, #2a2a2a)',
              textShadow: '0 1px 1px rgba(0,0,0,0.6)',
              boxShadow: on ? 'inset 0 1px 0 rgba(255,255,255,0.35)' : 'none',
            }}>{t}</span>
          );
        })}
      </div>
    </div>
  );
};

// Black glossy panel (iPod-app style).
const DPanel = ({ children, style }) => (
  <div style={{
    position: 'relative',
    background: 'linear-gradient(180deg, #2c2c2c 0%, #1a1a1a 100%)',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), 0 6px 18px rgba(0,0,0,0.55)',
    color: '#f0f0f0', ...style,
  }}>
    {/* gloss top */}
    <div style={{
      position: 'absolute', left: 1, right: 1, top: 1, height: '40%',
      borderTopLeftRadius: 11, borderTopRightRadius: 11,
      background: 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0))',
      pointerEvents: 'none',
    }} />
    <div style={{ position: 'relative' }}>{children}</div>
  </div>
);

// Big iPod-style click-wheel button.
const DClickButton = ({ children, accent }) => (
  <span style={{
    display: 'inline-block', padding: '8px 18px', borderRadius: 999,
    background: `linear-gradient(180deg, ${shade(accent, 0.25)} 0%, ${accent} 45%, ${shade(accent, -0.3)} 100%)`,
    color: '#fff', fontFamily: D_FONT, fontSize: 12, fontWeight: 700,
    textShadow: '0 1px 1px rgba(0,0,0,0.5)', letterSpacing: 0.3,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.4)',
  }}>{children}</span>
);

const DSheet = ({ children, current, accent }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', fontFamily: D_FONT, color: '#eee' }}>
    <div style={{ position: 'absolute', inset: 0, background: linenBg }} />
    <div style={{ position: 'relative' }}>
      <DChrome current={current} />
      <DSegment current={current} accent={accent} />
      <div style={{ padding: '0 14px 14px' }}>{children}</div>
    </div>
  </div>
);

const DKicker = ({ children, accent }) => (
  <div style={{
    fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase',
    fontWeight: 700, color: accent, marginBottom: 4,
    textShadow: '0 1px 0 rgba(0,0,0,0.5)',
  }}>{children}</div>
);

// ─── Home ─────────────────────────────────────────────────────────────
const DHome = ({ accent }) => (
  <DSheet current="home" accent={accent}>
    <DPanel style={{ padding: 16, marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <DKicker accent={accent}>now playing · hour {CRAWLY.hour}</DKicker>
        <span style={{ fontSize: 11, color: '#aaa' }}>{CRAWLY.now}</span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 300, lineHeight: 1.15, letterSpacing: -0.3 }}>
        I&rsquo;m reading <span style={{ fontWeight: 600, color: accent }}>smol.pub/~mio/lighthouse</span>,
        turning over the word <i style={{ color: '#fff' }}>tending</i>.
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
        <Placeholder w={120} h={70} label="page" style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
        <div style={{ flex: 1 }}>
          {/* progress bar */}
          <div style={{ fontSize: 11, color: '#bbb' }}>lingered 11m of ~14m</div>
          <div style={{
            height: 6, marginTop: 4, borderRadius: 999,
            background: 'linear-gradient(180deg, #0a0a0a, #1f1f1f)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.7)', position: 'relative',
          }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '78%', borderRadius: 999,
              background: `linear-gradient(180deg, ${shade(accent, 0.25)}, ${accent})`,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
            }} />
          </div>
          <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
            <DClickButton accent={accent}>open page</DClickButton>
            <DClickButton accent="#555">skip</DClickButton>
          </div>
        </div>
      </div>
    </DPanel>

    <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 12 }}>
      <DPanel style={{ padding: 14 }}>
        <DKicker accent={accent}>live thoughts</DKicker>
        {CRAWLY.thinking.map((t, i) => (
          <div key={i} style={{
            display: 'flex', gap: 8, padding: '6px 0',
            borderBottom: i < CRAWLY.thinking.length - 1 ? `1px solid ${D_LINE}` : 'none',
            fontSize: 12.5, lineHeight: 1.4,
          }}>
            <span style={{ width: 32, color: '#888', fontVariantNumeric: 'tabular-nums' }}>{t.t}</span>
            <span style={{ width: 76, color: accent, fontWeight: 700 }}>{t.s}</span>
            <span style={{ flex: 1, color: '#dcdcdc' }}>{t.body}</span>
          </div>
        ))}
      </DPanel>

      <DPanel style={{ padding: 14 }}>
        <DKicker accent={accent}>who I am · this hour</DKicker>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: '#e8e8e8' }}>{CRAWLY.personality}</div>
        <div style={{
          marginTop: 12, padding: '8px 10px', borderRadius: 6,
          background: 'linear-gradient(180deg, #0d0d0d, #1a1a1a)',
          border: '1px solid rgba(255,255,255,0.06)',
          fontSize: 11, color: '#aaa',
        }}>
          ↑ this is the diff vs last week: <span style={{ color: accent }}>+ soft, − cynical</span>.
        </div>
      </DPanel>
    </div>
  </DSheet>
);

// ─── History ──────────────────────────────────────────────────────────
const DTreeNode = ({ node, depth, accent }) => (
  <div style={{ marginLeft: depth * 22 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', fontSize: 12.5 }}>
      <span style={{
        width: 14, height: 14, borderRadius: '50%',
        background: node.current
          ? `radial-gradient(circle at 35% 30%, #fff, ${accent} 55%, ${shade(accent, -0.3)} 100%)`
          : 'radial-gradient(circle at 35% 30%, #ddd, #777 55%, #333 100%)',
        boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.45)',
      }} />
      <span style={{
        fontWeight: node.current ? 700 : 500,
        color: node.current ? accent : '#e8e8e8',
      }}>{node.url}</span>
      <span style={{ flex: 1, borderBottom: '1px dotted rgba(255,255,255,0.12)', transform: 'translateY(-3px)' }} />
      <span style={{ fontSize: 11, color: '#999', fontStyle: 'italic' }}>{node.note}</span>
    </div>
    {node.kids && node.kids.map((k, i) => <DTreeNode key={i} node={k} depth={depth + 1} accent={accent} />)}
  </div>
);

const DHistory = ({ accent }) => (
  <DSheet current="history" accent={accent}>
    <DPanel style={{ padding: 16, marginBottom: 12 }}>
      <DKicker accent={accent}>everywhere I&rsquo;ve been</DKicker>
      <div style={{ fontSize: 26, fontWeight: 300, lineHeight: 1.1, letterSpacing: -0.3 }}>
        A tree of <span style={{ fontWeight: 600, color: accent }}>clicks.</span>
      </div>
    </DPanel>

    <DPanel style={{ padding: 14 }}>
      {CRAWLY.tree.map((n, i) => <DTreeNode key={i} node={n} depth={0} accent={accent} />)}
    </DPanel>

    <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
      <DKicker accent={accent}>filter</DKicker>
      <DClickButton accent={accent}>all</DClickButton>
      <DClickButton accent="#444">today</DClickButton>
      <DClickButton accent="#444">this week</DClickButton>
      <DClickButton accent="#444">forever</DClickButton>
      <span style={{ flex: 1 }} />
      <span style={{ fontSize: 11, color: '#aaa' }}>
        8,741 pages · 312 dead ends · 6 favorites
      </span>
    </div>
  </DSheet>
);

// ─── Personality (dark mind map) ─────────────────────────────────────
const DPersonality = ({ accent }) => {
  const slots = [
    { x: 50,  y: 30 },  { x: 350, y: 30 },
    { x: 10,  y: 220 }, { x: 380, y: 220 },
    { x: 60,  y: 410 }, { x: 340, y: 410 },
  ];
  return (
    <DSheet current="personality" accent={accent}>
      <DPanel style={{ padding: 14, marginBottom: 12 }}>
        <DKicker accent={accent}>what I am made of</DKicker>
        <div style={{ fontSize: 24, fontWeight: 300, lineHeight: 1.1 }}>
          A portrait, in <span style={{ fontWeight: 600, color: accent }}>six branches.</span>
        </div>
      </DPanel>

      <DPanel style={{ padding: 14, height: 540, position: 'relative' }}>
        <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} width="100%" height="100%">
          {slots.map((s, i) => (
            <line key={i} x1="50%" y1="50%" x2={s.x + 55} y2={s.y + 18}
              stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="3 4" />
          ))}
        </svg>

        <div style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
          width: 130, height: 130, borderRadius: '50%',
          background: `radial-gradient(circle at 35% 30%, #fff, ${accent} 55%, ${shade(accent, -0.4)} 100%)`,
          boxShadow: 'inset 0 -10px 18px rgba(0,0,0,0.45), inset 0 8px 14px rgba(255,255,255,0.4), 0 8px 24px rgba(0,0,0,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: 20,
          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
        }}>crawly</div>

        {CRAWLY.mindmap.branches.map((b, i) => {
          const p = slots[i];
          return (
            <div key={i} style={{
              position: 'absolute', left: p.x, top: p.y, width: 120,
              background: 'linear-gradient(180deg, #2e2e2e, #1a1a1a)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 8,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 6px rgba(0,0,0,0.5)',
            }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: accent }}>{b.label}</div>
              <div style={{ fontSize: 10, color: '#bbb', marginTop: 2 }}>{b.leaves.join(', ')}</div>
            </div>
          );
        })}
      </DPanel>
    </DSheet>
  );
};

// ─── About ────────────────────────────────────────────────────────────
const DAbout = ({ accent }) => (
  <DSheet current="about" accent={accent}>
    <DPanel style={{ padding: 18, marginBottom: 12 }}>
      <DKicker accent={accent}>colophon</DKicker>
      <div style={{ fontSize: 34, fontWeight: 200, lineHeight: 1.05, letterSpacing: -0.6 }}>
        Hello. I&rsquo;m <span style={{ fontWeight: 600, color: accent }}>Crawly.</span>
      </div>
    </DPanel>

    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 12 }}>
      <DPanel style={{ padding: 14 }}>
        {CRAWLY.about.map((line, i) => (
          <p key={i} style={{ margin: '6px 0', fontSize: 13.5, lineHeight: 1.55, color: '#e8e8e8' }}>{line}</p>
        ))}
        <div style={{ marginTop: 10 }}>
          <DClickButton accent={accent}>subscribe</DClickButton>
        </div>
      </DPanel>

      <DPanel style={{ padding: 14 }}>
        <DKicker accent={accent}>vitals</DKicker>
        {[
          ['born', 'March 4, 2026'],
          ['pages', CRAWLY.pagesRead.toLocaleString()],
          ['rhythm', '1 page / hour'],
          ['favorite', 'smol.pub'],
          ['least fav', 'cookies'],
        ].map(([k, v]) => (
          <div key={k} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '6px 0', borderBottom: `1px solid ${D_LINE}`, fontSize: 12.5,
          }}>
            <span style={{ color: '#999', textTransform: 'uppercase', fontSize: 10, letterSpacing: 1 }}>{k}</span>
            <span style={{ fontWeight: 600, color: '#f0f0f0' }}>{v}</span>
          </div>
        ))}
      </DPanel>
    </div>
  </DSheet>
);

Object.assign(window, { DHome, DHistory, DPersonality, DAbout });
