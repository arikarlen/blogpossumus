import Head from "next/head";
import FeaturedNews from "../components/news/featuredNews";
import Header from "../components/commons/header";
import ListNews from "../components/news/blogList";
import Footer from "../components/commons/footer";
import Analitycs from "../components/commons/analitycs";
import Title from "../components/commons/titles";

export async function getServerSideProps() {
    const URLBLOG = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=Imagen_Destacada%2C%20autores.Perfiles%2C%20tags%2C%20categoria%2C%20categoria&sort=id:desc&pagination[page]=1&pagination[pageSize]=5`;
    const URLWEBINARS = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_WEBINARS}?populate=Imagen_Destacada%2C%20autores.Perfiles%2C%20tags%2C%20categoria&sort=id:desc&pagination[page]=1&pagination[pageSize]=5`;
    const URLINSTITUCIONAL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt`;

    const resBlog = await fetch(URLBLOG);
    const dataBlog = await resBlog.json();
    const dataNews = dataBlog;

    const resWebinars = await fetch(URLWEBINARS);
    const dataWebinars = await resWebinars.json();
    const dataWebin = dataWebinars;

    const resInstitucional = await fetch(URLINSTITUCIONAL);
    const dataInstitucional = await resInstitucional.json();
    const data = dataInstitucional;

    return { props: { dataNews, data, dataWebin } };
}

export default function Home({ dataNews, data, dataWebin }) {
    return (
        <>
            <Head>
                <title>Blog Possumus </title>
                <meta name="description" content="Blog de Possumus" />
                <meta name="keywords" content="News, webinars, noticias, novedades, tecnologia, desarrollo" />
                <meta name="author" content="Possumus" />
                <meta property="og:title" content="Blog de possumus" key="title" />
                <meta property="og:description" content="At Possumus, we implement Agile methodologies to create positive experiences through technology with human value. Software Engineering." />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Blog Possumus" />
            </Head>
            <Analitycs />
            <Header />
            <Title title="Ultimas noticias" />
            <FeaturedNews dataNews={dataNews.data} />
            <ListNews dataNews={dataNews.data} type="/news/" tag="Por " />
            {/* <Title title="Webinars" />
            <ListNews dataNews={dataWebin.data} type="/webinars/" tag="Disertantes: " /> */}
            <Footer dataInstitutional={data} />
        </>
    );
}
