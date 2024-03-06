import AutoresList from "@/components/commons/autoresList/AutoresList";
import Date from "@/components/commons/date/Date";
import Title from "@/components/commons/titles";
import { fetchFeatured } from "app/actions";
import Head from "next/head";
import Link from "next/link";

export default async function FeaturedNew() {
  const URLBLOGDESTACADA = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=Imagen_Destacada%2C%20autores.Perfiles%2C%20tags%2C%20categoria%2C%20categoria&filters[Destacada][$eq]=true&sort=fecha_publicacion:desc`;
  const data = await fetchFeatured(URLBLOGDESTACADA, 3600);

  if (!data) return;

  const imagenDestacada = `${data.attributes.Imagen_Destacada?.data.attributes.url}?q=70`;
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://adminpss.possumus.tech/" />
        <link rel="dns-prefetch" href="https://adminpss.possumus.tech/" />
        <link rel="preload" href={imagenDestacada} as="image" />
      </Head>
      <article key={data.attributes.slug}>
        <Link href={`/news/${data.attributes.slug}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={1920}
            height={1080}
            src={imagenDestacada}
            alt={data.attributes.Titulo}
            loading="lazy"
          />
        </Link>
        <div className="textContent">
          <Link href={`/news/${data.attributes.slug}`}>
            <h6 className="linkPerfil">
              {data.attributes.categoria?.data.attributes.Categoria}
            </h6>
          </Link>
          <Link href={`/news/${data.attributes.slug}`}>
            <Title
              title={data.attributes.Titulo.replaceAll("#", "")}
              className="mb-2"
              fluid
            />
          </Link>
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
