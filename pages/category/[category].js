import Head from "next/head";
import { Container, Breadcrumb } from "react-bootstrap";
import Header from "../../components/commons/header";
import ListNews from "../../components/commons/newsList";
import Footer from "../../components/commons/footer";

export async function getServerSideProps(context) {
    const { params } = context;
    const { category } = params;

    const URL = `${process.env.NEXT_PUBLIC_APi}/${process.env.NEXT_PUBLIC_API_BLOG}?filters[categoria][Categoria][$eq]=${category}&populate=*&sort=id:desc`;
    const URLINSTITUCIONAL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt`;

    const res = await fetch(URL);
    const data = await res.json();
    const dataNew = data;

    const resInstitucional = await fetch(URLINSTITUCIONAL);
    const dataInstitucional = await resInstitucional.json();
    const dataIns = dataInstitucional;

    return { props: { dataNew, dataIns, category } };
}

export default function Category({ dataNew, dataIns, category }) {
    console.log(category);
    return (
        <>
            <Head>
                <title>Blog Possumus || News</title>
                <meta name="description" content="Blog de Possumus" />
                <meta name="keywords" content="News, webinars, noticias, novedades, tecnologia, desarrollo" />
                <meta name="author" content="Possumus" />
                <meta property="og:title" content="Blo de possumus" key="title" />
                <meta property="og:description" content="At Possumus, we implement Agile methodologies to create positive experiences through technology with human value. Software Engineering." />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Blog Possumus" />
            </Head>
            <Header />
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item href="/news">News </Breadcrumb.Item>
                    <Breadcrumb.Item active>{category}</Breadcrumb.Item>
                </Breadcrumb>

                <ListNews dataNews={dataNew.data} title={category} />
            </Container>
            <Footer dataInstitutional={dataIns} />
        </>
    );
}
