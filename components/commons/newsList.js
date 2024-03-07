import Container from "@/components/commons/container/Container";
import Title from "./titles";
import Date from "./date/Date";
import AutoresList from "./autoresList/AutoresList";
import { getNews } from "app/news/actions";
import Link from "next/link";
import CustomImage from "./customImage/CustomImage";

export default async function ListNews() {
  const { dataNews } = await getNews();

  return (
    <Container>
      {dataNews.map((data) => (
        <article
          className="flex flex-col md:flex-row gap-8 justify-between items-center border-b border-b-gray-d8 pb-3 cursor-pointer md:hover:scale-101 md:hover:shadow-md duration-300 ease-in-out"
          key={data.attributes.slug}
        >
          <div>
            <h6 className="mt-6">
              {data.attributes.categoria?.data.attributes.Categoria}
            </h6>
            <Link href={`/news/${data.attributes.slug}`}>
              <Title
                title={data.attributes.Titulo.replaceAll("#", "")}
                className="mb-2"
                fluid
              />
            </Link>
            {/* se remplazan los # porque este campo viene desde un tipo ricktext en Strapi */}
            <h5>
              <Date date={data.attributes.publishedAt} /> | Por{" "}
              <AutoresList autores={data.attributes?.autores.data} />
            </h5>

            <p>{data.attributes.Bajada}</p>
          </div>
          <div className="md:max-w-60">
            <Link href={`/news/${data.attributes.slug}`}>
              <CustomImage
                src={data.attributes.Imagen_Destacada.data?.attributes.url}
                alt={data.attributes.Titulo.replaceAll("#", "")}
              />
            </Link>
          </div>
        </article>
      ))}
    </Container>
  );
}
