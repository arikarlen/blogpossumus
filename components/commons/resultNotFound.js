import Image from "next/image";
import notFound from "../../assets/notFound.png";
import Container from "./container/Container";
import Button from "./button/Button";
import RecomendedArticles from "./recomendedArticles/RecomendedArticles";

export default function ResultsNotFound({ keyword, resetFunction }) {
  return (
    <Container className="text-center grid justify-items-center">
      <Image
        src={notFound.src}
        width={50}
        height={50}
        alt="No se econtraron resultados"
      />
      <h1>No se encontraron resultados</h1>
      <p>
        No encontramos articulos que contengan <strong>{keyword}</strong>, por
        favor intente otra busqueda
      </p>
      <h3 className="my-5 !text-m !font-mulish !font-light">Te recomendamos los siguientes articulos: </h3>
      <RecomendedArticles />
      <Button text="Explorar todos" variant="primary" onClick={resetFunction} />
    </Container>
  );
}
