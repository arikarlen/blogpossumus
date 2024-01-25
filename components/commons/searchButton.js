import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useOutsideListener } from "../../hooks/useOutsideListener";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function SearchButton() {
  const [isSearchButtonActive, setSearchButtonActive] = useState(false);
  const [actualSearch, setActualSearch] = useState([]);

  const actualSearchRef = useRef(null);
  useOutsideListener(actualSearchRef, () => setActualSearch([]));
  const { register, handleSubmit, getValues, setFocus } = useForm({
    mode: "onTouched",
    defaultValues: { keyword: "" },
  });

  const handleRequest = async () => {
    const keyword = getValues("keyword");
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=*&filters[$or][0][Titulo][$contains]=${keyword}&filters[$or][1][Bajada][$contains]=${keyword}`
      )
      .then((res) => {
        setActualSearch(res.data.data);
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

  useEffect(()=>{
    if(isSearchButtonActive){
      setFocus("keyword")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isSearchButtonActive])
  return (
    <form onSubmit={handleSubmit(OnSubmit)} id="searchForm">
      {isSearchButtonActive && (
        <Form.Control
          type="text"
          id="searchKeyword"
          aria-describedby="passwordHelpBlock"
          {...register("keyword", {
            onChange: (e) =>
              e.target.value.length > 1 ? handleRequest() : setActualSearch([]),
          })}
        />
      )}
      <Button
        variant="primary"
        type="submit"
        id="searchButton"
        className={isSearchButtonActive ? "active" : ""}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
      {actualSearch.length > 0 && (
        <div className="searchContainer" ref={actualSearchRef}>
          {actualSearch.map((search) => (
            <li key={search.attributes.slug}>
              <Link href={`/news/${search.attributes.slug}`} onClick={()=>{
                setSearchButtonActive(false)
                setActualSearch([])
              }}>
                {search.attributes.Titulo}
              </Link>
              {search.attributes.bajada && <p>{search.attributes.bajada}</p>}
            </li>
          ))}
        </div>
      )}
    </form>
  );
}
