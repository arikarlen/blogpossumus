import Head from "next/head";
import FeaturedNews from "../components/news/featuredNews";
import Header from "../components/commons/header";
import ListNews from "../components/news/blogList";
import Footer from "../components/commons/footer";
import Analitycs from "../components/commons/analitycs";

export async function getServerSideProps() {
    const URLBLOG = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=*&sort=id:desc`;
    const URLINSTITUCIONAL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt`;

    const resBlog = await fetch(URLBLOG);
    const dataBlog = await resBlog.json();
    const dataNews = dataBlog;

    const resInstitucional = await fetch(URLINSTITUCIONAL);
    const dataInstitucional = await resInstitucional.json();
    const data = dataInstitucional;

    return { props: { dataNews, data } };
}

export default function Home({ dataNews, data }) {
    return (
        <>
            <Head>
                <title>Blog Possumus </title>
                <meta name="description" content="Blog de Possumus" />
                <meta name="keywords" content="News, webinars, noticias, novedades, tecnologia, desarrollo" />
                <meta name="author" content="Possumus" />
                <meta property="og:title" content="Blo de possumus" key="title" />
                <meta property="og:description" content="At Possumus, we implement Agile methodologies to create positive experiences through technology with human value. Software Engineering." />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Blog Possumus" />
            </Head>
            <Analitycs />
            <Header />
            <FeaturedNews dataNews={dataNews.data} />
            <ListNews dataNews={dataNews.data} />
            <Footer dataInstitutional={data} />
        </>
    );
}
