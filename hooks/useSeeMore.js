import axios from "axios";
import { useEffect, useState } from "react";

export default function useSeeMore({
  initialData,
  initialMessage,
  type,
  lang
}) {
  const [actualPagination, setActualPagination] = useState(4);
  const [data, setActualData] = useState(initialData || []);
  const [buttonMessage, setButtonMessage] = useState({
    text: initialMessage,
    disabled: false,
  });

  const isInEnglish = lang === "en";

  const [isLoadingMoreData, setIsLoadingMoreData] = useState(false);

  const loadMoreData = async () => {
    setIsLoadingMoreData(true);
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API}/${type}?locale=${lang}&populate=deep&${
          type === "blogs" && "sort=fecha_publicacion:desc&"
        }pagination[page]=0&pagination[pageSize]=${actualPagination + 4}`,
        {
          headers: {
            Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      )
      .then((res) => {
        if (
          res.data.meta.pagination.pageSize >
          res.data.meta.pagination.total + 4
        ) {
          // Ya no hay mas news
          setButtonMessage({ text: isInEnglish ? "No more news" : "No hay más notas", disabled: true });
        } else {
          setActualData(res.data.data);
        }
      })
      .catch((e) =>
        console.log(`Ocurrió un error al cargar mas ${type}: ${e.message}`)
      )
      .finally(() => setIsLoadingMoreData(false));
    setActualPagination(actualPagination + 4);
  };

  useEffect(() => {
    if (data.length < 4) {
      setButtonMessage({ ...buttonMessage, disabled: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, loadMoreData, isLoadingMoreData, buttonMessage];
}
