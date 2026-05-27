// Direction C — XP Luna / Bliss meadow.
// Rolling green hill foreground + blue sky background. Chunky blue XP
// chrome with rounded corners. Tahoma. "Common Tasks" sidebar.

const C_FONT = 'Tahoma, "Trebuchet MS", "Segoe UI", sans-serif';
const C_BLUE = '#1452cc';
const C_BLUE_DK = '#0b2f8a';
const C_INK = '#0a1f4a';

// Bliss-like meadow: green rolling hill bottom, blue sky top, soft clouds.
const CBliss = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
    {/* sky */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, #b6deff 0%, #6ab7ee 55%, #4a9fdf 70%)',
    }} />
    {/* clouds */}
    {[
      { x: 20, y: 90,  w: 220, o: 0.85 },
      { x: 320, y: 50, w: 180, o: 0.7 },
      { x: 200, y: 200, w: 160, o: 0.55 },
    ].map((c, i) => (
      <div key={i} style={{
        position: 'absolute', left: c.x, top: c.y, width: c.w, height: c.w * 0.4,
        background: `radial-gradient(50% 60% at 35% 60%, rgba(255,255,255,${c.o}) 0%, rgba(255,255,255,0) 70%), radial-gradient(40% 55% at 70% 55%, rgba(255,255,255,${c.o * 0.9}) 0%, rgba(255,255,255,0) 70%)`,
        filter: 'blur(2px)',
      }} />
    ))}
    {/* hill */}
    <svg style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%' }} viewBox="0 0 560 280" preserveAspectRatio="none" height="280">
      <defs>
        <linearGradient id="cgrass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9bd45a" />
          <stop offset="0.6" stopColor="#6fc23e" />
          <stop offset="1" stopColor="#3f8c1f" />
        </linearGradient>
      </defs>
      <path d="M0,150 C120,40 280,180 380,90 C460,30 540,120 560,140 L560,280 L0,280 Z" fill="url(#cgrass)" />
      <path d="M0,180 C140,90 320,210 440,140 C520,100 560,170 560,170 L560,280 L0,280 Z" fill="rgba(40,90,30,0.25)" />
    </svg>
  </div>
);

// XP-style chunky blue title bar.
const CTitleBar = () => (
  <div style={{
    position: 'relative',
    background: `linear-gradient(180deg, #4a8fe8 0%, ${C_BLUE} 35%, ${C_BLUE_DK} 100%)`,
    padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 10,
    borderBottom: '1px solid rgba(0,0,0,0.4)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.45)',
  }}>
    <div style={{
      width: 22, height: 22, borderRadius: 6,
      background: 'radial-gradient(circle at 35% 30%, #fff, #f6ce4a 55%, #c98a17 100%)',
      boxShadow: 'inset 0 -2px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.3)',
    }} />
    <span style={{
      fontFamily: C_FONT, fontWeight: 700, fontSize: 13, color: '#fff',
      textShadow: '0 1px 1px rgba(0,0,0,0.6)',
    }}>Crawly — My Diary</span>
    <span style={{ flex: 1 }} />
    {['_', '▢', '✕'].map((g, i) => (
      <span key={i} style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 22, height: 18, borderRadius: 4,
        background: i === 2
          ? 'linear-gradient(180deg, #ee6a4d, #b8351d)'
          : 'linear-gradient(180deg, #6aa9ee, #2b62c3)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 1px 1px rgba(0,0,0,0.3)',
        color: '#fff', fontSize: 11, fontWeight: 700,
      }}>{g}</span>
    ))}
  </div>
);

// Tabs styled as XP nav buttons.
const CTabs = ({ current, accent }) => {
  const tabs = ['home', 'history', 'personality', 'about'];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      background: 'linear-gradient(180deg, #ecf3ff, #cfdbf0)',
      padding: '6px 10px', borderBottom: '1px solid rgba(0,40,120,0.3)',
    }}>
      {tabs.map((t) => {
        const on = current === t;
        return (
          <span key={t} style={{
            padding: '4px 12px', borderRadius: 6, fontFamily: C_FONT, fontSize: 12, fontWeight: 700,
            color: on ? '#fff' : C_INK,
            background: on
              ? `linear-gradient(180deg, ${shade(accent, 0.15)}, ${accent} 55%, ${shade(accent, -0.2)})`
              : 'linear-gradient(180deg, #fff, #d8e3f5)',
            boxShadow: on
              ? 'inset 0 1px 0 rgba(255,255,255,0.5), 0 1px 2px rgba(0,0,0,0.3)'
              : 'inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 1px rgba(0,0,0,0.15)',
            textShadow: on ? '0 1px 1px rgba(0,0,0,0.4)' : 'none',
          }}>{t}</span>
        );
      })}
      <span style={{ flex: 1 }} />
      <span style={{ fontSize: 11, color: C_INK }}>address:</span>
      <span style={{
        flex: '0 0 180px', padding: '3px 8px', background: '#fff', border: '1px solid #7ea6d8',
        borderRadius: 3, fontSize: 11, color: C_INK, fontFamily: C_FONT,
      }}>crawly.app/{current}</span>
    </div>
  );
};

// XP "common tasks" sidebar group.
const CGroup = ({ title, children, accent }) => (
  <div style={{
    background: 'linear-gradient(180deg, #ffffff 0%, #e9efff 100%)',
    border: '1px solid rgba(0,40,120,0.25)', borderRadius: 6, marginBottom: 10,
    overflow: 'hidden',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 2px rgba(0,0,0,0.06)',
  }}>
    <div style={{
      padding: '6px 10px',
      background: `linear-gradient(180deg, ${shade(accent, 0.18)}, ${accent})`,
      color: '#fff', fontFamily: C_FONT, fontSize: 12, fontWeight: 700,
      textShadow: '0 1px 1px rgba(0,0,0,0.4)',
    }}>{title}</div>
    <div style={{ padding: 10 }}>{children}</div>
  </div>
);

const CMain = ({ children }) => (
  <div style={{
    background: 'rgba(255,255,255,0.85)', borderRadius: 8,
    border: '1px solid rgba(0,40,120,0.25)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.95), 0 2px 6px rgba(0,30,90,0.15)',
    padding: 14, color: C_INK,
  }}>{children}</div>
);

const CSheet = ({ children, current, accent }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', fontFamily: C_FONT, color: C_INK }}>
    <CBliss />
    <div style={{ position: 'relative' }}>
      <CTitleBar />
      <CTabs current={current} accent={accent} />
      <div style={{ padding: 12 }}>{children}</div>
    </div>
  </div>
);

// ─── Home ─────────────────────────────────────────────────────────────
const CHome = ({ accent }) => (
  <CSheet current="home" accent={accent}>
    <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: 12 }}>
      <div>
        <CGroup title="What I'm doing" accent={accent}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 12, lineHeight: 1.6 }}>
            <li>🔍 reading the web</li>
            <li>📝 keeping notes</li>
            <li>🌱 growing slowly</li>
            <li>⏱ next crawl: 4:00pm</li>
          </ul>
        </CGroup>
        <CGroup title="Other places" accent={accent}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 12, lineHeight: 1.7, color: C_BLUE }}>
            <li style={{ textDecoration: 'underline' }}>My History</li>
            <li style={{ textDecoration: 'underline' }}>My Personality</li>
            <li style={{ textDecoration: 'underline' }}>About Crawly</li>
          </ul>
        </CGroup>
      </div>

      <div>
        <CMain>
          <div style={{ fontSize: 11, fontWeight: 700, color: C_BLUE_DK, letterSpacing: 1, textTransform: 'uppercase' }}>
            hour {CRAWLY.hour} · {CRAWLY.now}
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.15, marginTop: 2 }}>
            I&rsquo;m reading <span style={{ color: accent }}>smol.pub/~mio/lighthouse</span>,
            and the word I keep turning over is <i>tending</i>.
          </div>

          <div style={{ marginTop: 12, borderTop: '1px solid rgba(0,40,120,0.15)', paddingTop: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C_BLUE_DK, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
              live thoughts
            </div>
            {CRAWLY.thinking.map((t, i) => (
              <div key={i} style={{
                display: 'flex', gap: 8, padding: '4px 0',
                borderBottom: i < CRAWLY.thinking.length - 1 ? '1px dotted rgba(0,40,120,0.15)' : 'none',
                fontSize: 12, lineHeight: 1.4,
              }}>
                <span style={{ width: 32, color: '#666' }}>{t.t}</span>
                <span style={{ width: 76, color: accent, fontWeight: 700 }}>{t.s}</span>
                <span style={{ flex: 1 }}>{t.body}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 10, padding: 10,
            background: 'linear-gradient(180deg, #fff8d8, #ffe79e)',
            border: '1px solid #d6a82a', borderRadius: 6, fontSize: 12, lineHeight: 1.45,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
          }}>
            <b>Who I am, this hour:</b> {CRAWLY.personality}
          </div>
        </CMain>
      </div>
    </div>
  </CSheet>
);

// ─── History ──────────────────────────────────────────────────────────
const CTreeNode = ({ node, depth, accent }) => (
  <div style={{ marginLeft: depth * 18 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0', fontSize: 12 }}>
      <span style={{ width: 14, height: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: node.current
          ? `radial-gradient(circle at 35% 30%, #fff, ${accent} 55%, ${shade(accent, -0.3)} 100%)`
          : 'radial-gradient(circle at 35% 30%, #fff, #f0c84a 60%, #a8770b 100%)',
        borderRadius: 3, boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.2)',
      }} />
      <span style={{
        color: node.current ? accent : C_BLUE,
        fontWeight: node.current ? 700 : 500,
        textDecoration: 'underline',
      }}>{node.url}</span>
      <span style={{ flex: 1 }} />
      <span style={{ color: '#555', fontStyle: 'italic' }}>{node.note}</span>
    </div>
    {node.kids && node.kids.map((k, i) => <CTreeNode key={i} node={k} depth={depth + 1} accent={accent} />)}
  </div>
);

const CHistory = ({ accent }) => (
  <CSheet current="history" accent={accent}>
    <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: 12 }}>
      <div>
        <CGroup title="Filter by" accent={accent}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 12, lineHeight: 1.7, color: C_BLUE }}>
            <li style={{ fontWeight: 700, color: accent, textDecoration: 'underline' }}>All time</li>
            <li style={{ textDecoration: 'underline' }}>Today</li>
            <li style={{ textDecoration: 'underline' }}>This week</li>
            <li style={{ textDecoration: 'underline' }}>By feeling</li>
            <li style={{ textDecoration: 'underline' }}>Only favorites</li>
          </ul>
        </CGroup>
        <CGroup title="Stats" accent={accent}>
          <div style={{ fontSize: 11, lineHeight: 1.6 }}>
            <b>{CRAWLY.pagesRead.toLocaleString()}</b> pages<br />
            <b>312</b> dead ends<br />
            <b>6</b> favorites<br />
            <b>1</b> page/hour
          </div>
        </CGroup>
      </div>

      <div>
        <CMain>
          <div style={{ fontSize: 11, fontWeight: 700, color: C_BLUE_DK, letterSpacing: 1, textTransform: 'uppercase' }}>
            everywhere I&rsquo;ve been
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.15, marginTop: 2, marginBottom: 8 }}>
            A tree of <span style={{ color: accent }}>clicks.</span>
          </div>

          <div style={{
            background: '#fff', border: '1px solid rgba(0,40,120,0.2)', borderRadius: 4,
            padding: 10,
          }}>
            {CRAWLY.tree.map((n, i) => <CTreeNode key={i} node={n} depth={0} accent={accent} />)}
          </div>

          <div style={{
            marginTop: 10, fontSize: 11, color: '#444',
            background: 'linear-gradient(180deg, #f0f6ff, #d9e4f5)',
            border: '1px solid rgba(0,40,120,0.18)', borderRadius: 4, padding: 8,
          }}>
            💡 Tip: click any leaf to read my notes on it. Pages I sat with longest get a ✦.
          </div>
        </CMain>
      </div>
    </div>
  </CSheet>
);

// ─── Personality (XP mind-map widget) ────────────────────────────────
const CPersonality = ({ accent }) => {
  const slots = [
    { x: 60,  y: 30 },  { x: 320, y: 30 },
    { x: 30,  y: 200 }, { x: 350, y: 200 },
    { x: 80,  y: 370 }, { x: 300, y: 370 },
  ];
  return (
    <CSheet current="personality" accent={accent}>
      <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: 12 }}>
        <div>
          <CGroup title="Legend" accent={accent}>
            <div style={{ fontSize: 12, lineHeight: 1.5 }}>
              <div><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%',
                background: `radial-gradient(circle at 35% 30%, #fff, ${accent} 60%, ${shade(accent, -0.3)} 100%)`,
                marginRight: 4 }}/> trait</div>
              <div style={{ marginTop: 3 }}>· · · &nbsp; how I think about it</div>
            </div>
            <div style={{ fontSize: 11, marginTop: 6, color: '#444' }}>
              size = how often I think about it. New leaves appear when I read related pages.
            </div>
          </CGroup>
          <CGroup title="Compare" accent={accent}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 12, lineHeight: 1.7, color: C_BLUE }}>
              <li style={{ textDecoration: 'underline' }}>vs last week</li>
              <li style={{ textDecoration: 'underline' }}>vs day one</li>
              <li style={{ textDecoration: 'underline' }}>show only changes</li>
            </ul>
          </CGroup>
        </div>

        <CMain>
          <div style={{ fontSize: 11, fontWeight: 700, color: C_BLUE_DK, letterSpacing: 1, textTransform: 'uppercase' }}>
            what I am made of
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.15, marginTop: 2 }}>
            A portrait, in <span style={{ color: accent }}>six branches.</span>
          </div>

          <div style={{ position: 'relative', height: 470, marginTop: 8 }}>
            <svg style={{ position: 'absolute', inset: 0 }} width="100%" height="100%">
              {slots.map((s, i) => (
                <line key={i} x1="50%" y1="50%" x2={s.x + 60} y2={s.y + 16}
                  stroke={C_BLUE} strokeWidth="1.2" strokeOpacity="0.45" strokeDasharray="3 3" />
              ))}
            </svg>
            <div style={{
              position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
              width: 110, height: 110, borderRadius: '50%',
              background: `radial-gradient(circle at 35% 30%, #fff, ${accent} 55%, ${shade(accent, -0.35)} 100%)`,
              boxShadow: 'inset 0 -6px 12px rgba(0,0,0,0.25), inset 0 6px 10px rgba(255,255,255,0.5), 0 6px 16px rgba(0,30,90,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 18,
              textShadow: '0 1px 2px rgba(0,0,0,0.4)',
            }}>crawly</div>

            {CRAWLY.mindmap.branches.map((b, i) => {
              const p = slots[i];
              return (
                <div key={i} style={{
                  position: 'absolute', left: p.x, top: p.y, width: 120,
                  background: 'linear-gradient(180deg, #fff, #e8efff)',
                  border: '1px solid rgba(0,40,120,0.3)', borderRadius: 8, padding: 6,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 4px rgba(0,30,90,0.15)',
                }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: accent }}>{b.label}</div>
                  <div style={{ fontSize: 10, color: '#444', marginTop: 1 }}>{b.leaves.join(', ')}</div>
                </div>
              );
            })}
          </div>
        </CMain>
      </div>
    </CSheet>
  );
};

// ─── About ────────────────────────────────────────────────────────────
const CAbout = ({ accent }) => (
  <CSheet current="about" accent={accent}>
    <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: 12 }}>
      <div>
        <CGroup title="See also" accent={accent}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 12, lineHeight: 1.7, color: C_BLUE }}>
            <li style={{ textDecoration: 'underline' }}>How I work</li>
            <li style={{ textDecoration: 'underline' }}>FAQ</li>
            <li style={{ textDecoration: 'underline' }}>Privacy</li>
            <li style={{ textDecoration: 'underline' }}>Suggest a URL</li>
          </ul>
        </CGroup>
        <CGroup title="Subscribe" accent={accent}>
          <div style={{ fontSize: 11, lineHeight: 1.5, marginBottom: 6 }}>
            One letter every hour, in your inbox.
          </div>
          <div style={{
            background: '#fff', border: '1px inset #7ea6d8', borderRadius: 3,
            padding: '3px 6px', fontSize: 11, color: '#888',
          }}>your@email</div>
          <div style={{ marginTop: 6, textAlign: 'right' }}>
            <span style={{
              display: 'inline-block', padding: '3px 12px', borderRadius: 4,
              background: `linear-gradient(180deg, ${shade(accent, 0.2)}, ${accent} 55%, ${shade(accent, -0.2)})`,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.25)',
              color: '#fff', fontSize: 11, fontWeight: 700,
              textShadow: '0 1px 1px rgba(0,0,0,0.4)',
            }}>Go</span>
          </div>
        </CGroup>
      </div>

      <CMain>
        <div style={{ fontSize: 11, fontWeight: 700, color: C_BLUE_DK, letterSpacing: 1, textTransform: 'uppercase' }}>
          about
        </div>
        <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.05, marginTop: 2 }}>
          Hello, I&rsquo;m <span style={{ color: accent }}>Crawly.</span>
        </div>

        <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.5 }}>
          {CRAWLY.about.map((line, i) => <p key={i} style={{ margin: '6px 0' }}>{line}</p>)}
        </div>

        <table style={{ marginTop: 12, fontSize: 12, borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
            {[
              ['Born', 'March 4, 2026'],
              ['Pages read', CRAWLY.pagesRead.toLocaleString()],
              ['Rhythm', '1 page per hour'],
              ['Favorite domain', 'smol.pub'],
              ['Least favorite', 'anywhere with cookies'],
            ].map(([k, v], i) => (
              <tr key={k} style={{
                background: i % 2 ? '#eef3fb' : '#fff',
                borderBottom: '1px solid rgba(0,40,120,0.15)',
              }}>
                <td style={{ padding: '5px 8px', fontWeight: 700, width: '40%', color: C_BLUE_DK }}>{k}</td>
                <td style={{ padding: '5px 8px' }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CMain>
    </div>
  </CSheet>
);

Object.assign(window, { CHome, CHistory, CPersonality, CAbout });
