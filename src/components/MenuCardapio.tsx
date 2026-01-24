import { Card } from "@/components/ui/card";

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
  note:
    "Se quiser, me diga se existe mais algum sabor de cuca no cardápio (parte de baixo da imagem), que eu adiciono aqui.",
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
      title: "Tamanhos e preços",
      items: [
        "350 gramas (básicos) — R$ 15,00",
        "Em vidros 250 gramas — R$ 17,00",
      ],
    },
  ],
};

function MenuBlock({ section }: { section: MenuSection }) {
  return (
    <Card className="p-6 shadow-soft">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
          {section.subtitle ? (
            <p className="mt-1 text-sm text-muted-foreground">{section.subtitle}</p>
          ) : null}
        </div>
      </header>

      <div className="mt-5 space-y-6">
        {section.groups.map((group) => (
          <section key={group.title} aria-label={group.title} className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-foreground">{group.title}</p>
              {group.price ? (
                <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                  {group.price.value}
                </span>
              ) : null}
            </div>
            <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {group.items.map((item) => (
                <li key={item} className="text-sm text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}

        {section.note ? (
          <p className="text-xs text-muted-foreground">{section.note}</p>
        ) : null}
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
