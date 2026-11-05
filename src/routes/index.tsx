import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, Instagram, Youtube, MessageCircle } from "lucide-react";

function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.31-2.83V9.33a6.33 6.33 0 1 0 5.76 6.3V8.71a8.16 8.16 0 0 0 4.77 1.52V6.79a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}
import panasonicRed from "@/assets/panasonic-red.jpg";
import visualChromeRed from "@/assets/visual-chrome-red.jpg.asset.json";
import visualGlitchRed from "@/assets/visual-glitch-red.jpg.asset.json";
import cheRed from "@/assets/che-red.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { BackgroundAudio } from "@/components/BackgroundAudio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "REAPER.CEO — Publicités, affiches & montage vidéo" },
      { name: "description", content: "REAPER.CEO, créateur visuel : montage publicitaire, création d'affiches et montage vidéo personnalisé." },
      { property: "og:title", content: "Reaper's Portfolio AE" },
      { property: "og:description", content: "Je transforme vos idées en visuels qui captent l'attention." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATSAPP = "https://wa.me/221784248884";
const SOCIALS = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: TikTokIcon, href: "#", label: "TikTok" },
];
const NAV = [["Accueil", "#accueil"], ["À propos", "#apropos"], ["Services", "#services"], ["Contact", "#contact"]];

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e) return;
      if (e.isIntersecting) { el.classList.add("is-in"); io.unobserve(el); }
    }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function useScrolled(threshold = 30) {
  const [s, setS] = useState(false);
  useEffect(() => { const f = () => setS(window.scrollY > threshold); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, [threshold]);
  return s;
}

/** Smooth wheel scrolling without per-frame layout reads; touch stays native. */
function useSmoothMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis: { destroy: () => void; scrollTo: (t: Element, o?: object) => void } | null = null;
    let cancelled = false;
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      const href = a?.getAttribute("href");
      if (!a || !lenis || !href || href === "#") return;
      const target = document.getElementById(href.slice(1));
      if (target) {
        ev.preventDefault();
        lenis.scrollTo(target, { offset: -96, duration: 1.45, easing: (t: number) => (1 - Math.cos(Math.PI * t)) / 2 });
      }
    };
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.065,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
        anchors: false,
        respectReducedMotion: true,
      });
      document.documentElement.classList.add("lenis-on");
    });
    document.addEventListener("click", onClick);
    return () => { cancelled = true; lenis?.destroy(); document.removeEventListener("click", onClick); document.documentElement.classList.remove("lenis-on"); };
  }, []);
}

const btnPrimary = "tech-button inline-flex items-center justify-center gap-3 rounded-full bg-primary px-10 py-5 text-xs font-semibold uppercase tracking-normal text-primary-foreground glow transition-all duration-500 ease-cine hover:bg-foreground hover:text-background";
const btnGhost = "tech-button inline-flex items-center justify-center gap-3 rounded-full border border-border px-10 py-5 text-xs font-semibold uppercase tracking-normal text-foreground transition-all duration-500 ease-cine hover:border-primary hover:text-primary-glow";

function Nav() {
  const scrolled = useScrolled(); const [open, setOpen] = useState(false);
  return (
    <header className={`site-nav fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-cine ${scrolled ? "glass border-b border-border" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12">
        <a href="#accueil" className="flex items-center gap-3 font-display text-sm uppercase tracking-normal"><span className="brand-star" aria-hidden="true">✦</span><span>REAPER<span className="text-primary-glow">.</span>CEO</span></a>
        <nav className="hidden gap-10 md:flex">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="group relative text-[11px] uppercase tracking-normal text-muted-foreground transition-colors duration-500 hover:text-foreground">
              {l}<span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-primary-glow transition-transform duration-500 ease-cine group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <Button variant="ghost" size="icon" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="rounded-full md:hidden">{open ? <X /> : <Menu />}</Button>
      </div>
      <div className={`glass overflow-hidden border-b border-border transition-all duration-700 ease-cine md:hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="flex flex-col gap-5 px-6 py-6">
          {NAV.map(([l, h], i) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="font-display text-2xl uppercase transition-all duration-700 ease-cine hover:text-primary-glow"
              style={{ transitionDelay: `${open ? i * 60 : 0}ms`, transform: open ? "none" : "translateY(-8px)" }}>{l}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="accueil" className="underground-hero relative isolate overflow-hidden">
      <img src={panasonicRed} alt="Publicité Panasonic vintage, casque argenté et portrait teintés en rouge" width={736} height={954} fetchPriority="high" data-parallax className="hero-art absolute inset-0 h-full w-full object-cover" />
      <div className="edge-blur absolute inset-0" aria-hidden="true" />
      <div className="hero-shade absolute inset-0" aria-hidden="true" />
      <div className="scanlines absolute inset-0" aria-hidden="true" />
      <div className="hero-registration absolute inset-x-6 top-28 flex justify-between font-mono text-[10px] text-muted-foreground md:inset-x-12" aria-hidden="true">
        <span>R.C / VISUAL DIVISION</span><span>REC <span className="text-primary">●</span> 001</span>
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-44 md:px-12 md:pt-48">
        <div className="hero-copy">
          <Reveal>
            <div className="mb-7 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-background/70 px-3 py-1.5 font-mono text-[10px] uppercase text-primary-glow"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Site nouveau</span>
              <span className="font-mono text-[10px] uppercase text-muted-foreground">Dakar, Sénégal / Créateur visuel</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="mb-3 font-mono text-xs text-primary-glow" aria-hidden="true">リーパー / 独立した創造</p>
            <h1 className="hero-title font-display uppercase">REAPER<span className="text-primary">.</span><br className="sm:hidden" />CEO</h1>
            <p className="hero-tagline mt-5 font-display text-2xl uppercase leading-tight md:text-3xl">Visuels bruts.<br /><span className="text-primary">Impact maximal.</span></p>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">Montage publicitaire, affiches et vidéos. Je transforme vos idées en images qui ne passent pas inaperçues.</p>
          </Reveal>
          <Reveal delay={320}>
            <Button asChild className={`${btnPrimary} mt-8 h-auto`}><a href="#contact">Me contacter <span aria-hidden="true">↗</span></a></Button>
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-muted-foreground">Nouveau site, vraies compétences. Votre projet mérite du caractère et une finition soignée.</p>
          </Reveal>
        </div>
      </div>
      <span className="hero-japanese absolute right-6 top-48 font-display text-primary md:right-12" aria-hidden="true">視覚実験</span>
      <div className="hero-bottom absolute inset-x-6 bottom-6 flex items-center justify-between border-t border-border pt-4 font-mono text-[10px] text-muted-foreground md:inset-x-12" aria-hidden="true"><span>01—05 / REAPER.CEO</span><span>SCROLL ↓</span><span className="hidden sm:block">音楽・映像・デザイン</span></div>
    </section>
  );
}

function Kicker({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return <p className={`section-kicker font-mono text-[11px] uppercase tracking-normal text-primary-glow ${center ? "text-center" : ""}`}>{children}</p>;
}

function AboutServices() {
  return (
    <section id="apropos" className="relative isolate overflow-hidden px-6 py-24 md:py-32 md:px-12 lg:px-24">
      <img src={cheRed.url} alt="" aria-hidden="true" loading="lazy" data-parallax className="section-art absolute inset-0 h-full w-full object-cover" />
      <div className="edge-blur absolute inset-0" aria-hidden="true" />
      <div className="section-art-shade-about absolute inset-0" aria-hidden="true" />
      <div className="scanlines absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal><Kicker>01 / À propos</Kicker></Reveal>
          <Reveal delay={120}>
            <h2 className="mt-10 font-display text-3xl uppercase leading-[1.05] tracking-normal text-foreground md:text-5xl">
              Créateur visuel, expert en After Effects et storytelling digital.
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              Je crée des contenus visuels pensés pour attirer l'attention, raconter une histoire et mettre en valeur chaque projet — avec rigueur technique et créativité débridée.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-8 border-l-2 border-primary pl-6 text-sm leading-relaxed text-muted-foreground">
              <span className="text-foreground">Site tout neuf, travail soigné.</span> Ce portfolio vient d'être mis en ligne et se remplira projet après projet. Ce qui ne change pas : la rigueur, le sens du détail et des délais tenus.
            </p>
          </Reveal>
        </div>
        <div id="services" className="grid gap-6 lg:col-span-7">
          <Reveal><Kicker>02 / Services</Kicker></Reveal>
          {SERVICES.map((s, i) => (
            <Reveal key={s.t} delay={i * 120}>
              <div className="service-item group relative rounded-lg border border-border bg-surface/30 p-6 md:p-8 transition-all duration-500 ease-cine hover:border-primary/50">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-display text-xl uppercase tracking-normal md:text-2xl">{s.t}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{s.d}</p>
                  </div>
                  <span className="font-display text-4xl text-primary opacity-20 transition-opacity duration-500 group-hover:opacity-100">0{i + 1}</span>
                </div>
                <div className="mt-8 h-px w-10 bg-primary transition-all duration-700 ease-cine group-hover:w-28" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { t: "Montage publicitaire", d: "Création de publicités vidéo dynamiques et modernes pour promouvoir une marque, un produit ou un événement." },
  { t: "Création d'affiches", d: "Création d'affiches professionnelles et originales pour les réseaux sociaux, événements, promotions et entreprises." },
  { t: "Montage vidéo personnalisé", d: "Montage vidéo adapté aux besoins spécifiques du client : réseaux sociaux, événements, contenus promotionnels et projets personnels." },
];

const STEPS = [["Discussion", "On échange sur votre idée, vos objectifs et votre audience."], ["Concept", "Je propose une direction visuelle claire et adaptée."], ["Création", "Réalisation du visuel ou du montage, avec vos retours."], ["Livraison", "Fichiers finaux livrés dans les formats dont vous avez besoin."]];

function Process() {
  return (
    <section className="px-6 py-24 md:py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <Reveal><Kicker center>03 / Processus</Kicker></Reveal>
        <Reveal delay={120}><h2 className="mt-8 text-center font-display text-4xl uppercase tracking-normaler md:text-6xl">Comment je travaille</h2></Reveal>
        <div className="mt-16 grid gap-px border-y border-border bg-border md:grid-cols-4">
          {STEPS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 140}>
              <div className="group flex h-full flex-col items-center bg-background px-6 py-10 text-center transition-colors duration-500 hover:bg-surface/40">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-primary transition-colors duration-500 group-hover:bg-primary">
                  <span className="text-sm font-semibold">0{i + 1}</span>
                </div>
                <h3 className="font-display text-lg uppercase tracking-normal">{t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const TRUST = [
  ["Maîtrise technique", "After Effects, montage et animation : le bon outil pour chaque idée, sans jamais de compromis sur la finition."],
  ["Un œil pour le détail", "Rythme, typographie, couleurs : chaque choix de visuel sert un objectif clair — capter l'attention de votre audience."],
  ["Un vrai partenaire", "À l'écoute, réactif et honnête sur les délais. Vous savez à tout moment où en est votre projet."],
];

function Trust() {
  return (
    <section id="confiance" className="relative isolate overflow-hidden border-t border-border px-6 py-24 md:py-32 md:px-12 lg:px-24">
      <img src={visualChromeRed.url} alt="" aria-hidden="true" loading="lazy" data-parallax className="section-art absolute inset-0 h-full w-full object-cover" />
      <div className="edge-blur absolute inset-0" aria-hidden="true" />
      <div className="section-art-shade absolute inset-0" aria-hidden="true" />
      <div className="scanlines absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal><Kicker>04 / Confiance</Kicker></Reveal>
          <Reveal delay={120}>
            <h2 className="mt-10 font-display text-3xl uppercase leading-[1.05] tracking-normal text-foreground md:text-5xl">
              Nouveau site,<br /><span className="text-primary">vraies compétences</span>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
              Le portfolio débute, pas les compétences. Chaque projet livré devient une pièce de plus ici — et la vôtre est traitée avec le même sérieux.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <a href="#contact" className={`${btnGhost} mt-12`}>Parlons de votre projet</a>
          </Reveal>
        </div>
        <div className="grid gap-6 lg:col-span-7">
          {TRUST.map(([t, d], i) => (
            <Reveal key={t} delay={i * 120}>
              <div className="trust-item group flex items-start gap-6 border-t border-border py-8 transition-all duration-500 ease-cine hover:border-primary/50">
                <span className="font-display text-2xl text-primary opacity-30 transition-opacity duration-500 group-hover:opacity-100">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-lg uppercase tracking-normal">{t}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const field = "w-full border border-input bg-surface/40 px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-500 ease-cine focus:border-primary focus:glow";


function Band() {
  return (
    <section aria-hidden="true" className="select-none border-y border-border px-6 py-16 md:py-24 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase text-muted-foreground">
        <span>R.C / VISUAL DIVISION</span>
        <span className="text-primary-glow">実験区間</span>
        <span className="hidden sm:block">Zone expérimentale — 001</span>
        <span>SCROLL ↓</span>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  return (
    <section id="contact" className="relative isolate overflow-hidden px-6 py-24 md:py-32 md:px-12 lg:px-24">
      <img src={visualGlitchRed.url} alt="" aria-hidden="true" loading="lazy" data-parallax className="section-art absolute inset-0 h-full w-full object-cover" />
      <div className="edge-blur absolute inset-0" aria-hidden="true" />
      <div className="section-art-shade absolute inset-0" aria-hidden="true" />
      <div className="scanlines absolute inset-0" aria-hidden="true" />
      <span aria-hidden className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display text-[120px] md:text-[220px] uppercase leading-none text-surface/60">Hello</span>
      <div className="relative mx-auto grid max-w-7xl gap-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal><Kicker>05 / Contact</Kicker></Reveal>
          <Reveal delay={120}>
            <h2 className="mt-10 font-display text-5xl uppercase leading-[0.9] tracking-normaler md:text-7xl">
              Un projet<br />en tête <span className="text-primary">?</span>
            </h2>
          </Reveal>
          <Reveal delay={220} className="mt-12 flex flex-col gap-6">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className={`${btnGhost} self-start`}><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            <Button variant="link" type="button" onClick={() => { navigator.clipboard?.writeText("dumbseck@gmail.com"); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="h-auto max-w-full whitespace-normal p-0 self-start text-left text-sm text-muted-foreground transition-colors duration-500 ease-cine hover:text-primary-glow">
              {copied ? <span className="text-primary-glow">Adresse copiée ✓</span> : <>dumbseck@gmail.com <span className="ml-2 text-[11px] uppercase tracking-normal opacity-60">Copier</span></>}
            </Button>
            <div className="flex gap-3">{SOCIALS.map((s) => <a key={s.label} href={s.href} aria-label={s.label} className="inline-flex items-center justify-center rounded-2xl border border-border bg-surface/60 p-3.5 text-muted-foreground social-relief transition-all duration-300 ease-cine hover:-translate-y-1 hover:border-primary hover:text-primary-glow"><s.icon className="h-4 w-4" /></a>)}</div>
          </Reveal>
        </div>
        <Reveal delay={200} className="lg:col-span-7">
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-4 sm:grid-cols-2">
            <input required placeholder="Nom" className={field} />
            <input required type="email" placeholder="Email" className={field} />
            <select required defaultValue="" className={field}>
              <option value="" disabled>Type de projet</option><option>Publicité</option><option>Affiche</option><option>Montage vidéo</option><option>Autre</option>
            </select>
            <select defaultValue="" className={field}>
              <option value="" disabled>Budget</option><option>&lt; 50 000 FCFA</option><option>50 000 – 150 000 FCFA</option><option>150 000 – 500 000 FCFA</option><option>&gt; 500 000 FCFA</option>
            </select>
            <textarea required rows={6} placeholder="Message" className={`${field} sm:col-span-2`} />
            <Button type="submit" className={`${btnPrimary} h-auto sm:col-span-2 sm:justify-self-start`}>{sent ? "Message prêt — merci !" : "Envoyer le message"}</Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:px-12">
        <p className="font-display text-sm uppercase tracking-normal">REAPER<span className="text-primary-glow">.</span>CEO</p>
        <p className="text-[11px] uppercase tracking-normal text-muted-foreground">Créateur visuel • Montage • Design • Vidéo</p>
        <div className="flex gap-5">{SOCIALS.map((s) => <a key={s.label} href={s.href} aria-label={s.label} className="text-muted-foreground transition-colors duration-500 hover:text-primary-glow"><s.icon className="h-4 w-4" /></a>)}</div>
      </div>
    </footer>
  );
}

function Index() {
  useSmoothMotion();
  return (
    <main className="underground-site bg-background text-foreground">
      <Nav /><Hero /><AboutServices /><Process /><Trust /><Band /><Contact /><Footer /><BackgroundAudio />
    </main>
  );
}
