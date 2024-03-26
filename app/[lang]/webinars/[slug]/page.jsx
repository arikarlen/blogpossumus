import Head from "next/head";
import HeaderWebinar from "../../../../components/webinars/headerWebinar";
import Description from "../../../../components/webinars/description/description";
import Speakers from "../../../../components/webinars/speakers";
import Cta from "../../../../components/webinars/cta";
import PostWebinar from "../../../../components/webinars/postWebinar";
import MoreInfo from "../../../../components/webinars/moreInfo";
import fetcher from "../../../../utils/fetcher";
import Container from "@/components/commons/container/Container";
import WebinarForm from "../../../../components/webinars/forms/WebinarForm";

export default async function Page({ params: { slug } }) {
  const URL = `${process.env.NEXT_PUBLIC_API}/blog-webinars?filters[webinarInfo][slug][$eq]=${slug}&populate=deep`;
  const webinarData = await fetcher(URL);

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
        <meta name="description" content={header.bajada} />
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
      <HeaderWebinar
        headerData={header}
        isPreWebinar={webinarInfo.preWebinar}
      />
      <Container className="w-10/12">
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
        <WebinarForm
          isPreWebinar={webinarInfo.preWebinar}
          formularioData={formularioDeContacto}
          titulo={header.titulo}
          bajada={header.bajada}
        />
      </Container>
    </>
  );
}
