import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import QuemSomos from "@/components/QuemSomos";
import Gastronomia from "@/components/Gastronomia";
import MuitosBrasis from "@/components/MuitosBrasis";
import NossoEspaco from "@/components/NossoEspaco";
import Diego from "@/components/Diego";
import Galeria from "@/components/galeria/Galeria";
import Localizacao from "@/components/Localizacao";
import Footer from "@/components/Footer";

// A home é uma caminhada pela casa: entrada → quem somos → gastronomia →
// muitos Brasis → o espaço → quem está por trás → galeria → onde estamos.
export default function Home() {
  return (
    <>
      <Nav />
      <main id="conteudo">
        <Hero />
        <QuemSomos />
        <Gastronomia />
        <MuitosBrasis />
        <NossoEspaco />
        <Diego />
        <Galeria />
        <Localizacao />
      </main>
      <Footer />
    </>
  );
}
