"use client"
import Container from "@/components/commons/container/Container"
import AutoresList from "@/components/commons/autoresList/AutoresList";
import Title from "@/components/commons/titles";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Date from "../commons/date/Date";

export default function ListWebinars({ webinarsData, title }) {
  const router = useRouter();
  return (
    <Container>
      <h4>{title}</h4>

      {webinarsData?.map(({ attributes }) => {
        const { webinarInfo, header, autores } = attributes;
        return (
          <article
            className="flex flex-col md:flex-row gap-8 justify-between items-center border-b border-b-gray-d8 pb-3 cursor-pointer md:hover:scale-101 md:hover:shadow-md duration-300 ease-in-out"
            onClick={() => router.push(`/webinars/${webinarInfo.slug}`)}
            key={webinarInfo?.slug}
          >
            <div>
              <Title title={header?.titulo.replaceAll("#", "")} className="mt-6 mb-2" fluid/>
              {/* se remplazan los # porque este campo viene desde un tipo ricktext en Strapi */}
              <h5>
                <Date date={header?.fecha} /> | Por{" "}
                <AutoresList autores={autores.colaboradores?.data} />
              </h5>

              <p>{header?.bajada}</p>
            </div>
            <div className="md:max-w-60">
              <Image
                src={webinarInfo?.image?.data?.attributes.url}
                alt={header?.titulo}
                width={1080}
                height={532}
              />
            </div>
          </article>
        );
      })}
    </Container>
  );
}
