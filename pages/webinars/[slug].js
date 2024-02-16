import Head from "next/head";
import Footer from "../../components/commons/footer/footer";
import Header from "../../components/commons/header";
import HeaderWebinar from "../../components/webinars/headerWebinar";
import Description from "../../components/webinars/description";
import Speakers from "../../components/webinars/speakers";
import Cta from "../../components/webinars/cta";
import Forms from "../../components/webinars/forms";
import PostWebinar from "../../components/webinars/postWebinar";
import MoreInfo from "../../components/webinars/moreInfo";
import fetcher from "../../utils/fetcher";

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  const URL = `${process.env.NEXT_PUBLIC_API}/blog-webinars?filters[webinarInfo][slug][$eq]=${slug}&populate=deep`;
  const URLINSTITUCIONAL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt`;
  const URLFOOTERCONTENT = `${process.env.NEXT_PUBLIC_API}/page-web-layout?populate=deep&locale=es`;

  const webinarData = await fetcher(URL);

  const dataIns = await fetcher(URLINSTITUCIONAL);

  const footerContent = await fetcher(URLFOOTERCONTENT);

  return { props: { webinarData, dataIns, footerContent } };
}

export default function fullWebinars({ webinarData, dataIns, footerContent }) {
  const {
    webinarInfo,
    header,
    descripcion,
    autores,
    banner,
    seccionVideo,
    bannerBrochurePostWebinar,
    descargaBrochurePostWebinar,
    moreInfo,
    formularioDeContacto,
  } = webinarData.data[0].attributes;

  return (
    <>
      <Head>
        <title>
          Webinars Possumus ||{" "}
          {header.titulo.replaceAll("\n", "").replaceAll("#", "")}
        </title>
        {/* //Se quitan caracteres provenientes de Strapi, ya que title es tipo richText */}
        <meta name="description" content={header.Bajada} />
        <meta
          name="keywords"
          content={webinarInfo.tags?.data.map(
            (data) => " " + data.attributes.Tag
          )}
        />
        <meta name="author" content="Possumus" />
        <meta property="og:title" content={header.titulo} key="title" />
        <meta property="og:description" content={header.bajada} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Webinars Possumus" />
        <meta
          property="og:image"
          content={webinarInfo.image.data.attributes.url}
        ></meta>
      </Head>
      <Header title="Webinars" style="mainNavNoMargin" />
      <HeaderWebinar
        headerData={header}
        isPreWebinar={webinarInfo.preWebinar}
      />
      <Description
        isPreWebinar={webinarInfo.preWebinar}
        descriptionData={descripcion}
      />
      <Speakers titulo={autores.titulo} speakers={autores.colaboradores} />
      <Cta
        titulo={banner.titulo}
        backgroundImage={banner.background.data.attributes}
        textColor={banner.textoColor}
      />
      <PostWebinar
        isPreWebinar={webinarInfo.preWebinar}
        videoData={seccionVideo}
        bannerBrochureData={bannerBrochurePostWebinar}
        downloadBrochureData={descargaBrochurePostWebinar}
      />
      <MoreInfo
        isPreWebinar={webinarInfo.preWebinar}
        title={moreInfo.titulo}
        personal={moreInfo.personal}
      />
      <Forms
        isPreWebinar={webinarInfo.preWebinar}
        formularioData={formularioDeContacto}
        titulo={header.titulo}
        bajada={header.bajada}
      />
      <Footer dataInstitutional={dataIns} footerContent={footerContent} />
    </>
  );
}
