import useClientApi from "../../../hooks/useClientApi";
import Note from "../../commons/note/Note";
import RelatedNewsSkeleton from "./relatedNewsSkeleton";
import NoRelatedNewsFounded from "./noRelatedNewsFounded";

export default function RelatedNews({ tags, actualNewTitle }) {
  const PAGE_SIZE = 6;
  const url = `${process.env.NEXT_PUBLIC_API}/${
    process.env.NEXT_PUBLIC_API_BLOG
  }?populate=*&${
    tags.data.length > 0 &&
    tags.data
      .map(
        (tag, idx) =>
          //Se limita a buscar unicamente por los 3 primeros tags para menor consumo del servidor
          idx < 3 &&
          `filters[$or][${idx}][tags][Tag][$contains]=${tag.attributes.Tag}`
      )
      .toString()
      .replaceAll(",", "&")
  }&filters[$and][3][Titulo][$ne]=${actualNewTitle}&pagination[pageSize]=${PAGE_SIZE}`;

  const [relatedNews, setRelatedNews, isNewsLoading] = useClientApi(url);

  return (
    <>
      {isNewsLoading ? (
        <RelatedNewsSkeleton />
      ) : relatedNews.length > 0 ? (
        relatedNews.map((relatedNew, idx) => (
          <Note
            key={idx}
            data={relatedNew.attributes}
            isLoading={isNewsLoading}
          />
        ))
      ) : (
        <NoRelatedNewsFounded />
      )}
    </>
  );
}
