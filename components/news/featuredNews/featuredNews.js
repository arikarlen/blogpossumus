import fetcher from "utils/fetcher";
import Container from "../../commons/container/Container";
import FeaturedNew from "./featuredNew";

export default async function FeaturedNews() {
  const URLBLOGDESTACADA = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=Imagen_Destacada%2C%20autores.Perfiles%2C%20tags%2C%20categoria%2C%20categoria&filters[Destacada][$eq]=true&sort=fecha_publicacion:desc`;
  const { data: dataNotasDestacadas } = await fetcher(URLBLOGDESTACADA, 3600);

  return (
    <>
      {dataNotasDestacadas.length > 0 && (
        <Container>
          {dataNotasDestacadas?.map((data, idx) => (
            <FeaturedNew data={data} key={idx} />
          ))}
        </Container>
      )}
    </>
  );
}
