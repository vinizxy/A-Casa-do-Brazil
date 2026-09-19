import MapaSobDemanda from "./MapaSobDemanda";
import Seta from "./Seta";
import { localizacao, restaurante } from "@/content/site";

// Localização: dados oficiais em verde-profundo, rota pelo Google Maps e
// mapa carregado sob demanda.
export default function Localizacao() {
  const { endereco } = restaurante;
  const enderecoLinha = `${endereco.rua}, ${endereco.bairro} — ${endereco.cidade}, ${endereco.uf}, ${endereco.cep}`;

  return (
    <section
      id="localizacao"
      aria-labelledby="localizacao-titulo"
      className="tema-escuro scroll-mt-[var(--nav-h)] bg-profundo pb-8 pt-20 text-nevoa lg:pb-16 lg:pt-32"
    >
      <div className="container-editorial">
        <p className="display display-md display-italic max-w-[26ch]">{localizacao.frase}</p>

        <div className="mt-16 grid grid-cols-1 gap-y-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-6">
            <p className="text-[0.9375rem] text-nevoa-suave">{localizacao.kicker}</p>
            <h2 id="localizacao-titulo" className="display display-lg mt-4">
              {localizacao.titulo}
            </h2>
            <address className="display display-sm mt-8 not-italic leading-[1.3]">
              {endereco.rua}
              <br />
              {endereco.bairro}, {endereco.cidade} — {endereco.uf}
              <br />
              <span className="text-nevoa-suave">{endereco.cep}</span>
            </address>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={localizacao.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="botao text-nevoa"
              >
                {localizacao.cta.label}
                <Seta className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8 lg:gap-x-8">
            <div>
              <h3 className="text-[0.9375rem] text-nevoa-suave">Horários</h3>
              <dl className="mt-4 space-y-2 text-[1rem]">
                {restaurante.horarios.map((h) => (
                  <div key={h.dias} className="flex flex-col">
                    <dt className="text-nevoa-suave">{h.dias}</dt>
                    <dd>{h.horas}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="text-[0.9375rem] text-nevoa-suave">Contato</h3>
              <ul className="mt-4 space-y-2 text-[1rem]">
                <li>
                  <a href={restaurante.telefone.href} className="link-editorial">
                    {restaurante.telefone.exibicao}
                  </a>
                </li>
                <li>
                  <a href={restaurante.whatsapp.href} target="_blank" rel="noopener noreferrer" className="link-editorial">
                    {restaurante.whatsapp.label}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${restaurante.email}`} className="link-editorial break-all">
                    {restaurante.email}
                  </a>
                </li>
                <li>
                  <a href={restaurante.instagram.href} target="_blank" rel="noopener noreferrer" className="link-editorial">
                    {restaurante.instagram.handle}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <MapaSobDemanda
            src={endereco.mapaEmbed}
            titulo={localizacao.mapa.titulo}
            rotulo={localizacao.mapa.abrir}
            endereco={enderecoLinha}
          />
        </div>
      </div>
    </section>
  );
}
