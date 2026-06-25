import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Price = {
  label: string;
  value: string;
};

type MenuGroup = {
  title: string;
  price?: Price;
  items: string[];
};

type MenuSection = {
  title: string;
  subtitle?: string;
  groups: MenuGroup[];
  note?: string;
};

const CUCAS: MenuSection = {
  title: "Cucas",
  subtitle: "Tamanho tradicional",
  groups: [
    {
      title: "Simples",
      price: { label: "unidade", value: "R$ 20,00" },
      items: ["Simples"],
    },
    {
      title: "Sabores (R$ 25,00)",
      price: { label: "unidade", value: "R$ 25,00" },
      items: [
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
      title: "Sabores especiais (R$ 30,00)",
      price: { label: "unidade", value: "R$ 30,00" },
      items: [
        "Chocolate preto",
        "Chocolate branco",
        "Chocolate branco com morango",
        "Doce de leite com amendoim",
      ],
    },
  ],
};

const BISCOITOS: MenuSection = {
  title: "Biscoitos",
  subtitle: "Sabores",
  groups: [
    {
      title: "Sabores",
      items: [
        "Manteiga",
        "Argola",
        "Melado",
        "Bolacha pintada",
        "Laranja",
        "Romeu e Julieta (queijo com goiabada)",
        "Coco",
        "Cacau",
        "Chocolate",
        "Limão e goiabada",
        "Amendoim",
        "Café",
        "Leite Ninho",
      ],
    },
    {
      title: "Tamanho e Preço",
      items: [
        "350 gramas (básicos) — R$ 17,00",
      ],
    },
  ],
};

function MenuBlock({ section }: { section: MenuSection }) {
  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card p-6 shadow-soft transition-shadow hover:shadow-lg sm:p-8">
      {/* Decorative accent */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/40 blur-2xl transition-opacity group-hover:opacity-80" />
      
      <header className="relative">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1 rounded-full bg-primary" />
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {section.title}
            </h3>
            {section.subtitle ? (
              <p className="mt-0.5 text-sm font-medium text-muted-foreground">{section.subtitle}</p>
            ) : null}
          </div>
        </div>
      </header>

      <Separator className="my-6 bg-border/60" />

      <div className="relative space-y-8">
        {section.groups.map((group, idx) => (
          <section key={group.title} aria-label={group.title} className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                {group.title}
              </p>
              {group.price ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground shadow-sm">
                  {group.price.value}
                </span>
              ) : null}
            </div>

            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => {
                const parts = item.split("—").map((p) => p.trim());
                const name = parts[0];
                const value = parts.length > 1 ? parts.slice(1).join(" — ") : null;

                return (
                  <li
                    key={item}
                    className="flex items-center justify-between gap-3 rounded-xl bg-secondary/50 px-4 py-2.5 text-sm transition-colors hover:bg-secondary"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-brand-2" />
                      <span className="font-medium text-foreground">{name}</span>
                    </span>
                    {value ? (
                      <span className="shrink-0 font-bold text-primary">{value}</span>
                    ) : null}
                  </li>
                );
              })}
            </ul>

            {idx < section.groups.length - 1 ? (
              <Separator className="!mt-6 bg-border/40" />
            ) : null}
          </section>
        ))}
      </div>
    </Card>
  );
}

export function MenuCardapio() {
  return (
    <div className="grid gap-6">
      <MenuBlock section={CUCAS} />
      <MenuBlock section={BISCOITOS} />
    </div>
  );
}
