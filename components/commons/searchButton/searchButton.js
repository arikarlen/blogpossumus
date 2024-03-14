import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchArticles from "./searchArticles";
import { useParams } from "next/navigation";

export default function SearchButton() {
  const { register, handleSubmit, getValues, setFocus } = useForm({
    mode: "onTouched",
    defaultValues: { keyword: "" },
  });

  const {lang} = useParams()

  function resetSearch() {
    setSearchButtonActive(false);
    setActualSearch([]);
    setRecommendedArticle([]);
  }

  const [isSearchButtonActive, setSearchButtonActive] = useState(false);
  const [actualSearch, setActualSearch] = useState([]);
  const [recommendedArticle, setRecommendedArticle] = useState([]);

  const getRandomNew = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?locale=${lang}&populate=*`,
        {
          headers: {
            Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      )
      .then(async (response) => {
        const totalNews = response.data.meta.pagination.total;
        const random = Math.floor(Math.random() * parseInt(totalNews));
        setActualSearch([]);
        setRecommendedArticle([response.data.data[random]]);
      })
      .catch((error) =>
        console.log(
          `Ocurrió un error al obtener un articulo random: ${error.message}`
        )
      );
  };

  const handleRequest = async () => {
    const keyword = getValues("keyword");
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?locale=${lang}&populate=*&filters[$or][0][Titulo][$contains]=${keyword}&filters[$or][1][Bajada][$contains]=${keyword}`,
        {
          headers: {
            Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.data?.length > 0) {
          setActualSearch(res.data.data);
        } else {
          if (recommendedArticle.length === 0) {
            getRandomNew();
          }
        }
      });
  };

  const OnSubmit = () => {
    if (isSearchButtonActive) {
      if (getValues("keyword")) {
        handleRequest();
      } else {
        setSearchButtonActive(false);
      }
    } else {
      setSearchButtonActive(true);
    }
  };

  useEffect(() => {
    if (isSearchButtonActive) {
      setFocus("keyword");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchButtonActive]);
  return (
    <form onSubmit={handleSubmit(OnSubmit)} className="flex relative">
      {isSearchButtonActive && (
        <input
          type="text"
          aria-describedby="passwordHelpBlock"
          className="py-1 px-1 rounded-l-2xl bg-light-gray border border-light-gray focus:border-yellow ease-in-out duration-150"
          {...register("keyword", {
            onChange: (e) => e.target.value.length > 1 && handleRequest(),
          })}
        />
      )}
      <button
        variant="primary"
        type="submit"
        className={`rounded-r-2xl py-1 px-2 ${
          isSearchButtonActive && "bg-yellow border-yellow"
        }`}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      {actualSearch.length > 0 ? (
        <SearchArticles
          items={actualSearch}
          resetSearch={resetSearch}
          variant="search"
        />
      ) : (
        recommendedArticle.length > 0 && (
          <SearchArticles
            items={recommendedArticle}
            resetSearch={resetSearch}
            variant="recommended"
          />
        )
      )}
    </form>
  );
}
