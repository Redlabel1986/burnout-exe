import { createContext, useContext, useEffect, useState } from "react";

type Lang = "de" | "en";

type Strings = {
  nav: { music: string; about: string; stack: string; links: string; live: string };
  hero: {
    chipRelease: string; chipVersion: string; chipLicense: string;
    tagline: string; prompt: string; cta1: string; cta2: string;
    stats: { tracks: string; runtime: string; release: string; bpm: string };
  };
  music: { section: string; kicker: string; label: string; live: string };
  about: {
    section: string; kicker: string;
    p1: React.ReactNode; p2: React.ReactNode; p3: React.ReactNode; quote: string;
    specTitles: { alias: string; origin: string; genre: string; stack: string; uptime: string; coffee: string; sleep: string; status: string };
    specValues: { origin: string; genre: string; status: string };
  };
  stack: { section: string; kicker: string; intro: React.ReactNode };
  links: {
    section: string; kicker: string; soon: string; open: string;
    subscribeLabel: React.ReactNode; subscribePlaceholder: string;
    subscribeBtn: string; subscribeDone: string;
  };
  footer: { copy: string; impressum: string; datenschutz: string; top: string; built: string; locale: string };
  modal: { esc: string; close: string };
  toggle: { de: string; en: string; aria: string };
};

const STRINGS: Record<Lang, Strings> = {
  de: {
    nav: { music: "./musik", about: "./bio", stack: "./stack", links: "./links", live: "● LIVE" },
    hero: {
      chipRelease: "ALBUM JETZT VERFÜGBAR",
      chipVersion: "v1.0.0 — stable",
      chipLicense: "lizenziert unter GPL (General Panic License)",
      tagline:
        "> schmerz kompilieren, 4/4 bei 124 bpm. build passing. sleep failing.",
      prompt: "jason@lateshift ~ %",
      cta1: "▶ JETZT HÖREN",
      cta2: "⌘ TRACKS ANSEHEN",
      stats: { tracks: "Tracks", runtime: "Laufzeit", release: "Release", bpm: "BPM" },
    },
    music: {
      section: "Neon Stack Overflow",
      kicker: "album.play()",
      label: "STREAM / spotify.embed",
      live: "● LIVE FEED",
    },
    about: {
      section: "Über den Künstler",
      kicker: "README.md",
      p1: (
        <>
          <span className="drop">B</span>urnout.exe ist das Alias eines Frontend-Entwicklers, der
          aufgehört hat, Tickets zu schließen, und angefangen hat, Sets zu schließen. Nach sieben
          Jahren Dashboards, SLAs und Terminal-Dauerlicht ist die IDE irgendwann abgestürzt. Die
          DAW&nbsp;nicht.
        </>
      ),
      p2: (
        <>
          <strong>Neon Stack Overflow</strong> ist, was danach herauskam — ein Album, ausgebleicht
          vom Monitorlicht, zusammengenäht aus Stand-up-Schuld, Pull Requests um 3 Uhr morgens und
          dem spezifischen Brummen einer mechanischen Tastatur am Limit. Kein Konzeptalbum, eher
          ein Crash-Report — in Arpeggios gerendert.
        </>
      ),
      p3: "Zu erwarten: analoge Wärme, digitaler Zweifel, Drum-Machines, die jede Bereitschaftswoche abgespeichert haben, und Synths auf der exakten Frequenz eines Production-Outages. Musik für Leute, die trotzdem weiter shippen.",
      quote: "Jeder Song ist eine Commit-Message, für die ich zu müde war.",
      specTitles: {
        alias: "alias", origin: "herkunft", genre: "genre", stack: "stack",
        uptime: "uptime", coffee: "kaffee", sleep: "schlaf", status: "status",
      },
      specValues: {
        origin: "hannover / remote",
        genre: "dark synthwave",
        status: "● online",
      },
    },
    stack: {
      section: "Tech Stack",
      kicker: "require('./tools')",
      intro: (
        <>
          <span className="prompt">$</span> cat package.json · abhängigkeiten aus muscle memory
          kompiliert. <span className="stack-err">ERR_UNSTABLE_HEAP</span>
        </>
      ),
    },
    links: {
      section: "Distribution",
      kicker: "connect()",
      soon: "soon",
      open: "open",
      subscribeLabel: (
        <>
          <span className="prompt">subscribe@burnout ~ %</span> e-mail eintragen für den nächsten drop
        </>
      ),
      subscribePlaceholder: "du@localhost",
      subscribeBtn: "ABSENDEN ▸",
      subscribeDone: "✓ IN WARTESCHLANGE",
    },
    footer: {
      copy: "© MMXXVI — alle exceptions unhandled",
      impressum: "./impressum",
      datenschutz: "./datenschutz",
      top: "./top ↑",
      built: "gebaut um 04:12 mit zwei monitoren und ohne schlaf",
      locale: "hannover / remote · de",
    },
    modal: {
      esc: "ESC zum schließen · inhalte ohne gewähr",
      close: "schließen",
    },
    toggle: { de: "DE", en: "EN", aria: "Sprache umschalten" },
  },
  en: {
    nav: { music: "./music", about: "./about", stack: "./stack", links: "./links", live: "● LIVE" },
    hero: {
      chipRelease: "ALBUM_OUT_NOW",
      chipVersion: "v1.0.0 — stable",
      chipLicense: "licensed under GPL (General Panic License)",
      tagline:
        "> compiling pain into 4/4 at 124 bpm. build passing. sleep failing.",
      prompt: "jason@lateshift ~ %",
      cta1: "▶ LISTEN NOW",
      cta2: "⌘ VIEW TRACKS",
      stats: { tracks: "Tracks", runtime: "Runtime", release: "Release", bpm: "BPM" },
    },
    music: {
      section: "Neon Stack Overflow",
      kicker: "album.play()",
      label: "STREAM / spotify.embed",
      live: "● LIVE FEED",
    },
    about: {
      section: "About the artist",
      kicker: "README.md",
      p1: (
        <>
          <span className="drop">B</span>urnout.exe is the alias of a frontend developer who
          stopped closing tickets and started closing sets. After seven years shipping dashboards,
          chasing SLAs, and living inside a terminal, the IDE finally crashed. The
          DAW&nbsp;didn&rsquo;t.
        </>
      ),
      p2: (
        <>
          <strong>Neon Stack Overflow</strong> is what came out of the other side — an album
          bleached by monitor glow, stitched from stand-up guilt, 3 a.m. pull requests, and the
          specific hum of a mechanical keyboard at diminishing returns. It is not a concept album
          so much as a crash report, rendered in arpeggios.
        </>
      ),
      p3: "Expect: analog warmth, digital doubt, drum machines that remember every on-call week, and synths tuned to the exact frequency of a production outage. It is music for people who keep shipping.",
      quote: "Every song is a commit message I was too tired to write.",
      specTitles: {
        alias: "alias", origin: "origin", genre: "genre", stack: "stack",
        uptime: "uptime", coffee: "coffee", sleep: "sleep", status: "status",
      },
      specValues: {
        origin: "hannover / remote",
        genre: "dark synthwave",
        status: "● online",
      },
    },
    stack: {
      section: "Tech stack",
      kicker: "require('./tools')",
      intro: (
        <>
          <span className="prompt">$</span> cat package.json · dependencies compiled from
          muscle memory. <span className="stack-err">ERR_UNSTABLE_HEAP</span>
        </>
      ),
    },
    links: {
      section: "Distribution",
      kicker: "connect()",
      soon: "soon",
      open: "open",
      subscribeLabel: (
        <>
          <span className="prompt">subscribe@burnout ~ %</span> drop your email for the next drop
        </>
      ),
      subscribePlaceholder: "you@localhost",
      subscribeBtn: "TRANSMIT ▸",
      subscribeDone: "✓ ENQUEUED",
    },
    footer: {
      copy: "© MMXXVI — all exceptions unhandled",
      impressum: "./imprint",
      datenschutz: "./privacy",
      top: "./top ↑",
      built: "built at 04:12 with two monitors and no sleep",
      locale: "hannover / remote · de",
    },
    modal: {
      esc: "ESC to close · content provided without warranty",
      close: "close",
    },
    toggle: { de: "DE", en: "EN", aria: "Toggle language" },
  },
};

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Strings }>(
  { lang: "en", setLang: () => {}, t: STRINGS.en }
);

const useLang = () => useContext(LangContext);

const SOCIALS = [
  {
    name: "Spotify",
    handle: "open.spotify.com/artist",
    href: "https://open.spotify.com/intl-de/artist/5TMQNTnmUSCfYo8i7kYYDk",
  },
  {
    name: "Apple Music",
    handle: "music.apple.com/de/artist",
    href: "https://music.apple.com/de/artist/burnout-exe/1894126036",
  },
  {
    name: "YouTube Music",
    handle: "music.youtube.com",
    href: "https://music.youtube.com/search?q=burnout.exe",
  },
  {
    name: "TikTok",
    handle: "@burnoutexe",
    href: "https://www.tiktok.com/@burnoutexe",
  },
  { name: "GitHub", handle: "/burnout-exe", href: "#" },
];

function useTypewriter(text: string, speed = 55) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);
  return out;
}

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

function LangToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label={t.toggle.aria}>
      <button
        type="button"
        className={lang === "de" ? "lang-on" : ""}
        onClick={() => setLang("de")}
        aria-pressed={lang === "de"}
      >
        {t.toggle.de}
      </button>
      <span aria-hidden>/</span>
      <button
        type="button"
        className={lang === "en" ? "lang-on" : ""}
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
      >
        {t.toggle.en}
      </button>
    </div>
  );
}

function NavBar() {
  const clock = useClock();
  const stamp = clock.toISOString().replace("T", " ").slice(0, 19);
  const { t } = useLang();
  return (
    <nav className="nav">
      <div className="nav-brand">
        <span className="nav-dot" aria-hidden />
        <span>burnout.exe</span>
      </div>
      <div className="nav-links">
        <a href="#music">{t.nav.music}</a>
        <a href="#about">{t.nav.about}</a>
        <a href="#stack">{t.nav.stack}</a>
        <a href="#links">{t.nav.links}</a>
      </div>
      <div className="nav-status" aria-label="system status">
        <LangToggle />
        <span className="nav-live">{t.nav.live}</span>
        <span className="nav-time">{stamp} UTC</span>
      </div>
    </nav>
  );
}

function Hero() {
  const { t } = useLang();
  const tagline = useTypewriter(t.hero.tagline);
  return (
    <header className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-meta">
          <span className="chip chip-mag">{t.hero.chipRelease}</span>
          <span className="chip">{t.hero.chipVersion}</span>
          <span className="chip chip-dim">{t.hero.chipLicense}</span>
        </div>
        <h1 className="glitch" data-text="Burnout.exe">
          Burnout.exe
        </h1>
        <p className="hero-sub">
          <span className="prompt">{t.hero.prompt}</span> {tagline}
          <span className="caret" aria-hidden>
            _
          </span>
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#music">
            {t.hero.cta1}
          </a>
          <a className="btn btn-ghost" href="#music">
            {t.hero.cta2}
          </a>
        </div>
        <dl className="hero-stats">
          <div>
            <dt>{t.hero.stats.tracks}</dt>
            <dd>08</dd>
          </div>
          <div>
            <dt>{t.hero.stats.runtime}</dt>
            <dd>36:12</dd>
          </div>
          <div>
            <dt>{t.hero.stats.release}</dt>
            <dd>2026.04.19</dd>
          </div>
          <div>
            <dt>BPM</dt>
            <dd>92—148</dd>
          </div>
        </dl>
      </div>
      <div className="scanlines" aria-hidden />
    </header>
  );
}

function Player() {
  const { t } = useLang();
  return (
    <section className="music" id="music">
      <SectionHeading eyebrow="// 01" title={t.music.section} kicker={t.music.kicker} />
      <div className="spotify">
        <div className="spotify-head">
          <span className="label">{t.music.label}</span>
          <span className="spotify-live">{t.music.live}</span>
        </div>
        <iframe
          data-testid="embed-iframe"
          className="spotify-frame"
          title="Burnout.exe — Neon Stack Overflow on Spotify"
          src="https://open.spotify.com/embed/album/1E3aOguhe3UiwRcjxmCVpt?utm_source=generator&theme=0"
          width="100%"
          height="352"
          frameBorder={0}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  kicker,
}: {
  eyebrow: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="sect-head">
      <span className="sect-eyebrow">{eyebrow}</span>
      <h2 className="sect-title glitch-sm" data-text={title}>
        {title}
      </h2>
      {kicker && <span className="sect-kicker">{kicker}</span>}
    </div>
  );
}

function About() {
  const { t } = useLang();
  return (
    <section className="about" id="about">
      <SectionHeading eyebrow="// 02" title={t.about.section} kicker={t.about.kicker} />
      <div className="about-grid">
        <article className="about-body">
          <figure className="avatar" aria-label="Burnout.exe — profile image">
            <div className="avatar-frame">
              <img src="/jason.png" alt="Burnout.exe" loading="lazy" />
              <div className="avatar-scan" aria-hidden />
              <div className="avatar-ring" aria-hidden />
            </div>
            <figcaption>
              <span className="avatar-name">burnout.exe</span>
              <span className="avatar-sub">./self-portrait.png</span>
            </figcaption>
          </figure>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
          <div className="about-quote">
            <span className="quote-mark">&quot;</span>
            {t.about.quote}
            <span className="quote-mark">&quot;</span>
          </div>
        </article>
        <aside className="about-side" aria-label="system spec">
          <div className="spec">
            <div className="spec-row"><span>{t.about.specTitles.alias}</span><span>burnout.exe</span></div>
            <div className="spec-row"><span>{t.about.specTitles.origin}</span><span>{t.about.specValues.origin}</span></div>
            <div className="spec-row"><span>{t.about.specTitles.genre}</span><span>{t.about.specValues.genre}</span></div>
            <div className="spec-row"><span>{t.about.specTitles.stack}</span><span>OB-6 · TR-8s · TypeScript</span></div>
            <div className="spec-row"><span>{t.about.specTitles.uptime}</span><span>97.3%</span></div>
            <div className="spec-row"><span>{t.about.specTitles.coffee}</span><span>∞</span></div>
            <div className="spec-row"><span>{t.about.specTitles.sleep}</span><span>null</span></div>
            <div className="spec-row"><span>{t.about.specTitles.status}</span><span className="pulse">{t.about.specValues.status}</span></div>
          </div>
          <pre className="log" aria-hidden>
{`$ tail -f ~/artist.log
[04:11] resolve merge in bassline
[04:27] reverb.wet += 0.2
[04:52] TODO: sleep (unimplemented)
[05:06] export > master.wav
[05:07] ship it`}
          </pre>
        </aside>
      </div>
    </section>
  );
}

type Tech = {
  name: string;
  tag: string;
  hue: "mag" | "cyan" | "violet" | "blue" | "amber";
  svg: JSX.Element;
};

const TECH: Tech[] = [
  {
    name: "React",
    tag: "ui.lib",
    hue: "cyan",
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <g fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="32" cy="32" r="4.5" fill="currentColor" stroke="none" />
          <ellipse cx="32" cy="32" rx="22" ry="8.5" />
          <ellipse cx="32" cy="32" rx="22" ry="8.5" transform="rotate(60 32 32)" />
          <ellipse cx="32" cy="32" rx="22" ry="8.5" transform="rotate(120 32 32)" />
        </g>
      </svg>
    ),
  },
  {
    name: "Next.js",
    tag: "ssr.meta",
    hue: "cyan",
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M22 18 V46 M22 18 L42 46 M42 18 V46" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    name: "Vue",
    tag: "ui.lib",
    hue: "cyan",
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path d="M6 14 H18 L32 38 L46 14 H58 L32 56 Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="miter" />
        <path d="M18 14 H28 L32 22 L36 14 H46 L32 38 Z" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: "Nuxt",
    tag: "ssr.meta",
    hue: "cyan",
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path d="M8 50 L22 24 L32 42 M22 24 L30 38 M28 50 L42 24 L56 50 Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="miter" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    tag: "lang.strict",
    hue: "blue",
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <rect x="6" y="6" width="52" height="52" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M18 30 H36 M27 30 V52" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
        <path d="M50 34 C46 30 38 30 38 36 C38 42 50 40 50 46 C50 52 42 52 38 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    tag: "lang.dyn",
    hue: "amber",
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <rect x="6" y="6" width="52" height="52" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M30 30 V46 C30 52 22 52 18 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
        <path d="M50 34 C46 30 38 30 38 36 C38 42 50 40 50 46 C50 52 42 52 38 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    tag: "runtime",
    hue: "violet",
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path
          d="M32 4 L56 18 V46 L32 60 L8 46 V18 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="miter"
        />
        <path
          d="M22 44 V20 L42 44 V20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    ),
  },
  {
    name: "Vite",
    tag: "build.tool",
    hue: "mag",
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path d="M6 12 H58 L32 58 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" />
        <path d="M32 18 L42 22 L36 34 L40 34 L26 52 L30 38 L24 38 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" />
      </svg>
    ),
  },
  {
    name: "npm",
    tag: "registry",
    hue: "mag",
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <rect
          x="4"
          y="16"
          width="56"
          height="32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* n */}
        <path
          d="M8 44 V20 H20 V44"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        {/* p */}
        <path
          d="M24 48 V20 H36 V32 H24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        {/* m */}
        <path
          d="M40 44 V20 H48 V32 M48 20 H56 V44"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    ),
  },
  {
    name: "pnpm",
    tag: "pkg.fast",
    hue: "amber",
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <g fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="6" y="6" width="16" height="16" />
          <rect x="24" y="6" width="16" height="16" />
          <rect x="42" y="6" width="16" height="16" />
          <rect x="24" y="24" width="16" height="16" />
          <rect x="42" y="24" width="16" height="16" />
          <rect x="42" y="42" width="16" height="16" />
        </g>
      </svg>
    ),
  },
  {
    name: "HTML5",
    tag: "markup",
    hue: "mag",
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path
          d="M10 4 L14 54 L32 60 L50 54 L54 4 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="miter"
        />
        <text
          x="32"
          y="44"
          textAnchor="middle"
          fontFamily="Orbitron, monospace"
          fontWeight={900}
          fontSize={26}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
        >
          5
        </text>
        <path
          d="M22 18 H42"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.55"
        />
      </svg>
    ),
  },
  {
    name: "CSS3",
    tag: "style",
    hue: "blue",
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path
          d="M10 4 L14 54 L32 60 L50 54 L54 4 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="miter"
        />
        <text
          x="32"
          y="44"
          textAnchor="middle"
          fontFamily="Orbitron, monospace"
          fontWeight={900}
          fontSize={26}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
        >
          3
        </text>
        <path
          d="M22 18 H42"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.55"
        />
      </svg>
    ),
  },
  {
    name: "Tailwind",
    tag: "utility.css",
    hue: "cyan",
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path d="M10 28 C14 18 22 14 30 18 C34 20 36 24 40 26 C44 28 48 26 52 22 C48 32 40 36 32 32 C28 30 26 26 22 24 C18 22 14 24 10 28 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M14 44 C18 34 26 30 34 34 C38 36 40 40 44 42 C48 44 52 42 56 38 C52 48 44 52 36 48 C32 46 30 42 26 40 C22 38 18 40 14 44 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "Git",
    tag: "vcs",
    hue: "violet",
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <rect x="8" y="8" width="48" height="48" transform="rotate(45 32 32)" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="22" cy="32" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="42" cy="22" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="42" cy="42" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M22 32 L42 22 M22 32 L42 42" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

function TechStack() {
  const { t } = useLang();
  return (
    <section className="stack" id="stack">
      <SectionHeading eyebrow="// 03" title={t.stack.section} kicker={t.stack.kicker} />
      <p className="stack-intro">{t.stack.intro}</p>
      <div className="stack-grid">
        {TECH.map((item, i) => (
          <figure
            key={item.name}
            className={`logo logo-${item.hue}`}
            style={{ ["--i" as string]: String(i) } as React.CSSProperties}
          >
            <div className="logo-frame" aria-hidden>
              <div className="logo-svg logo-base">{item.svg}</div>
              <div className="logo-svg logo-gh logo-gh-1">{item.svg}</div>
              <div className="logo-svg logo-gh logo-gh-2">{item.svg}</div>
              <div className="logo-scan" />
            </div>
            <figcaption>
              <span className="logo-name glitch-sm" data-text={item.name}>
                {item.name}
              </span>
              <span className="logo-tag">./{item.tag}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Links() {
  const { t } = useLang();
  return (
    <section className="links" id="links">
      <SectionHeading eyebrow="// 04" title={t.links.section} kicker={t.links.kicker} />
      <div className="links-grid">
        {SOCIALS.map((s) => {
          const external = s.href.startsWith("http");
          return (
            <a
              key={s.name}
              className="link-card"
              href={s.href}
              aria-label={`Open ${s.name}`}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
            >
              <span className="link-name">{s.name}</span>
              <span className="link-handle">{s.handle}</span>
              <span className="link-cta">
                <span>{external ? t.links.open : t.links.soon}</span>
                <span aria-hidden>↗</span>
              </span>
              <span className="link-glow" aria-hidden />
            </a>
          );
        })}
      </div>
      <form
        className="subscribe"
        onSubmit={(e) => {
          e.preventDefault();
          const btn = (e.currentTarget.querySelector("button") as HTMLButtonElement) || null;
          if (btn) {
            btn.textContent = t.links.subscribeDone;
            btn.disabled = true;
          }
        }}
      >
        <label htmlFor="email">{t.links.subscribeLabel}</label>
        <div className="subscribe-row">
          <input
            id="email"
            type="email"
            required
            placeholder={t.links.subscribePlaceholder}
            autoComplete="email"
          />
          <button type="submit">{t.links.subscribeBtn}</button>
        </div>
      </form>
    </section>
  );
}

function Footer({ onOpen }: { onOpen: (k: LegalKind) => void }) {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="footer-row">
        <span className="footer-brand">burnout.exe</span>
        <span className="footer-dim">{t.footer.copy}</span>
      </div>
      <div className="footer-row footer-legal">
        <button type="button" className="footer-link" onClick={() => onOpen("impressum")}>
          {t.footer.impressum}
        </button>
        <button type="button" className="footer-link" onClick={() => onOpen("datenschutz")}>
          {t.footer.datenschutz}
        </button>
        <a className="footer-link" href="#top">
          {t.footer.top}
        </a>
      </div>
      <div className="footer-row footer-sub">
        <span>{t.footer.built}</span>
        <span>{t.footer.locale}</span>
      </div>
    </footer>
  );
}

function LegalModal({ kind, onClose }: { kind: LegalKind; onClose: () => void }) {
  const { t } = useLang();
  const isImp = kind === "impressum";
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={kind}>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-panel">
        <header className="modal-head">
          <span className="modal-path">
            ~/legal/<span className="modal-kind">{kind}.md</span>
          </span>
          <button type="button" className="modal-close" aria-label={t.modal.close} onClick={onClose}>
            ✕
          </button>
        </header>
        <div className="modal-body">
          {isImp ? <Impressum /> : <Datenschutz />}
        </div>
        <footer className="modal-foot">
          <span>{t.modal.esc}</span>
          <span className="modal-dim">burnout.exe · hannover</span>
        </footer>
      </div>
    </div>
  );
}

function Impressum() {
  return (
    <article className="legal">
      <h2 className="legal-title glitch-sm" data-text="Impressum">
        Impressum
      </h2>
      <p className="legal-lede">Angaben gemäß § 5 TMG</p>

      <section>
        <h3>Anbieter</h3>
        <p>
          Burnout.exe (Künstlername)
          <br />
          Jason Gehrts
          <br />
          Schweriner Straße 25
          <br />
          30625 Hannover
          <br />
          Deutschland
        </p>
      </section>

      <section>
        <h3>Kontakt</h3>
        <p>
          E-Mail:{" "}
          <a href="mailto:jasongehrts@gmail.com">jasongehrts@gmail.com</a>
          <br />
          Web:{" "}
          <a href="https://burnout-exe.dev" target="_blank" rel="noreferrer">
            burnout-exe.dev
          </a>
        </p>
      </section>

      <section>
        <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
        <p>
          Jason Gehrts
          <br />
          Anschrift wie oben
        </p>
      </section>

      <section>
        <h3>Streitschlichtung</h3>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">
            https://ec.europa.eu/consumers/odr
          </a>
          . Unsere E-Mail-Adresse findest du oben. Wir sind nicht bereit oder verpflichtet, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <section>
        <h3>Haftung für Inhalte</h3>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
          nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
          Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
      </section>

      <section>
        <h3>Haftung für Links</h3>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
          übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
          Betreiber der Seiten verantwortlich.
        </p>
      </section>

      <section>
        <h3>Urheberrecht</h3>
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
          der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
          Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </section>
    </article>
  );
}

function Datenschutz() {
  return (
    <article className="legal">
      <h2 className="legal-title glitch-sm" data-text="Datenschutzerklärung">
        Datenschutzerklärung
      </h2>
      <p className="legal-lede">
        Stand: 2026. Diese Erklärung gilt für die Nutzung der Website burnout-exe.dev.
      </p>

      <section>
        <h3>1. Verantwortlicher</h3>
        <p>
          Verantwortlich im Sinne der DSGVO:
          <br />
          Jason Gehrts
          <br />
          Schweriner Straße 25, 30625 Hannover, Deutschland
          <br />
          <a href="mailto:jasongehrts@gmail.com">jasongehrts@gmail.com</a>
        </p>
      </section>

      <section>
        <h3>2. Allgemeines</h3>
        <p>
          Wir nehmen den Schutz deiner personenbezogenen Daten ernst. Personenbezogene Daten werden
          auf dieser Website nur im technisch notwendigen Umfang erhoben. In keinem Fall werden
          erhobene Daten verkauft oder ohne Grundlage an Dritte weitergegeben.
        </p>
      </section>

      <section>
        <h3>3. Server-Logfiles</h3>
        <p>
          Der Hoster der Seiten erhebt und speichert automatisch Informationen in sogenannten
          Server-Logfiles, die dein Browser automatisch an uns übermittelt:
        </p>
        <ul>
          <li>Browsertyp und Browserversion</li>
          <li>verwendetes Betriebssystem</li>
          <li>Referrer-URL</li>
          <li>Hostname des zugreifenden Rechners</li>
          <li>Uhrzeit der Serveranfrage</li>
          <li>IP-Adresse (gekürzt)</li>
        </ul>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden nicht mit anderen
          Datenquellen zusammengeführt.
        </p>
      </section>

      <section>
        <h3>4. Cookies</h3>
        <p>
          Diese Website verwendet keine Tracking-Cookies. Technisch notwendige Cookies können zum
          Einsatz kommen, um Grundfunktionen der Seite bereitzustellen. Rechtsgrundlage: Art. 6
          Abs. 1 lit. f DSGVO.
        </p>
      </section>

      <section>
        <h3>5. Eingebettete Inhalte (Spotify)</h3>
        <p>
          Zum Anhören des Albums wird der Spotify-Player in Form eines iframes eingebunden.
          Hierbei werden Daten (u.a. IP-Adresse, Gerätedaten) an die Spotify AB (Regeringsgatan 19,
          11153 Stockholm, Schweden) übertragen, sobald du die Seite lädst. Rechtsgrundlage: Art. 6
          Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer attraktiven Darstellung des
          Angebots). Details: <a href="https://www.spotify.com/de/legal/privacy-policy/" target="_blank" rel="noreferrer">spotify.com/legal/privacy-policy</a>.
        </p>
      </section>

      <section>
        <h3>6. Newsletter</h3>
        <p>
          Wenn du dich für den Newsletter einträgst, verwenden wir deine E-Mail-Adresse
          ausschließlich, um dich über neue Releases zu informieren. Die Einwilligung (Art. 6 Abs.
          1 lit. a DSGVO) kannst du jederzeit per Mail an{" "}
          <a href="mailto:jasongehrts@gmail.com">jasongehrts@gmail.com</a> widerrufen.
        </p>
      </section>

      <section>
        <h3>7. Deine Rechte</h3>
        <p>Du hast jederzeit das Recht auf:</p>
        <ul>
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
        </ul>
      </section>

      <section>
        <h3>8. Aufsichtsbehörde</h3>
        <p>
          Zuständig ist: Die Landesbeauftragte für den Datenschutz Niedersachsen,
          Prinzenstraße 5, 30159 Hannover.
        </p>
      </section>
    </article>
  );
}

type LegalKind = "impressum" | "datenschutz";

export default function App() {
  const [legal, setLegal] = useState<LegalKind | null>(null);
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("burnout.lang");
    if (saved === "de" || saved === "en") return saved;
    return navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("burnout.lang", l);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (!legal) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLegal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [legal]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: STRINGS[lang] }}>
    <div className="app">
      <div className="bg" aria-hidden>
        <div className="bg-grid" />
        <div className="bg-glow bg-glow-a" />
        <div className="bg-glow bg-glow-b" />
        <div className="bg-noise" />
        <div className="bg-scan" />
      </div>
      <NavBar />
      <main>
        <Hero />
        <Player />
        <About />
        <TechStack />
        <Links />
      </main>
      <Footer onOpen={setLegal} />
      {legal && <LegalModal kind={legal} onClose={() => setLegal(null)} />}
    </div>
    </LangContext.Provider>
  );
}
