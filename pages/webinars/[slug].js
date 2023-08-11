import Head from "next/head";
import SingleNew from "../../components/news/singleNew";
import Footer from "../../components/commons/footer";
import Header from "../../components/commons/header";
import { Container, Breadcrumb } from "react-bootstrap";
import HeaderWebinar from "../../components/webinars/headerWebinar";
import Description from "../../components/webinars/description";
import Speakers from "../../components/webinars/speakers";
import Cta from "../../components/webinars/cta";
import Forms from "../../components/webinars/forms";
import ShareNews from "../../components/news/share";
import PostWebinar from "../../components/webinars/postWebinar";

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;

    const URL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_WEBINARS}?filters[slug][$eq]=${slug}&populate=Imagen_Destacada%2C%20imagen_header%2C%20webinars_tipo%2C%20populate=autores%2C%20autores.Imagen%2C%20autores.Perfiles%2C%20autores.puesto%2C%20cta%2C%20cta.Image_Background%2C%20Form_inscripcion%2C%20PostWebinar%2C%20PostWebinar.Imagen%2C%20PostWebinar.background_form%2C%20PostWebinar.descarga%2C%20tags&sort=id:desc`;
    const URLINSTITUCIONAL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt`;

    const res = await fetch(URL);
    const data = await res.json();
    const dataNew = data;

    const resInstitucional = await fetch(URLINSTITUCIONAL);
    const dataInstitucional = await resInstitucional.json();
    const dataIns = dataInstitucional;

    return { props: { dataNew, dataIns } };
}

export default function fullNews({ dataNew, dataIns }) {
    return (
        <>
            <Head>
                <title>Webinars Possumus || {dataNew.data[0].attributes.Titulo}</title>
                <meta name="description" content={dataNew.data[0].attributes.Bajada} />
                <meta name="keywords" content={dataNew.data[0].attributes?.tags.data.map((data) => " " + data.attributes.Tag)} />
                <meta name="author" content="Possumus" />
                <meta property="og:title" content={dataNew.data[0].attributes.Titulo} key="title" />
                <meta property="og:description" content={dataNew.data[0].attributes.Bajada} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="Webinars Possumus" />
                <meta property="og:image" content={dataNew.data[0].attributes.Imagen_Destacada.data.attributes.url}></meta>
            </Head>
            <Header title="Webinars" style="mainNavNoMargin" />
            <HeaderWebinar
                backgroundImage={dataNew.data[0].attributes.imagen_header.data.attributes.url}
                type={dataNew.data[0].attributes.webinars_tipo.data.attributes.Tipo}
                title={dataNew.data[0].attributes.Titulo}
                subtitle={dataNew.data[0].attributes.Bajada}
                date={dataNew.data[0].attributes.fecha_publicacion}
                textRegister={dataNew.data[0].attributes.boton_registrarse}
                textSeeWebinar={dataNew.data[0].attributes.boton_ver_webinar}
                status={dataNew.data[0].attributes.Destacada}
                color={dataNew.data[0].attributes.color}
            />
            <Description text={dataNew.data[0].attributes.descripcion} />
            <Speakers speakers={dataNew.data[0].attributes.autores.data} />
            <Cta data={dataNew.data[0].attributes.cta} />
            <PostWebinar status={dataNew.data[0].attributes.Destacada} data={dataNew.data[0].attributes.PostWebinar} color={dataNew.data[0].attributes.color} />
            <Forms status={dataNew.data[0].attributes.Destacada} dataForm={dataNew.data[0].attributes.Form_inscripcion} source={dataNew.data[0].attributes.Titulo} title={dataNew.data[0].attributes.Titulo} subTitle={dataNew.data[0].attributes.Bajada} />

            <Footer dataInstitutional={dataIns} />
        </>
    );
}
