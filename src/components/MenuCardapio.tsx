import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "555199987643";

type MenuGroup = {
  id: string;
  title: string;
  price: number;
  priceLabel: string;
  flavors: string[];
};

type MenuSectionData = {
  id: "cucas" | "biscoitos";
  label: string;
  tagline: string;
  groups: MenuGroup[];
};

const SECTIONS: MenuSectionData[] = [
  {
    id: "cucas",
    label: "Cucas",
    tagline: "Tamanho tradicional, assadas no dia",
    groups: [
      {
        id: "cuca-simples",
        title: "Simples",
        price: 20,
        priceLabel: "unidade",
        flavors: ["Simples"],
      },
      {
        id: "cuca-sabores",
        title: "Sabores",
        price: 25,
        priceLabel: "unidade",
        flavors: [
          "Coco",
          "Abacaxi",
          "Coco com abacaxi",
          "Frutas cristalizadas",
          "Doce de leite",
          "Ricota",
          "Goiabada",
          "Ricota com goiabada",
          "Pêssego",
          "Uva",
          "Banana com canela",
          "Banana com canela e doce de leite",
        ],
      },
      {
        id: "cuca-especiais",
        title: "Sabores especiais",
        price: 30,
        priceLabel: "unidade",
        flavors: [
          "Chocolate preto",
          "Chocolate branco",
          "Chocolate branco com morango",
          "Doce de leite com amendoim",
        ],
      },
      {
        id: "cuca-especial-nozes",
        title: "Sabor especial",
        price: 35,
        priceLabel: "unidade",
        flavors: ["Chocolate branco com nozes"],
      },
    ],
  },
  {
    id: "biscoitos",
    label: "Biscoitos",
    tagline: "Básicos de 350 g, limão e goiabada de 300 g e amanteigados recheados de 300 g",
    groups: [
      {
        id: "biscoito-350",
        title: "Sabores",
        price: 17,
        priceLabel: "350 g",
        flavors: [
          "Manteiga",
          "Argola",
          "Melado",
          "Bolacha pintada",
          "Laranja",
          "Romeu e Julieta (queijo com goiabada)",
          "Coco",
          "Cacau",
          "Chocolate",
          "Amendoim",
          "Café",
          "Leite Ninho",
        ],
      },
      {
        id: "biscoito-300",
        title: "Sabor de 300 g",
        price: 17,
        priceLabel: "300 g",
        flavors: ["Limão e goiabada"],
      },
      {
        id: "biscoito-amanteigado",
        title: "Amanteigados recheados",
        price: 20,
        priceLabel: "aprox. 300 g",
        flavors: [
          "Amanteigado com recheio de chocolate ao leite",
          "Amanteigado com recheio de cappuccino",
          "Amanteigado de nozes com recheio de chocolate branco",
        ],
      },
    ],
  },
];

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

type Cart = Record<string, number>;

const itemKey = (groupId: string, flavor: string) => `${groupId}::${flavor}`;

function buildWhatsAppLink(cart: Cart): string {
  const lines: string[] = ["Olá! Quero fazer um pedido:"];
  let total = 0;

  for (const section of SECTIONS) {
    const sectionLines: string[] = [];
    for (const group of section.groups) {
      for (const flavor of group.flavors) {
        const qty = cart[itemKey(group.id, flavor)];
        if (!qty) continue;
        const lineTotal = qty * group.price;
        total += lineTotal;
        const detail = section.id === "biscoitos" ? `${flavor} (${group.priceLabel})` : flavor;
        sectionLines.push(`• ${qty}x ${detail} — ${brl.format(lineTotal)}`);
      }
    }
    if (sectionLines.length > 0) {
      lines.push("", `*${section.label}*`, ...sectionLines);
    }
  }

  lines.push("", `*Total: ${brl.format(total)}*`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

const MinusIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M5 12h14" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  </svg>
);

const WhatsAppGlyph = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true" className="h-5 w-5" fill="currentColor">
    <path d="M19.11 17.23c-.26-.13-1.55-.76-1.79-.85-.24-.09-.41-.13-.58.13-.17.26-.67.85-.82 1.02-.15.17-.3.2-.56.07-.26-.13-1.1-.4-2.09-1.28-.77-.68-1.29-1.53-1.44-1.79-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.06-.13-.58-1.39-.79-1.9-.21-.5-.43-.43-.58-.44l-.5-.01c-.17 0-.46.07-.7.33-.24.26-.92.9-.92 2.19s.94 2.54 1.07 2.72c.13.17 1.86 2.84 4.5 3.98.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.55-.63 1.77-1.24.22-.61.22-1.13.15-1.24-.07-.11-.24-.17-.5-.3ZM16.02 3.2c-7.04 0-12.77 5.73-12.77 12.77 0 2.24.59 4.43 1.7 6.35L3.2 28.8l6.66-1.72a12.71 12.71 0 0 0 6.16 1.57h.01c7.04 0 12.77-5.73 12.77-12.77S23.06 3.2 16.02 3.2Zm0 23.27h-.01c-1.98 0-3.92-.53-5.62-1.52l-.4-.24-3.95 1.02 1.05-3.85-.26-.4a10.54 10.54 0 0 1-1.61-5.61c0-5.83 4.74-10.57 10.57-10.57 2.82 0 5.47 1.1 7.46 3.1a10.5 10.5 0 0 1 3.1 7.47c0 5.83-4.74 10.57-10.57 10.57Z" />
  </svg>
);

function FlavorRow({
  flavor,
  qty,
  onAdd,
  onRemove,
}: {
  flavor: string;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={onAdd}
        aria-label={`Adicionar ${flavor}`}
        className="group flex min-h-[3.25rem] w-full cursor-pointer items-center justify-between gap-3 rounded-2xl bg-secondary/50 px-4 py-2 text-left transition-colors duration-200 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        <span className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-2" />
          <span className="text-[0.9375rem] font-semibold text-foreground">{flavor}</span>
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary transition-colors duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
          <PlusIcon />
        </span>
      </button>
    );
  }

  return (
    <div className="flex min-h-[3.25rem] items-center justify-between gap-3 rounded-2xl bg-accent px-4 py-2 ring-1 ring-brand-2/50 transition-shadow duration-200">
      <span className="flex items-center gap-2.5">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
        <span className="text-[0.9375rem] font-bold text-accent-foreground">{flavor}</span>
      </span>
      <span className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remover um ${flavor}`}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-card text-primary shadow-sm transition-colors duration-200 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <MinusIcon />
        </button>
        <span aria-live="polite" className="w-7 text-center text-sm font-extrabold tabular-nums text-accent-foreground">
          {qty}
        </span>
        <button
          type="button"
          onClick={onAdd}
          aria-label={`Adicionar mais um ${flavor}`}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <PlusIcon />
        </button>
      </span>
    </div>
  );
}

export function MenuCardapio({ onCartChange }: { onCartChange?: (hasItems: boolean) => void }) {
  const [activeTab, setActiveTab] = useState<MenuSectionData["id"]>("cucas");
  const [cart, setCart] = useState<Cart>({});

  const totals = useMemo(() => {
    let items = 0;
    let price = 0;
    const perSection: Record<string, number> = { cucas: 0, biscoitos: 0 };
    for (const section of SECTIONS) {
      for (const group of section.groups) {
        for (const flavor of group.flavors) {
          const qty = cart[itemKey(group.id, flavor)] ?? 0;
          if (!qty) continue;
          items += qty;
          price += qty * group.price;
          perSection[section.id] += qty;
        }
      }
    }
    return { items, price, perSection };
  }, [cart]);

  useEffect(() => {
    onCartChange?.(totals.items > 0);
  }, [totals.items, onCartChange]);

  const add = (groupId: string, flavor: string) =>
    setCart((c) => ({ ...c, [itemKey(groupId, flavor)]: (c[itemKey(groupId, flavor)] ?? 0) + 1 }));

  const remove = (groupId: string, flavor: string) =>
    setCart((c) => {
      const key = itemKey(groupId, flavor);
      const next = { ...c };
      const qty = (next[key] ?? 0) - 1;
      if (qty <= 0) delete next[key];
      else next[key] = qty;
      return next;
    });

  const activeSection = SECTIONS.find((s) => s.id === activeTab)!;
  const waLink = useMemo(() => buildWhatsAppLink(cart), [cart]);

  return (
    <div>
      {/* Segmented tabs */}
      <div role="tablist" aria-label="Categorias do cardápio" className="grid grid-cols-2 gap-1.5 rounded-full border border-border/70 bg-card p-1.5 shadow-lift">
        {SECTIONS.map((section) => {
          const selected = section.id === activeTab;
          const count = totals.perSection[section.id];
          return (
            <button
              key={section.id}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${section.id}`}
              id={`tab-${section.id}`}
              onClick={() => setActiveTab(section.id)}
              className={cn(
                "relative flex min-h-[2.75rem] cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {section.label}
              {count > 0 ? (
                <span
                  className={cn(
                    "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[0.6875rem] font-extrabold tabular-nums",
                    selected ? "bg-primary-foreground/20 text-primary-foreground" : "bg-brand-2/15 text-primary",
                  )}
                >
                  {count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <Card
        role="tabpanel"
        id={`panel-${activeSection.id}`}
        aria-labelledby={`tab-${activeSection.id}`}
        className="relative mt-4 overflow-hidden rounded-3xl border-border/50 bg-card p-5 shadow-soft sm:p-8"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/50 blur-2xl" />

        <header className="relative">
          <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {activeSection.label}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{activeSection.tagline}</p>
        </header>

        <p className="relative mt-4 rounded-2xl bg-secondary/60 px-4 py-3 text-sm text-muted-foreground">
          Toque em um sabor para adicionar ao pedido — a mensagem do WhatsApp é montada sozinha.
        </p>

        <div className="relative mt-6 space-y-8">
          {activeSection.groups.map((group) => (
            <section key={group.id} aria-label={group.title} className="space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">{group.title}</p>
                <p className="inline-flex items-baseline gap-1.5 rounded-full bg-primary px-3.5 py-1 shadow-sm">
                  <span className="text-sm font-extrabold text-primary-foreground">{brl.format(group.price)}</span>
                  <span className="text-[0.6875rem] font-semibold text-primary-foreground/80">/ {group.priceLabel}</span>
                </p>
              </div>

              <ul className="grid gap-2 sm:grid-cols-2">
                {group.flavors.map((flavor) => (
                  <li key={flavor}>
                    <FlavorRow
                      flavor={flavor}
                      qty={cart[itemKey(group.id, flavor)] ?? 0}
                      onAdd={() => add(group.id, flavor)}
                      onRemove={() => remove(group.id, flavor)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Card>

      {/* Sticky order bar */}
      {totals.items > 0 ? (
        <>
          <div aria-hidden="true" className="h-24" />
          <div className="fixed inset-x-0 bottom-0 z-50 pb-safe">
            <div className="container pb-3 sm:pb-4">
              <div className="animate-bar-in mx-auto flex max-w-xl items-center gap-2 rounded-[1.75rem] border border-border/60 bg-card/95 p-2 shadow-bar backdrop-blur">
                <button
                  type="button"
                  onClick={() => setCart({})}
                  aria-label="Limpar pedido"
                  className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <TrashIcon />
                </button>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[3rem] flex-1 cursor-pointer items-center justify-between gap-3 rounded-full bg-primary px-5 text-primary-foreground shadow-sm transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                >
                  <span className="flex items-center gap-2 whitespace-nowrap text-sm font-extrabold">
                    <WhatsAppGlyph />
                    <span>
                      Pedir<span className="hidden sm:inline"> no WhatsApp</span>
                    </span>
                  </span>
                  <span className="whitespace-nowrap text-right leading-tight">
                    <span className="block text-[0.6875rem] font-semibold text-primary-foreground/80">
                      {totals.items} {totals.items === 1 ? "item" : "itens"}
                    </span>
                    <span className="block text-sm font-extrabold tabular-nums">{brl.format(totals.price)}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
