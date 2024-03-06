import Container from "@/components/commons/container/Container";
import AutoresList from "@/components/commons/autoresList/AutoresList";
import Title from "@/components/commons/titles";
import Image from "next/image";
import Date from "../commons/date/Date";
import Link from "next/link";
import { getWebinars } from "app/webinars/actions";

export default async function ListWebinars() {
  const {dataWebinars} = await getWebinars()
  return (
    <Container>
      {dataWebinars?.map(({ attributes }) => {
        const { webinarInfo, header, autores } = attributes;
        return (
          <article
            className="flex flex-col md:flex-row gap-8 justify-between items-center border-b border-b-gray-d8 pb-3 cursor-pointer md:hover:scale-101 md:hover:shadow-md duration-300 ease-in-out"
            key={webinarInfo?.slug}
          >
            <div>
              <Link href={`/webinars/${webinarInfo.slug}`}>
                <Title
                  title={header?.titulo.replaceAll("#", "")}
                  className="mt-6 mb-2"
                  fluid
                />
              </Link>
              {/* se remplazan los # porque este campo viene desde un tipo ricktext en Strapi */}
              <h5>
                <Date date={header?.fecha} /> | Por{" "}
                <AutoresList autores={autores.colaboradores?.data} />
              </h5>

              <p>{header?.bajada}</p>
            </div>
            <div className="md:max-w-60">
              <Link href={`/webinars/${webinarInfo.slug}`}>
                <Image
                  src={webinarInfo?.image?.data?.attributes.url}
                  alt={header?.titulo}
                  width={1080}
                  height={532}
                />
              </Link>
            </div>
          </article>
        );
      })}
    </Container>
  );
}
