import { LogoHorizontal, LogoSimbolo } from "./brand/Logo";
import { navegacao, restaurante, rodape } from "@/content/site";

// Rodapé silencioso: assinatura oficial, navegação essencial, contato e copyright.
export default function Footer() {
  return (
    <footer className="tema-escuro bg-profundo pb-10 pt-16 text-nevoa lg:pt-20">
      <div className="container-editorial">
        <div className="hairline grid grid-cols-1 gap-y-10 border-t pt-10 md:grid-cols-12 md:gap-x-8">
          <div className="flex items-center gap-4 md:col-span-5">
            <LogoSimbolo className="h-12 w-auto" title="" />
            <LogoHorizontal className="h-6 w-auto" title="Casa Brazil — cozinha brasileira" />
          </div>

          <nav aria-label="Rodapé" className="md:col-span-4">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-[0.9375rem]">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link-editorial text-nevoa/85">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-[0.9375rem] text-nevoa/85 md:col-span-3">
            <p>
              {restaurante.endereco.rua}
              <br />
              {restaurante.endereco.bairro}, {restaurante.endereco.cidade} — {restaurante.endereco.uf}
            </p>
            <p className="mt-3 flex flex-col gap-1">
              <a href={restaurante.telefone.href} className="link-editorial self-start">
                {restaurante.telefone.exibicao}
              </a>
              <a href={restaurante.instagram.href} target="_blank" rel="noopener noreferrer" className="link-editorial self-start">
                {restaurante.instagram.handle}
              </a>
            </p>
          </div>
        </div>

        <p className="mt-14 text-[0.8125rem] text-nevoa-suave">{rodape.copyright}</p>
      </div>
    </footer>
  );
}
