import { useEffect, useState } from "react";

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
  { name: "TikTok", handle: "@burnout.exe", href: "#" },
  { name: "Bandcamp", handle: "burnout-exe", href: "#" },
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

function NavBar() {
  const clock = useClock();
  const stamp = clock.toISOString().replace("T", " ").slice(0, 19);
  return (
    <nav className="nav">
      <div className="nav-brand">
        <span className="nav-dot" aria-hidden />
        <span>burnout.exe</span>
      </div>
      <div className="nav-links">
        <a href="#music">./music</a>
        <a href="#about">./about</a>
        <a href="#stack">./stack</a>
        <a href="#links">./links</a>
      </div>
      <div className="nav-status" aria-label="system status">
        <span className="nav-live">● LIVE</span>
        <span className="nav-time">{stamp} UTC</span>
      </div>
    </nav>
  );
}

function Hero() {
  const tagline = useTypewriter(
    "> compiling pain into 4/4 at 124 bpm. build passing. sleep failing."
  );
  return (
    <header className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-meta">
          <span className="chip chip-mag">ALBUM_OUT_NOW</span>
          <span className="chip">v1.0.0 — stable</span>
          <span className="chip chip-dim">licensed under GPL (General Panic License)</span>
        </div>
        <h1 className="glitch" data-text="Burnout.exe">
          Burnout.exe
        </h1>
        <p className="hero-sub">
          <span className="prompt">jason@lateshift ~ %</span> {tagline}
          <span className="caret" aria-hidden>
            _
          </span>
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#music">
            ▶ LISTEN NOW
          </a>
          <a className="btn btn-ghost" href="#music">
            ⌘ VIEW TRACKS
          </a>
        </div>
        <dl className="hero-stats">
          <div>
            <dt>Tracks</dt>
            <dd>08</dd>
          </div>
          <div>
            <dt>Runtime</dt>
            <dd>36:12</dd>
          </div>
          <div>
            <dt>Release</dt>
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
  return (
    <section className="music" id="music">
      <SectionHeading eyebrow="// 01" title="Neon Stack Overflow" kicker="album.play()" />
      <div className="spotify">
        <div className="spotify-head">
          <span className="label">STREAM / spotify.embed</span>
          <span className="spotify-live">● LIVE FEED</span>
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
  return (
    <section className="about" id="about">
      <SectionHeading eyebrow="// 02" title="About the artist" kicker="README.md" />
      <div className="about-grid">
        <article className="about-body">
          <p>
            <span className="drop">B</span>urnout.exe is the alias of a frontend developer who
            stopped closing tickets and started closing sets. After seven years shipping dashboards,
            chasing SLAs, and living inside a terminal, the IDE finally crashed. The DAW
            didn&rsquo;t.
          </p>
          <p>
            <strong>Neon Stack Overflow</strong> is what came out of the other side — an album
            bleached by monitor glow, stitched from stand-up guilt, 3 a.m. pull requests, and the
            specific hum of a mechanical keyboard at diminishing returns. It is not a concept album
            so much as a crash report, rendered in arpeggios.
          </p>
          <p>
            Expect: analog warmth, digital doubt, drum machines that remember every on-call week,
            and synths tuned to the exact frequency of a production outage. It is music for people
            who keep shipping.
          </p>
          <div className="about-quote">
            <span className="quote-mark">&quot;</span>
            Every song is a commit message I was too tired to write.
            <span className="quote-mark">&quot;</span>
          </div>
        </article>
        <aside className="about-side" aria-label="system spec">
          <div className="spec">
            <div className="spec-row"><span>alias</span><span>burnout.exe</span></div>
            <div className="spec-row"><span>origin</span><span>hamburg / remote</span></div>
            <div className="spec-row"><span>genre</span><span>dark synthwave</span></div>
            <div className="spec-row"><span>stack</span><span>OB-6 · TR-8s · TypeScript</span></div>
            <div className="spec-row"><span>uptime</span><span>97.3%</span></div>
            <div className="spec-row"><span>coffee</span><span>∞</span></div>
            <div className="spec-row"><span>sleep</span><span>null</span></div>
            <div className="spec-row"><span>status</span><span className="pulse">● online</span></div>
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
        <path d="M32 4 L56 18 V46 L32 60 L8 46 V18 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" />
        <path d="M24 26 V42 C24 46 28 46 30 44 M38 26 H46 M38 26 V34 H46 V42" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
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
        <rect x="4" y="18" width="56" height="28" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 40 V24 H18 V40 M14 24 V40" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M24 40 V24 H36 V40 M30 24 V34" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M42 40 V24 H54 V34 H48" fill="none" stroke="currentColor" strokeWidth="2.2" />
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
        <path d="M10 4 L14 54 L32 60 L50 54 L54 4 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" />
        <path d="M18 14 H46 L44 22 H22 L23 30 H43 L41 44 L32 48 L23 44 L22 38" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" />
      </svg>
    ),
  },
  {
    name: "CSS3",
    tag: "style",
    hue: "blue",
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden>
        <path d="M10 4 L14 54 L32 60 L50 54 L54 4 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" />
        <path d="M18 14 H46 L44 22 H22 L23 30 H43 L41 44 L32 48 L23 44 L22 38" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" />
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
  return (
    <section className="stack" id="stack">
      <SectionHeading eyebrow="// 03" title="Tech stack" kicker="require('./tools')" />
      <p className="stack-intro">
        <span className="prompt">$</span> cat package.json · dependencies compiled from
        muscle memory. <span className="stack-err">ERR_UNSTABLE_HEAP</span>
      </p>
      <div className="stack-grid">
        {TECH.map((t, i) => (
          <figure
            key={t.name}
            className={`logo logo-${t.hue}`}
            style={{ ["--i" as string]: String(i) } as React.CSSProperties}
          >
            <div className="logo-frame" aria-hidden>
              <div className="logo-svg logo-base">{t.svg}</div>
              <div className="logo-svg logo-gh logo-gh-1">{t.svg}</div>
              <div className="logo-svg logo-gh logo-gh-2">{t.svg}</div>
              <div className="logo-scan" />
            </div>
            <figcaption>
              <span className="logo-name glitch-sm" data-text={t.name}>
                {t.name}
              </span>
              <span className="logo-tag">./{t.tag}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Links() {
  return (
    <section className="links" id="links">
      <SectionHeading eyebrow="// 04" title="Distribution" kicker="connect()" />
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
                <span>{external ? "open" : "soon"}</span>
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
            btn.textContent = "✓ ENQUEUED";
            btn.disabled = true;
          }
        }}
      >
        <label htmlFor="email">
          <span className="prompt">subscribe@burnout ~ %</span> drop your email for the next drop
        </label>
        <div className="subscribe-row">
          <input
            id="email"
            type="email"
            required
            placeholder="you@localhost"
            autoComplete="email"
          />
          <button type="submit">TRANSMIT ▸</button>
        </div>
      </form>
    </section>
  );
}

function Footer({ onOpen }: { onOpen: (k: LegalKind) => void }) {
  return (
    <footer className="footer">
      <div className="footer-row">
        <span className="footer-brand">burnout.exe</span>
        <span className="footer-dim">© MMXXVI — all exceptions unhandled</span>
      </div>
      <div className="footer-row footer-legal">
        <button type="button" className="footer-link" onClick={() => onOpen("impressum")}>
          ./impressum
        </button>
        <button type="button" className="footer-link" onClick={() => onOpen("datenschutz")}>
          ./datenschutz
        </button>
        <a className="footer-link" href="#top">
          ./top ↑
        </a>
      </div>
      <div className="footer-row footer-sub">
        <span>built at 04:12 with two monitors and no sleep</span>
        <span>hamburg / remote · de</span>
      </div>
    </footer>
  );
}

function LegalModal({ kind, onClose }: { kind: LegalKind; onClose: () => void }) {
  const isImp = kind === "impressum";
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={kind}>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-panel">
        <header className="modal-head">
          <span className="modal-path">
            ~/legal/<span className="modal-kind">{kind}.md</span>
          </span>
          <button type="button" className="modal-close" aria-label="close" onClick={onClose}>
            ✕
          </button>
        </header>
        <div className="modal-body">
          {isImp ? <Impressum /> : <Datenschutz />}
        </div>
        <footer className="modal-foot">
          <span>ESC to close · content provided without warranty</span>
          <span className="modal-dim">burnout.exe · hamburg</span>
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
  );
}
