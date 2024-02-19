import Head from "next/head";
import fetcher from "../../utils/fetcher";
import Header from "../../components/commons/header";
import SearchInput from "../../components/commons/searchInput/SearchInput";
import Footer from "../../components/commons/footer/footer";

export default async function Page() {
  const webinarsURL = `${process.env.NEXT_PUBLIC_API}/blog-webinars?populate=deep&pagination%5BwithCount%5D=true&pagination%5Bpage%5D=0&pagination%5BpageSize%5D=10&sort=id:desc`;
  const institucionalURL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt`;
  const footerURL = `${process.env.NEXT_PUBLIC_API}/page-web-layout?populate=deep&locale=es`;

  const {data: webinarData, meta: webinarPagination } = await fetcher(webinarsURL);
  const {data: institucionalData} = await fetcher(institucionalURL);
  const {data: footerContent} = await fetcher(footerURL);

  return (
    <>
      <Head>
        <title>Blog Possumus || Webinars</title>
        <meta name="description" content="Blog de Possumus" />
        <meta
          name="keywords"
          content="News, webinars, noticias, novedades, tecnologia, desarrollo"
        />
        <meta name="author" content="Possumus" />
        <meta property="og:title" content="Blog de Possumus" key="title" />
        <meta
          property="og:description"
          content="At Possumus, we implement Agile methodologies to create positive experiences through technology with human value. Software Engineering."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Blog Possumus" />
        <meta
          property="og:image"
          content="https://possumustech.blob.core.windows.net/staticfiles/assets/Possumus_d54fcb00ec.png"
        ></meta>
      </Head>
      <Header title="Blog" style="mainNav" />
      <SearchInput initialData={webinarData} type="Webinars" pagination={webinarPagination} />
      <Footer
        dataInstitutional={institucionalData}
        footerContent={footerContent}
      />
    </>
  );
}
