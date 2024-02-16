import Head from "next/head";
import FeaturedNews from "../components/news/featuredNews";
import Header from "../components/commons/header";
import ListNews from "../components/news/blogList";
import Footer from "../components/commons/footer/footer";
import Analitycs from "../components/commons/analitycs";
import Title from "../components/commons/titles";
import fetcher from "../utils/fetcher";
import GridWebinars from "../components/webinars/gridWebinars";
import FeaturedWebinars from "../components/webinars/featuredWebinars";

export async function getServerSideProps() {
  const URLBLOG = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=Imagen_Destacada%2C%20autores.Perfiles%2C%20tags%2C%20categoria%2C%20categoria&filters[Destacada][$eq]=false&sort=fecha_publicacion:desc&pagination[page]=0&pagination[pageSize]=4`;
  const URLBLOGDESTACADA = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=Imagen_Destacada%2C%20autores.Perfiles%2C%20tags%2C%20categoria%2C%20categoria&filters[Destacada][$eq]=true&sort=fecha_publicacion:desc`;
  const URLWEBINARS = `${process.env.NEXT_PUBLIC_API}/blog-webinars?populate=deep&filters[webinarInfo][preWebinar][$eq]=false&pagination[page]=0&pagination[pageSize]=4`;
  const URLWEBINARSDESTACADA = `${process.env.NEXT_PUBLIC_API}/blog-webinars?populate=deep&filters[webinarInfo][preWebinar][$eq]=true&pagination[page]=0&pagination[pageSize]=4`;
  const URLINSTITUCIONAL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt`;
  const URLFOOTERCONTENT = `${process.env.NEXT_PUBLIC_API}/page-web-layout?populate=deep&locale=es`;

  const dataNotas = await fetcher(URLBLOG);

  const dataNotasDestacadas = await fetcher(URLBLOGDESTACADA);

  const dataWebinars = await fetcher(URLWEBINARS);

  const dataWebinarsInPreWebinar = await fetcher(URLWEBINARSDESTACADA);

  const dataInstitucional = await fetcher(URLINSTITUCIONAL);

  const footerContent = await fetcher(URLFOOTERCONTENT);

  return {
    props: {
      dataNotasDestacadas,
      dataInstitucional,
      dataWebinars,
      dataNotas,
      dataWebinarsInPreWebinar,
      footerContent,
    },
  };
}

export default function Home({
  dataInstitucional,
  dataNotas,
  dataNotasDestacadas,
  dataWebinars,
  dataWebinarsInPreWebinar,
  footerContent,
}) {
  return (
    <>
      <Head>
        <title>Blog Possumus </title>
        <meta name="description" content="Blog de Possumus" />
        <meta
          name="keywords"
          content="News, webinars, noticias, novedades, tecnologia, desarrollo"
        />
        <meta name="author" content="Possumus" />
        <meta property="og:title" content="Blog de possumus" key="title" />
        <meta
          property="og:description"
          content="At Possumus, we implement Agile methodologies to create positive experiences through technology with human value. Software Engineering."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Blog Possumus" />
        <meta
          property="og:image"
          content="https://possumustech.blob.core.windows.net/staticfiles/assets/Possumus_d54fcb00ec.png"
        ></meta>
      </Head>
      <Analitycs />
      <Header title="Blog" style="mainNav" />
      <Title title="Ultimas noticias" />
      <FeaturedNews dataNews={dataNotasDestacadas.data} type="/news/" />
      <ListNews
        dataNews={dataNotas.data}
        type="/news/"
        tag="Por "
        withSeeMoreButton
      />
      <Title title="Webinars" />
      {dataWebinarsInPreWebinar.data.length > 0 && (
        // REFACTORIZAR
        <FeaturedWebinars webinarsData={dataWebinarsInPreWebinar.data} />
      )}
      <GridWebinars webinars={dataWebinars.data} withSeeMoreButton />
      <Footer
        dataInstitutional={dataInstitucional}
        footerContent={footerContent}
      />
    </>
  );
}
