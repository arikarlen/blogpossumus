import Head from "next/head";
import FeaturedNews from "../components/news/featuredNews";
import Header from "../components/commons/header";
import ListNews from "../components/news/blogList";
import Footer from "../components/commons/footer/footer";
import Analitycs from "../components/commons/analitycs";
import Title from "../components/commons/titles";
import SeeMoreeButton from "../components/commons/seeMoreButton";

export async function getServerSideProps() {
    const URLBLOG = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=Imagen_Destacada%2C%20autores.Perfiles%2C%20tags%2C%20categoria%2C%20categoria&filters[Destacada][$eq]=false&sort=fecha_publicacion:desc&pagination[page]=0&pagination[pageSize]=4`;
    const URLBLOGDESTACADA = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=Imagen_Destacada%2C%20autores.Perfiles%2C%20tags%2C%20categoria%2C%20categoria&filters[Destacada][$eq]=true&sort=fecha_publicacion:desc`;
    const URLWEBINARS = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_WEBINARS}?populate=Imagen_Destacada%2C%20autores.Perfiles%2C%20tags%2C%20categoria&filters[Destacada][$eq]=false&sort=id:desc&pagination[page]=1&pagination[pageSize]=5`;
    const URLWEBINARSDESTACADA = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_WEBINARS}?populate=Imagen_Destacada%2C%20autores.Perfiles%2C%20tags%2C%20categoria&filters[Destacada][$eq]=true&sort=id:desc&pagination[page]=1&pagination[pageSize]=5`;
    const URLINSTITUCIONAL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt`;
    const URLFOOTERCONTENT = `${process.env.NEXT_PUBLIC_API}/page-web-layout?populate=deep&locale=es`;

    const resBlog = await fetch(URLBLOG,  {headers: {Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`}});
    const dataBlog = await resBlog.json();
    const dataNews = dataBlog;

    const resDestacada = await fetch(URLBLOGDESTACADA,  {headers: {Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`}});
    const dataDestacada = await resDestacada.json();
    const dataDes = dataDestacada;

    const resWebinars = await fetch(URLWEBINARS,  {headers: {Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`}});
    const dataWebinars = await resWebinars.json();
    const dataWebin = dataWebinars;

    const resWebinarsDestacada = await fetch(URLWEBINARSDESTACADA,  {headers: {Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`}});
    const dataWebinarsDestacada = await resWebinarsDestacada.json();
    const dataWebinDestacada = dataWebinarsDestacada;

    const resInstitucional = await fetch(URLINSTITUCIONAL,  {headers: {Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`}});
    const dataInstitucional = await resInstitucional.json();
    const data = dataInstitucional;
    
    const resFooterContent = await fetch(URLFOOTERCONTENT,  {headers: {Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`}});
    const dataFooter = await resFooterContent.json();
    const footerContent = dataFooter;

    return { props: { dataDes, data, dataWebin, dataNews, dataWebinDestacada, footerContent } };
}

export default function Home({ data, dataNews, dataDes, dataWebin, dataWebinDestacada, footerContent }) {
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
                <meta property="og:image" content="https://possumustech.blob.core.windows.net/staticfiles/assets/Possumus_d54fcb00ec.png"></meta>
            </Head>
            <Analitycs />
            <Header title="Blog" style="mainNav" />
            <Title title="Ultimas noticias" />
            <FeaturedNews dataNews={dataDes.data} type="/news/"/>
            <ListNews dataNews={dataNews.data} type="/news/" tag="Por " withSeeMoreButton/>
            {/* <SeeMoreeButton link="/news" /> */}
            <Title title="Webinars" />
            <FeaturedNews dataNews={dataWebinDestacada.data} type="/webinars/" tag="Disertantes: " />
            <ListNews dataNews={dataWebin.data} type="/webinars/" tag="Disertantes: " withSeeMoreButton/>
            {/* <SeeMoreeButton link="/webinars" /> */}
            <Footer dataInstitutional={data} footerContent={footerContent} />
        </>
    );
}
