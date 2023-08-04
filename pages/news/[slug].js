import Head from "next/head";
import SingleNew from "../../components/news/singleNew";
import Footer from "../../components/commons/footer";
import Header from "../../components/commons/header";
import { Container, Breadcrumb } from "react-bootstrap";

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;

    const URL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?filters[slug][$eq]=${slug}&populate=*&sort=id:desc`;
    const URLINSTITUCIONAL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt`;

    const res = await fetch(URL);
    const data = await res.json();
    const dataNew = data;

    const resInstitucional = await fetch(URLINSTITUCIONAL);
    const dataInstitucional = await resInstitucional.json();
    const dataIns = dataInstitucional;

    const absoluteUrl = process.env.NEXT_APP_URL;

    return { props: { dataNew, dataIns, absoluteUrl } };
}

export default function fullNews({ dataNew, dataIns, absoluteUrl }) {
    return (
        <>
            <Head>
                <title>Blog Possumus || {dataNew.data[0].attributes.Titulo}</title>
                <meta name="description" content={dataNew.data[0].attributes.Bajada} />
                <meta name="keywords" content={dataNew.data[0].attributes.keywords} />
                <meta name="author" content="Possumus" />
                <meta property="og:title" content={dataNew.data[0].attributes.Titulo} key="title" />
                <meta property="og:description" content={dataNew.data[0].attributes.Bajada} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="Blog Possumus" />
                <meta property="og:image" content={dataNew.data[0].attributes.Imagen_Destacada.data.attributes.url}></meta>
            </Head>
            <Header />
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item href="/news">News</Breadcrumb.Item>
                    <Breadcrumb.Item active>{dataNew.data[0].attributes.Titulo}</Breadcrumb.Item>
                </Breadcrumb>
            </Container>
            <SingleNew singleNew={dataNew.data[0].attributes} absoluteUrl={absoluteUrl} />
            <Footer dataInstitutional={dataIns} />
        </>
    );
}
