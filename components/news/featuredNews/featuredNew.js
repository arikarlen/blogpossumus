"use client";
import AutoresList from "@/components/commons/autoresList/AutoresList";
import Date from "@/components/commons/date/Date";
import Title from "@/components/commons/titles";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function FeaturedNew({ data }) {
  const router = useRouter();

  const imagenDestacada = `${data.attributes.Imagen_Destacada?.data.attributes.url}?q=70`;
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://adminpss.possumus.tech/" />
        <link rel="dns-prefetch" href="https://adminpss.possumus.tech/" />
        <link rel="preload" href={imagenDestacada} as="image" />
      </Head>
      <article
        className="hover:cursor-pointer"
        key={data.attributes.slug}
        onClick={() => router.push(`/news/${data.attributes.slug}`)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={1920}
          height={1080}
          src={imagenDestacada}
          alt={data.attributes.Titulo}
          loading="lazy"
          onClick={() => router.push(`/news/${data.attributes.slug}`)}
        />
        <div className="textContent">
          <h6
            className="linkPerfil"
            onClick={() =>
              router.push(
                "/category/" +
                  data.attributes.categoria?.data.attributes.Categoria
              )
            }
          >
            {data.attributes.categoria?.data.attributes.Categoria}
          </h6>
          <Title
            title={data.attributes.Titulo.replaceAll("#", "")}
            className="mb-2"
            fluid
          />
          <h5>
            <Date date={data.attributes.publishedAt} /> | Por{" "}
            <AutoresList autores={data.attributes.autores.data} />
          </h5>
          <p>{data.attributes.Bajada}</p>
        </div>
      </article>
    </>
  );
}
