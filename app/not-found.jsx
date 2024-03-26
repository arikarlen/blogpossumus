/* eslint-disable @next/next/no-img-element */
import travoltaIlustration from "../assets/ilustrations/travolta404.svg";
import background from "../assets/backgrounds/404_possumusBg.png";
import Header from "@/components/commons/header";
import Footer from "@/components/commons/footer/footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <section
        className="page404 pt-16 flex items-center justify-center"
        style={{ backgroundImage: `url(${background.src})` }}
      >
        <img src={travoltaIlustration.src} alt="Ilustración John Travolta" />
      </section>
      <Footer lang="es" />
    </>
  );
}
