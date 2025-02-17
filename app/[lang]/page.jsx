import fetcher from "../../utils/fetcher";
import Title from "../../components/commons/titles";
import FeaturedNews from "../../components/news/featuredNews/featuredNews";
import ListNews from "../../components/news/listNews";
import GridWebinars from "../../components/webinars/gridWebinars";
import FeaturedWebinars from "../../components/webinars/featuredWebinars/featuredWebinars";
import Analitycs from "../../components/commons/analitycs";
import { getDictionary } from "./dictionaries";

export const metadata = {
  title: "Blog Possumus | Inicio",
  description:
    "At Possumus, we implement Agile methodologies to create positive experiences through technology with human value. Software Engineering.",
  keywords: "News, webinars, noticias, novedades, tecnologia, desarrollo",
};

export default async function Home({ params }) {
  const URLBLOG = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?locale=${params.lang}&populate=Imagen_Destacada%2C%20autores.Perfiles%2C%20tags%2C%20categoria%2C%20categoria&filters[Destacada][$eq]=false&sort=fecha_publicacion:desc&pagination[page]=0&pagination[pageSize]=4`;
  const { data: dataNotas } = await fetcher(URLBLOG);

  const URLWEBINARS = `${process.env.NEXT_PUBLIC_API}/blog-webinars?locale=${params.lang}&populate=deep&filters[webinarInfo][preWebinar][$eq]=false&pagination[page]=0&pagination[pageSize]=4`;
  const { data: dataWebinars } = await fetcher(URLWEBINARS);

  const actualDictionarie = await getDictionary(params.lang);
  return (
    <>
      <Analitycs />
      <Title
        title={actualDictionarie.home.mainTitle}
        className="pt-20 xs:pt-10 mb-6"
      />
      <FeaturedNews lang={params.lang} />
      <ListNews
        dataNews={dataNotas}
        type="/news/"
        tag={actualDictionarie.home.listNewsTag}
        lang={params.lang}
        withSeeMoreButton
      />
      <Title
        title={actualDictionarie.home.webinarsTitle}
        className="mt-16 mb-6"
      />
      <FeaturedWebinars lang={params.lang} />
      <GridWebinars
        webinars={dataWebinars}
        withSeeMoreButton
        tag={actualDictionarie.home.listNewsTag}
        lang={params.lang}
      />
    </>
  );
}
