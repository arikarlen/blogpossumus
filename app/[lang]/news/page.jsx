import Head from "next/head";
import SearchInput from "../../../components/commons/searchInput/SearchInput";
import { getNews, nextPageNews, prevPageNews, setPageNews } from "./actions";
import DataList from "@/components/commons/dataList/DataList";
import PaginationBasic from "@/components/commons/paginationBasic";

export default async function News({params}) {
  const { pagination, keyword, resultsNotFounded } = await getNews();
  return (
    <>
      <Head>
        <title>Blog Possumus || News</title>
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
      <SearchInput type="News"/>
      <DataList
        keyword={keyword}
        isWebinar={false}
        resultsNotFounded={resultsNotFounded}
        lang={params.lang}
      />

      <PaginationBasic
        dataPagination={pagination}
        prevPage={prevPageNews}
        nextPage={nextPageNews}
        setPage={setPageNews}
      />
    </>
  );
}
