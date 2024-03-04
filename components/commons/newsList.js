"use client";
import Container from "@/components/commons/container/Container";
import { useRouter } from "next/navigation";
import "moment/locale/es";
import Image from "next/image";
import Title from "./titles";
import Date from "./date/Date";
import AutoresList from "./autoresList/AutoresList";
export default function ListNews({ dataNews, title }) {
  const router = useRouter();

  return (
    <Container>
      <h4>{title}</h4>

      {dataNews.map((data) => (
        <article
          className="flex flex-col md:flex-row gap-8 justify-between items-center border-b border-b-gray-d8 pb-3 cursor-pointer md:hover:scale-101 md:hover:shadow-md duration-300 ease-in-out"
          onClick={() => router.push(`/news/${data.attributes.slug}`)}
          key={data.attributes.slug}
        >
          <div>
            <h6
              className="mt-6"
              onClick={() =>
                router.push(
                  "/category/" +
                    data.attributes.categoria?.data.attributes.Categoria
                )
              }
            >
              {data.attributes.categoria?.data.attributes.Categoria}
            </h6>
            <Title title={data.attributes.Titulo.replaceAll("#", "")} className="mb-2" fluid/>
            {/* se remplazan los # porque este campo viene desde un tipo ricktext en Strapi */}
            <h5>
              <Date date={data.attributes.publishedAt} /> | Por{" "}
              <AutoresList autores={data.attributes?.autores.data} />
            </h5>

            <p>{data.attributes.Bajada}</p>
          </div>
          <div className="md:max-w-60">
            <Image
              src={data.attributes.Imagen_Destacada.data?.attributes.url}
              alt={data.attributes.Titulo.replaceAll("#", "")}
              width={1080}
              height={532}
            />
          </div>
        </article>
      ))}
    </Container>
  );
}
