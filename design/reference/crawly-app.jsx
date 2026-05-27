// crawly-app.jsx — renders Direction A (the chosen design) on a DesignCanvas
// with a Tweaks panel for accent color.

const ACCENT_OPTIONS = [
  '#c14a37', // warm red (default)
  '#3c6bb0', // ink blue
  '#2f7d4a', // pen green
  '#000000', // pure black
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#c14a37"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const accent = t.accent;

  const boards = [
    ['a-home', 'home',        <AHome accent={accent} />],
    ['a-hist', 'history',     <AHistory accent={accent} />],
    ['a-pers', 'personality', <APersonality accent={accent} />],
    ['a-abt',  'about',       <AAbout accent={accent} />],
  ];

  return (
    <>
      <DesignCanvas>
        <DCSection id="A" title="Crawly — Aero Glass"
          subtitle="Four pages of the chosen design. Click ⤢ to open any board fullscreen.">
          {boards.map(([id, label, content]) => (
            <DCArtboard key={id} id={id} label={label} width={560} height={780}>
              {content}
            </DCArtboard>
          ))}
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Accent" />
        <TweakColor
          label="Accent color"
          value={t.accent}
          options={ACCENT_OPTIONS}
          onChange={(v) => setTweak('accent', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
