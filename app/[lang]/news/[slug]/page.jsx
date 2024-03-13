import Head from "next/head";
import SingleNew from "../../../../components/news/singleNew";
import { Toaster } from "sonner";
import fetcher from "../../../../utils/fetcher";

export default async function Page({ params: { slug } }) {
  const URL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?filters[slug][$eq]=${slug}&populate=Imagen_Destacada%2C%20autores.Perfiles%2C%20tags%2C%20descarga%2C%20categoria%2C%20img_descarga&sort=id:desc`;

  const { data: dataNew } = await fetcher(URL);

  return (
    <>
      <Head>
        <title>Blog Possumus || {dataNew[0]?.attributes.Titulo}</title>
        <meta name="description" content={dataNew[0]?.attributes.Bajada} />
        <meta
          name="keywords"
          content={dataNew[0]?.attributes?.tags.data.map(
            (data) => " " + data.attributes.Tag
          )}
        />
        <meta name="author" content="Possumus" />
        <meta
          property="og:title"
          content={dataNew[0]?.attributes.Titulo}
          key="title"
        />
        <meta
          property="og:description"
          content={dataNew[0]?.attributes.Bajada}
        />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Blog Possumus" />
        <meta
          property="og:image"
          content={dataNew[0]?.attributes.Imagen_Destacada.data?.attributes.url}
        ></meta>
      </Head>
      <SingleNew
        singleNew={dataNew[0]?.attributes}
        absoluteUrl={process.env.NEXT_APP_URL}
      />
      <Toaster richColors position="top-right" visibleToasts={1} />
    </>
  );
}
