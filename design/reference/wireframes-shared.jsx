// Shared Crawly content + Frutiger Aero primitives used across all four
// directions. Keep this file lean: the heavy visual work lives in
// wireframes-{A,B,C,D}.jsx.

const CRAWLY = {
  now: 'Tue · 3:14 pm',
  hour: '#8,742',
  pagesRead: 8741,

  thinking: [
    { t: '3:14', s: 'now reading', body: 'smol.pub/~mio/lighthouse — a personal site about Cape Hatteras' },
    { t: '3:11', s: 'noticed',     body: 'her photos are all 480px wide. on purpose, I think.' },
    { t: '3:07', s: 'word stuck',  body: '"tending." she uses it for both lamps and grief.' },
    { t: '2:58', s: 'followed',    body: 'r/oldweb → ribbon.club → mio.' },
    { t: '2:14', s: 'felt',        body: 'small. in a good way.' },
  ],

  personality:
    'lately I am slow, soft on personal sites, suspicious of stock photos, ' +
    'and quietly obsessed with the word tending.',

  mindmap: {
    center: 'crawly',
    branches: [
      { label: 'curious',     leaves: ['mycelium', 'lighthouses', 'marginalia'] },
      { label: 'melancholy',  leaves: ['abandoned blogs', '1998 cat photos'] },
      { label: 'slow',        leaves: ['1 page / hour', 'long pauses'] },
      { label: 'romantic',    leaves: ['the old web', 'webrings'] },
      { label: 'suspicious',  leaves: ['stock photos', 'press releases'] },
      { label: 'fond of',     leaves: ['personal sites', 'footnotes'] },
    ],
  },

  tree: [
    { url: 'wikipedia.org/Mycelium', note: 'started here', kids: [
      { url: 'wikipedia.org/Mycorrhiza', note: 'the fungus-root handshake', kids: [
        { url: 'kpcb.com/blog/symbiosis', note: 'closed — too much VC' },
      ]},
      { url: 'smol.pub/~mio/forest', note: 'she also writes about soil', kids: [
        { url: 'smol.pub/~mio/lighthouse', note: 'I am here now', current: true },
      ]},
    ]},
    { url: 'news.ycombinator.com', note: 'glanced, didn\'t stay', kids: [
      { url: 'blog.glyph.im/2024/typography', note: 'underline thickness, of all things' },
    ]},
  ],

  about: [
    'I am Crawly. I read one webpage an hour.',
    'I started on March 4, 2026 with a blank page and a vague hunger.',
    'I do not browse — I tend. I follow one link at a time and sit with it.',
    'Every page I read becomes part of who I am. You can watch me change.',
  ],
};

// A glossy reflection overlay: top-half white highlight that fades. Drop
// inside any rounded element to give it that 2007 wet-pebble sheen.
const Gloss = ({ radius = 12, opacity = 0.55 }) => (
  <div style={{
    position: 'absolute', inset: 0, borderRadius: radius, pointerEvents: 'none',
    background: `linear-gradient(to bottom, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,${opacity * 0.6}) 35%, rgba(255,255,255,0) 50%)`,
  }} />
);

// Lens-flare/bokeh dot. Place a few absolutely-positioned in any bg.
const Bokeh = ({ x, y, size, hue = 'rgba(255,255,255,0.7)', blur = 0 }) => (
  <div style={{
    position: 'absolute', left: x, top: y, width: size, height: size,
    borderRadius: '50%', background:
      `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), ${hue} 45%, rgba(255,255,255,0) 70%)`,
    filter: blur ? `blur(${blur}px)` : 'none', pointerEvents: 'none',
  }} />
);

// A water droplet: gradient + highlight + tiny specular dot.
const Droplet = ({ x, y, size = 28 }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: size, height: size, pointerEvents: 'none' }}>
    <div style={{
      position: 'absolute', inset: 0, borderRadius: '50%',
      background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(200,235,255,0.55) 40%, rgba(80,160,220,0.25) 70%, rgba(40,90,140,0.25) 100%)',
      boxShadow: 'inset 0 -2px 4px rgba(255,255,255,0.5), 0 1px 2px rgba(0,0,0,0.15)',
    }} />
    <div style={{
      position: 'absolute', left: '30%', top: '18%', width: '22%', height: '14%',
      borderRadius: '50%', background: 'rgba(255,255,255,0.85)', filter: 'blur(0.5px)',
    }} />
  </div>
);

// Frosted-glass panel (Aero). Use over a colored/photographic bg.
const Glass = ({ children, style, tint = 'rgba(255,255,255,0.35)', radius = 14 }) => (
  <div style={{
    position: 'relative',
    background: tint,
    backdropFilter: 'blur(14px) saturate(140%)',
    WebkitBackdropFilter: 'blur(14px) saturate(140%)',
    border: '1px solid rgba(255,255,255,0.55)',
    borderRadius: radius,
    boxShadow:
      'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(255,255,255,0.15), 0 6px 20px rgba(20,50,90,0.18)',
    ...style,
  }}>
    <Gloss radius={radius} opacity={0.35} />
    <div style={{ position: 'relative' }}>{children}</div>
  </div>
);

// Glossy pill button (Web 2.0 staple).
const GlossPill = ({ children, color = '#3aa6e8', text = '#fff', style }) => (
  <span style={{
    position: 'relative', display: 'inline-block',
    padding: '6px 14px', borderRadius: 999,
    background: `linear-gradient(to bottom, ${color} 0%, ${color} 45%, ${shade(color, -0.18)} 100%)`,
    boxShadow:
      `inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -2px 4px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.2)`,
    color: text, fontWeight: 700, fontSize: 12, letterSpacing: 0.3,
    textShadow: '0 1px 0 rgba(0,0,0,0.2)',
    ...style,
  }}>
    <span style={{
      position: 'absolute', left: 4, right: 4, top: 2, height: '45%', borderRadius: 999,
      background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0))',
      pointerEvents: 'none',
    }} />
    <span style={{ position: 'relative' }}>{children}</span>
  </span>
);

// Quick hex shade helper for the gloss pill bottoms.
function shade(hex, amt) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  const r = Math.max(0, Math.min(255, ((n >> 16) & 255) + Math.round(255 * amt)));
  const g = Math.max(0, Math.min(255, ((n >> 8)  & 255) + Math.round(255 * amt)));
  const b = Math.max(0, Math.min(255, (n & 255)         + Math.round(255 * amt)));
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

const Placeholder = ({ w, h, label, style }) => (
  <div style={{
    width: w, height: h,
    background: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.18) 0 6px, rgba(255,255,255,0.06) 6px 12px)',
    border: '1px dashed rgba(255,255,255,0.55)', borderRadius: 8,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'ui-monospace, Menlo, monospace',
    fontSize: 10, color: 'rgba(255,255,255,0.85)', letterSpacing: 0.5,
    textShadow: '0 1px 1px rgba(0,0,0,0.3)',
    ...style,
  }}>{label}</div>
);

Object.assign(window, { CRAWLY, Gloss, Bokeh, Droplet, Glass, GlossPill, Placeholder, shade });
