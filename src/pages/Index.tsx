import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import logo from "@/assets/logo-rufatto.png";
import heroPhoto from "@/assets/vo-do-rufatto.jpg";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { MenuCardapio } from "@/components/MenuCardapio";
import { cn } from "@/lib/utils";

const WHATSAPP_LINK = "https://wa.me/555199987643";
const WHATSAPP_ORDER_LINK = `${WHATSAPP_LINK}?text=${encodeURIComponent("Olá! Quero fazer um pedido de cuca. Pode me ajudar?")}`;

const MARQUEE_FLAVORS = [
  "Coco",
  "Abacaxi",
  "Doce de leite",
  "Goiabada",
  "Chocolate branco com nozes",
  "Pêssego",
  "Banana com canela",
  "Ricota",
  "Chocolate preto",
  "Uva",
  "Frutas cristalizadas",
  "Doce de leite com amendoim",
];

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("reveal", className)} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

const SparkIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor">
    <path d="M12 2c.6 3.9 2.1 5.4 6 6-3.9.6-5.4 2.1-6 6-.6-3.9-2.1-5.4-6-6 3.9-.6 5.4-2.1 6-6Z" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor">
    <path d="M12 21s-7.5-4.7-10-9.3C.4 8.3 2.6 4.5 6.3 4.5c2.1 0 3.9 1.2 4.7 3 .8-1.8 2.6-3 4.7-3 3.7 0 5.9 3.8 4.3 7.2C19.5 16.3 12 21 12 21Z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-5 w-5", className)} fill="currentColor">
    <path d="M19.11 17.23c-.26-.13-1.55-.76-1.79-.85-.24-.09-.41-.13-.58.13-.17.26-.67.85-.82 1.02-.15.17-.3.2-.56.07-.26-.13-1.1-.4-2.09-1.28-.77-.68-1.29-1.53-1.44-1.79-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.06-.13-.58-1.39-.79-1.9-.21-.5-.43-.43-.58-.44l-.5-.01c-.17 0-.46.07-.7.33-.24.26-.92.9-.92 2.19s.94 2.54 1.07 2.72c.13.17 1.86 2.84 4.5 3.98.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.55-.63 1.77-1.24.22-.61.22-1.13.15-1.24-.07-.11-.24-.17-.5-.3ZM16.02 3.2c-7.04 0-12.77 5.73-12.77 12.77 0 2.24.59 4.43 1.7 6.35L3.2 28.8l6.66-1.72a12.71 12.71 0 0 0 6.16 1.57h.01c7.04 0 12.77-5.73 12.77-12.77S23.06 3.2 16.02 3.2Zm0 23.27h-.01c-1.98 0-3.92-.53-5.62-1.52l-.4-.24-3.95 1.02 1.05-3.85-.26-.4a10.54 10.54 0 0 1-1.61-5.61c0-5.83 4.74-10.57 10.57-10.57 2.82 0 5.47 1.1 7.46 3.1a10.5 10.5 0 0 1 3.1 7.47c0 5.83-4.74 10.57-10.57 10.57Z" />
  </svg>
);

const STEPS = [
  {
    title: "Escolha os sabores",
    text: "Toque nos sabores do cardápio e ajuste as quantidades do seu jeito.",
  },
  {
    title: "Envie pelo WhatsApp",
    text: "A mensagem sai prontinha, com os itens e o total do pedido.",
  },
  {
    title: "Combine a entrega",
    text: "Retirada ou entrega — a gente acerta os detalhes na conversa.",
  },
];

const Index = () => {
  const [hasCart, setHasCart] = useState(false);
  const handleCartChange = useCallback((has: boolean) => setHasCart(has), []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <a href="#" aria-label="Delícias da Vozinha — início" className="flex items-center gap-3">
            <img src={logo} alt="" className="h-9 w-auto" loading="eager" />
            <span className="leading-tight">
              <span className="block font-serif text-base font-semibold tracking-tight text-foreground">
                Delícias da Vozinha
              </span>
              <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Cucas artesanais · Encomendas
              </span>
            </span>
          </a>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            aria-label="Pedir no WhatsApp"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-2"
          >
            <WhatsAppIcon />
            <span className="hidden text-sm font-bold sm:inline">Pedir no WhatsApp</span>
          </a>
        </div>
      </header>

      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="bg-hero relative overflow-hidden">
          <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0 opacity-60" />
          <div className="container relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
            <Reveal className="lg:col-span-7">
              <p className="inline-flex items-center gap-1.5 rounded-full border border-brand-2/30 bg-card/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur">
                <SparkIcon />
                Receita de família
              </p>

              <h1 className="mt-5 text-balance font-serif text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-foreground sm:text-6xl">
                Cucas e biscoitos caseiros para <em className="text-primary">adoçar</em> seu dia
              </h1>

              <p className="mt-5 max-w-prose text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Sabor de casa, feito com carinho — escolha os sabores no cardápio e o pedido chega prontinho no
                nosso WhatsApp.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#cardapio"
                  className="inline-flex min-h-[3.25rem] cursor-pointer items-center justify-center rounded-full bg-primary px-7 text-[0.9375rem] font-extrabold text-primary-foreground shadow-lift transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Montar meu pedido
                </a>
                <a
                  href={WHATSAPP_ORDER_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[3.25rem] cursor-pointer items-center justify-center gap-2 rounded-full border border-border bg-card/80 px-7 text-[0.9375rem] font-bold text-foreground backdrop-blur transition-colors duration-200 hover:border-primary/50 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <WhatsAppIcon className="h-4 w-4 text-primary" />
                  Falar com a gente
                </a>
              </div>

              <ul className="mt-8 flex flex-wrap gap-2">
                {["Produção artesanal", "Assado com carinho", "Encomenda fácil"].map((chip) => (
                  <li
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-3.5 py-1.5 text-xs font-bold text-secondary-foreground"
                  >
                    <span className="text-brand-2">
                      <HeartIcon />
                    </span>
                    {chip}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs font-semibold tracking-wide text-muted-foreground">
                Atendimento: <a href="tel:+5551999987643" className="text-foreground underline-offset-4 hover:underline">(51) 99998-7643</a>
              </p>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5">
              <figure className="mx-auto max-w-sm">
                <div className="rounded-[2rem] bg-card p-2.5 shadow-lift ring-1 ring-border/60 transition-transform duration-300 sm:-rotate-1 sm:hover:rotate-0">
                  <img
                    src={heroPhoto}
                    alt="Foto da cozinheira responsável pelas cucas"
                    className="aspect-[4/5] w-full rounded-[1.6rem] object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-4 text-center font-serif text-base italic text-muted-foreground">
                  A vozinha por trás de cada receita
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ── Flavor marquee ───────────────────────────────── */}
        <div aria-hidden="true" className="overflow-hidden border-y border-border/50 bg-secondary/40 py-3">
          <div className="animate-marquee flex w-max items-center gap-6 whitespace-nowrap">
            {[...MARQUEE_FLAVORS, ...MARQUEE_FLAVORS].map((flavor, i) => (
              <span key={i} className="flex items-center gap-6 font-serif text-sm italic text-primary/70">
                {flavor}
                <span className="h-1 w-1 rounded-full bg-brand-2/60" />
              </span>
            ))}
          </div>
        </div>

        {/* ── Cardápio interativo ──────────────────────────── */}
        <section id="cardapio" className="container scroll-mt-20 py-12 sm:py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-2">Cardápio</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Monte seu pedido
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Tudo organizado para escolher direto do celular: toque, ajuste e envie.
            </p>
          </Reveal>

          <Reveal delay={80} className="mx-auto mt-8 max-w-3xl">
            <MenuCardapio onCartChange={handleCartChange} />
          </Reveal>
        </section>

        {/* ── Como pedir ───────────────────────────────────── */}
        <section className="border-t border-border/50 bg-secondary/30">
          <div className="container py-12 sm:py-16">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-2">Simples assim</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Como pedir
              </h2>
            </Reveal>

            <ol className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3 sm:gap-6">
              {STEPS.map((step, i) => (
                <Reveal key={step.title} delay={i * 90}>
                  <li className="h-full rounded-3xl border border-border/50 bg-card p-6 shadow-lift">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent font-serif text-lg font-semibold text-accent-foreground">
                      {i + 1}
                    </span>
                    <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={200} className="mt-10 text-center">
              <a
                href={WHATSAPP_ORDER_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[3.25rem] cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 text-[0.9375rem] font-extrabold text-primary-foreground shadow-lift transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <WhatsAppIcon />
                Chamar no WhatsApp
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-border/60 bg-background">
        <div className="container flex flex-col items-center gap-4 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-8 w-auto" loading="lazy" />
            <div className="leading-tight">
              <p className="font-serif text-sm font-semibold text-foreground">Delícias da Vozinha</p>
              <p className="text-xs text-muted-foreground">Cucas e biscoitos caseiros, feitos com carinho.</p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            <a href="tel:+5551999987643" className="font-semibold text-foreground underline-offset-4 hover:underline">
              (51) 99998-7643
            </a>
            <span className="mx-2" aria-hidden="true">·</span>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="font-semibold text-foreground underline-offset-4 hover:underline">
              WhatsApp
            </a>
            <p className="mt-1">© {new Date().getFullYear()} Delícias da Vozinha</p>
          </div>
        </div>
      </footer>

      {!hasCart ? <WhatsAppFloatingButton href={WHATSAPP_LINK} /> : null}
    </div>
  );
};

export default Index;
