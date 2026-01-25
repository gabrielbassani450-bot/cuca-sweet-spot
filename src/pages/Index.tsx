import logo from "@/assets/logo-rufatto.png";
import heroPhoto from "@/assets/vo-do-rufatto.jpg";
import cardapio from "@/assets/cardapio.jpg";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { Card } from "@/components/ui/card";

const WHATSAPP_LINK = "https://wa.me/555199987643";
const WHATSAPP_ORDER_LINK = `${WHATSAPP_LINK}?text=${encodeURIComponent(
  "Olá! Quero fazer um pedido de cuca. Pode me ajudar?",
)}`;

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Delícias da Vozinha - logo" className="h-9 w-auto" loading="eager" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-foreground">Delícias da Vozinha</p>
              <p className="text-xs text-muted-foreground">Cucas artesanais • Encomendas</p>
            </div>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98] sm:inline-flex"
          >
            Pedir no WhatsApp
          </a>
        </div>
      </header>

      <main>
        <section className="bg-hero">
          <div className="container grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Cucas caseiras e Biscoitos para adoçar seu dia
              </h1>
              <p className="mt-4 max-w-prose text-pretty text-base text-muted-foreground sm:text-lg">
                Sabor de casa, feito com carinho — escolha o sabor no cardápio e faça seu pedido pelo WhatsApp.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#cardapio"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft"
                >
                  Ver cardápio
                </a>
                <a
                  href={WHATSAPP_ORDER_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border bg-background px-5 py-3 text-sm font-semibold text-foreground"
                >
                  Fazer pedido
                </a>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Atendimento: (51) 99998-7643
              </p>
            </div>

            <div className="lg:col-span-6">
              <Card className="overflow-hidden shadow-soft">
                <div className="grid gap-0 sm:grid-cols-2">
                  <div className="relative aspect-[4/3] max-h-72 sm:aspect-auto sm:h-full sm:max-h-none">
                    <img
                      src={heroPhoto}
                      alt="Foto da cozinheira responsável pelas cucas"
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-semibold text-foreground">Feito com carinho</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Produção artesanal, sabor acolhedor e apresentação caprichada — perfeito para família, visitas e eventos.
                    </p>
                    <div className="mt-4 rounded-xl bg-secondary p-4">
                      <p className="text-sm font-semibold text-foreground">Pedido rápido</p>
                      <p className="mt-1 text-sm text-muted-foreground">Clique no botão do WhatsApp e envie o sabor + quantidade.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="cardapio" className="container py-10 sm:py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Cardápio</h2>
              <p className="mt-2 text-sm text-muted-foreground">Organizado e fácil de ler (toque para ampliar no celular).</p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            <Card className="overflow-hidden lg:col-span-7 shadow-soft">
              <a href={cardapio} target="_blank" rel="noreferrer" className="block">
                <img
                  src={cardapio}
                  alt="Imagem do cardápio de cucas"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </a>
            </Card>

            <div className="lg:col-span-5">
              <Card className="p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground">Como pedir</h3>
                <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <span className="font-semibold text-foreground">1.</span> Abra o WhatsApp.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">2.</span> Envie o sabor (ou “Simples”) e a quantidade.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">3.</span> Combine retirada/entrega.
                  </li>
                </ol>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft"
                >
                  Chamar no WhatsApp
                </a>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <WhatsAppFloatingButton href={WHATSAPP_LINK} />
    </div>
  );
};

export default Index;
