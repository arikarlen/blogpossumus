import Head from "next/head";
import { Container, Breadcrumb } from "react-bootstrap";
import Header from "../../components/commons/header";
import ListNews from "../../components/commons/newsList";
import Footer from "../../components/commons/footer/footer";

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;

    const URL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=*&filters[categoria][Categoria][$contains]=${slug}`;
    const URLINSTITUCIONAL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt&populate[2]=items`;
    const URLFOOTERCONTENT = `${process.env.NEXT_PUBLIC_API}/page-web-layout?populate=deep&locale=es`;

    const res = await fetch(URL);
    const data = await res.json();
    const dataNew = await data;

    const resInstitucional = await fetch(URLINSTITUCIONAL);
    const dataInstitucional = await resInstitucional.json();
    const dataIns = dataInstitucional;
    
    const resFooterContent = await fetch(URLFOOTERCONTENT);
    const dataFooter = await resFooterContent.json();
    const footerContent = dataFooter;

    return { props: { slug, dataNew, dataIns, footerContent } };
}

export default function Category({ slug, dataNew, dataIns, footerContent }) {
    return (
        <>
            <Head>
                <title>Blog Possumus || News</title>
                <meta name="description" content="Blog de Possumus" />
                <meta name="keywords" content="News, webinars, noticias, novedades, tecnologia, desarrollo" />
                <meta name="author" content="Possumus" />
                <meta property="og:title" content="Blog de Possumus" key="title" />
                <meta property="og:description" content="At Possumus, we implement Agile methodologies to create positive experiences through technology with human value. Software Engineering." />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Blog Possumus" />
                <meta property="og:image" content="https://possumustech.blob.core.windows.net/staticfiles/assets/Possumus_d54fcb00ec.png"></meta>
            </Head>
            <Header title="Blog" style="mainNav" />
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item href="/news">News </Breadcrumb.Item>
                    <Breadcrumb.Item active>{slug}</Breadcrumb.Item>
                </Breadcrumb>

                <ListNews dataNews={dataNew.data} title={slug} />
            </Container>
            <Footer dataInstitutional={dataIns} footerContent={footerContent}/>
        </>
    );
}
