import fetcher from "../utils/fetcher";
import Header from "../components/commons/header";
import Title from "../components/commons/titles"
import FeaturedNews from "../components/news/featuredNews";
import ListNews from "../components/news/blogList";
import GridWebinars from "../components/webinars/gridWebinars";
import FeaturedWebinars from "../components/webinars/featuredWebinars";
import Analitycs from "../components/commons/analitycs"
import Footer from "../components/commons/footer/footer";

// import dynamic from "next/dynamic";
// const Header = dynamic("../../components/commons/header");
// const Title = dynamic("../components/commons/titles");
// const FeaturedNews = dynamic("../components/news/featuredNews");
// const ListNews = dynamic("../components/news/blogList");
// const Analitycs = dynamic("../components/commons/analitycs");
// const GridWebinars = dynamic("../components/webinars/gridWebinars");
// const FeaturedWebinars = dynamic("../components/webinars/featuredWebinars");
// const Footer = dynamic("../../components/commons/footer/footer");

export const metadata = {
  title: 'Blog Possumus | Inicio',
  description: "At Possumus, we implement Agile methodologies to create positive experiences through technology with human value. Software Engineering.",
  keywords: "News, webinars, noticias, novedades, tecnologia, desarrollo",
}

export default async function Home({}) {
  const URLBLOG = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=Imagen_Destacada%2C%20autores.Perfiles%2C%20tags%2C%20categoria%2C%20categoria&filters[Destacada][$eq]=false&sort=fecha_publicacion:desc&pagination[page]=0&pagination[pageSize]=4`;
  const URLBLOGDESTACADA = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=Imagen_Destacada%2C%20autores.Perfiles%2C%20tags%2C%20categoria%2C%20categoria&filters[Destacada][$eq]=true&sort=fecha_publicacion:desc`;
  const URLWEBINARS = `${process.env.NEXT_PUBLIC_API}/blog-webinars?populate=deep&filters[webinarInfo][preWebinar][$eq]=false&pagination[page]=0&pagination[pageSize]=4`;
  const URLWEBINARSDESTACADA = `${process.env.NEXT_PUBLIC_API}/blog-webinars?populate=deep&filters[webinarInfo][preWebinar][$eq]=true&pagination[page]=0&pagination[pageSize]=4`;
  const URLINSTITUCIONAL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt`;
  const URLFOOTERCONTENT = `${process.env.NEXT_PUBLIC_API}/page-web-layout?populate=deep&locale=es`;

  const {data: dataInstitucional} = await fetcher(URLINSTITUCIONAL);
  const {data: dataNotas} = await fetcher(URLBLOG);
  const {data: dataNotasDestacadas} = await fetcher(URLBLOGDESTACADA);
  const {data: dataWebinars} = await fetcher(URLWEBINARS);
  const {data: dataWebinarsInPreWebinar} = await fetcher(URLWEBINARSDESTACADA);
  const {data: footerContent} = await fetcher(URLFOOTERCONTENT);
  return (
    <>
      <Analitycs />
      <Header title="Blog" style="mainNav" />
      <Title title="Ultimas noticias" />
      <FeaturedNews dataNews={dataNotasDestacadas} type="/news/" />
      <ListNews
        dataNews={dataNotas}
        type="/news/"
        tag="Por "
        withSeeMoreButton
      />
      <Title title="Webinars" />
      {dataWebinarsInPreWebinar.length > 0 && (
        <FeaturedWebinars webinarsData={dataWebinarsInPreWebinar} />
      )}
      <GridWebinars webinars={dataWebinars} withSeeMoreButton />
      <Footer
        dataInstitutional={dataInstitucional}
        footerContent={footerContent}
      />
    </>
  );
}
