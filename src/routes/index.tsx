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
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "REAPER.CEO — Publicités, affiches & montage vidéo" },
      { name: "description", content: "Portfolio d'un créateur visuel : montage publicitaire, création d'affiches et montage vidéo personnalisé." },
      { property: "og:title", content: "REAPER.CEO — Portfolio créatif" },
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
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add("is-in"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => { const f = () => setY(window.scrollY); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  return y;
}

const btnPrimary = "inline-flex items-center justify-center gap-3 rounded-full bg-primary px-10 py-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground glow transition-all duration-500 ease-cine hover:bg-foreground hover:text-background";
const btnGhost = "inline-flex items-center justify-center gap-3 rounded-full border border-border px-10 py-5 text-xs font-semibold uppercase tracking-[0.25em] text-foreground transition-all duration-500 ease-cine hover:border-primary hover:text-primary-glow";

function Nav() {
  const y = useScrollY(); const [open, setOpen] = useState(false);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-cine ${y > 30 ? "glass border-b border-border" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12">
        <a href="#accueil" className="font-display text-sm uppercase tracking-tight">REAPER<span className="text-primary-glow">.</span>CEO</a>
        <nav className="hidden gap-10 md:flex">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="group relative text-[11px] uppercase tracking-[0.3em] text-muted-foreground transition-colors duration-500 hover:text-foreground">
              {l}<span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-primary-glow transition-transform duration-500 ease-cine group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className="md:hidden">{open ? <X /> : <Menu />}</button>
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
  const y = useScrollY();
  return (
    <section id="accueil" className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-28 pb-16 md:px-12 lg:px-24">
      <div className="halo left-1/3 top-1/2 h-96 w-96 -translate-y-1/2" style={{ opacity: 0.16 }} />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-12">
        <div className="z-20 lg:col-span-7">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-center gap-5">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary-glow">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />Site nouveau
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-muted-foreground">Créateur visuel — Portfolio</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-display text-[clamp(3rem,9vw,8.5rem)] uppercase leading-[0.85] tracking-tighter">
              Je crée<br />
              <span className="text-primary">des visuels</span><br />
              <span className="flex items-center gap-5">d'impact<span className="mt-2 hidden h-3 w-24 bg-primary md:block md:w-44" /></span>
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-12 max-w-xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
              Montage publicitaire, affiches et montage vidéo personnalisé — une <span className="border-b border-primary text-foreground">esthétique radicale</span> et des mouvements fluides pour capter l'attention.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <a href="#contact" className={btnPrimary}>Me contacter</a>
            </div>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
              Portfolio tout neuf : les premières pièces s'ajouteront au fil des projets. Ce qui compte, c'est ce que je peux faire pour vous, dès aujourd'hui.
            </p>
          </Reveal>
        </div>
        <Reveal delay={300} className="relative h-[480px] sm:h-[560px] lg:col-span-5">
          <div className="absolute right-0 top-0 z-10 w-3/4 rotate-2 overflow-hidden border border-border shadow-2xl" style={{ transform: `translateY(${y * -0.05}px) rotate(2deg)` }}>
            <img src={p1} alt="Affiche placeholder" width={768} height={1024} className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-2 z-20 w-2/3 overflow-hidden border border-border shadow-2xl" style={{ transform: `translateY(${y * 0.06}px) rotate(-3deg)` }}>
            <img src={p2} alt="Miniature vidéo placeholder" width={1280} height={720} className="aspect-video w-full object-cover" />
            <span className="absolute bottom-3 left-3 glass px-3 py-1 text-[10px] uppercase tracking-widest">▶ 00:30</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Kicker({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return <p className={`text-[11px] font-semibold uppercase tracking-[0.4em] text-primary-glow ${center ? "text-center" : ""}`}>{children}</p>;
}

function AboutServices() {
  return (
    <section id="apropos" className="px-6 py-40 md:px-12 lg:px-24">
      <div className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-12 lg:gap-24">
        <div className="lg:col-span-5">
          <Reveal><Kicker>01 / À propos</Kicker></Reveal>
          <Reveal delay={120}>
            <h2 className="mt-10 font-display text-3xl uppercase leading-[1.05] tracking-tight text-foreground md:text-5xl">
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
              <div className="group relative border border-border bg-surface/30 p-10 transition-all duration-500 ease-cine hover:border-primary/50">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-display text-xl uppercase tracking-tight md:text-2xl">{s.t}</h3>
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
    <section className="px-6 py-40 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <Reveal><Kicker center>03 / Processus</Kicker></Reveal>
        <Reveal delay={120}><h2 className="mt-8 text-center font-display text-4xl uppercase tracking-tighter md:text-6xl">Comment je travaille</h2></Reveal>
        <div className="mt-24 grid gap-px border border-border bg-border md:grid-cols-4">
          {STEPS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 140}>
              <div className="group flex h-full flex-col items-center bg-background p-12 text-center transition-colors duration-500 hover:bg-surface/40">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-primary transition-colors duration-500 group-hover:bg-primary">
                  <span className="text-sm font-semibold">0{i + 1}</span>
                </div>
                <h3 className="font-display text-lg uppercase tracking-tight">{t}</h3>
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
    <section id="confiance" className="border-t border-border px-6 py-40 md:px-12 lg:px-24">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:gap-24">
        <div className="lg:col-span-5">
          <Reveal><Kicker>04 / Confiance</Kicker></Reveal>
          <Reveal delay={120}>
            <h2 className="mt-10 font-display text-3xl uppercase leading-[1.05] tracking-tight text-foreground md:text-5xl">
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
              <div className="group flex items-start gap-6 border border-border bg-surface/30 p-8 transition-all duration-500 ease-cine hover:border-primary/50">
                <span className="font-display text-2xl text-primary opacity-30 transition-opacity duration-500 group-hover:opacity-100">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-lg uppercase tracking-tight">{t}</h3>
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

function Contact() {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-40 md:px-12 lg:px-24">
      <span aria-hidden className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display text-[22vw] uppercase leading-none text-surface/60">Hello</span>
      <div className="relative mx-auto grid max-w-7xl gap-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal><Kicker>05 / Contact</Kicker></Reveal>
          <Reveal delay={120}>
            <h2 className="mt-10 font-display text-5xl uppercase leading-[0.9] tracking-tighter md:text-7xl">
              Un projet<br />en tête <span className="text-primary">?</span>
            </h2>
          </Reveal>
          <Reveal delay={220} className="mt-12 flex flex-col gap-6">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className={`${btnGhost} self-start`}><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            <button type="button" onClick={() => { navigator.clipboard?.writeText("dumbseck@gmail.com"); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="self-start text-left text-sm text-muted-foreground transition-colors duration-500 ease-cine hover:text-primary-glow">
              {copied ? <span className="text-primary-glow">Adresse copiée ✓</span> : <>dumbseck@gmail.com <span className="ml-2 text-[11px] uppercase tracking-[0.2em] opacity-60">Copier</span></>}
            </button>
            <div className="flex gap-3">{SOCIALS.map((s) => <a key={s.label} href={s.href} aria-label={s.label} className="inline-flex items-center justify-center rounded-2xl border border-border bg-surface/60 p-3.5 text-muted-foreground shadow-[0_10px_24px_-8px_rgba(124,58,237,0.35),0_20px_40px_-16px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-500 ease-cine hover:-translate-y-1 hover:border-primary hover:text-primary-glow hover:shadow-[0_16px_32px_-8px_rgba(124,58,237,0.5),0_28px_56px_-16px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.12)]"><s.icon className="h-4 w-4" /></a>)}</div>
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
            <button className={`${btnPrimary} sm:col-span-2 sm:justify-self-start`}>{sent ? "Message prêt — merci !" : "Envoyer le message"}</button>
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
        <p className="font-display text-sm uppercase tracking-tight">REAPER<span className="text-primary-glow">.</span>CEO</p>
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Créateur visuel • Montage • Design • Vidéo</p>
        <div className="flex gap-5">{SOCIALS.map((s) => <a key={s.label} href={s.href} aria-label={s.label} className="text-muted-foreground transition-colors duration-500 hover:text-primary-glow"><s.icon className="h-4 w-4" /></a>)}</div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Nav /><Hero /><AboutServices /><Process /><Trust /><Contact /><Footer />
    </main>
  );
}
