import SingleNew from "../../components/news/singleNew";
import Footer from "../../components/commons/footer";
import Header from "../../components/commons/header";
import { Container, Breadcrumb } from "react-bootstrap";

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;

    const URL = `http://localhost:1337/api/blogs?filters[slug][$eq]=${slug}&populate=*&sort=id:desc`;
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
