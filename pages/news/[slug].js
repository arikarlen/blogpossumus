import Head from "next/head";
import SingleNew from "../../components/news/singleNew";
import Footer from "../../components/commons/footer/footer";
import Header from "../../components/commons/header";
import { Container, Breadcrumb } from "react-bootstrap";
import { Toaster } from "sonner";

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  const URL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?filters[slug][$eq]=${slug}&populate=Imagen_Destacada%2C%20autores.Perfiles%2C%20tags%2C%20descarga%2C%20categoria%2C%20img_descarga&sort=id:desc`;
  const URLINSTITUCIONAL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt`;
  const URLFOOTERCONTENT = `${process.env.NEXT_PUBLIC_API}/page-web-layout?populate=deep&locale=es`;

  const res = await fetch(URL ,  {headers: {Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`}});
  const data = await res.json();
  const dataNew = data;

  const resInstitucional = await fetch(URLINSTITUCIONAL,  {headers: {Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`}});
  const dataInstitucional = await resInstitucional.json();
  const dataIns = dataInstitucional;

  const resFooterContent = await fetch(URLFOOTERCONTENT,  {headers: {Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`}});
  const dataFooter = await resFooterContent.json();
  const footerContent = dataFooter;

  const absoluteUrl = process.env.NEXT_PUBLIC_API_URL;

  return { props: { dataNew, dataIns, absoluteUrl, footerContent } };
}

export default function fullNews({
  dataNew,
  dataIns,
  absoluteUrl,
  footerContent,
}) {
  return (
    <>
      <Head>
        <title>Blog Possumus || {dataNew.data[0]?.attributes.Titulo}</title>
        <meta name="description" content={dataNew.data[0]?.attributes.Bajada} />
        <meta
          name="keywords"
          content={dataNew.data[0]?.attributes?.tags.data.map(
            (data) => " " + data.attributes.Tag
          )}
        />
        <meta name="author" content="Possumus" />
        <meta
          property="og:title"
          content={dataNew.data[0]?.attributes.Titulo}
          key="title"
        />
        <meta
          property="og:description"
          content={dataNew.data[0]?.attributes.Bajada}
        />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Blog Possumus" />
        <meta
          property="og:image"
          content={
            dataNew.data[0]?.attributes.Imagen_Destacada.data.attributes.url
          }
        ></meta>
      </Head>
      <Header title="Blog" style="mainNav" />
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item href="/news">News</Breadcrumb.Item>
          <Breadcrumb.Item active>
            {dataNew.data[0]?.attributes.Titulo}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <SingleNew
        singleNew={dataNew.data[0]?.attributes}
        absoluteUrl={process.env.NEXT_APP_URL}
      />
      <Footer dataInstitutional={dataIns} footerContent={footerContent} />
      <Toaster richColors position="top-right" visibleToasts={1}/>
    </>
  );
}
