"use client";
import { useEffect, useState } from "react";
import Container from "./container/Container";
import Link from "next/link";

export default function PaginationBasic({
  dataPagination,
  prevPage,
  nextPage,
  setPage,
}) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const activePage = dataPagination.page;

  const isFirstPage = activePage === 1;
  const isLastPage = activePage === dataPagination.pageCount;

  useEffect(() => {
    setButtonDisabled(false);
  }, [activePage]);
  return (
    <Container className="flex justify-center mt-12 mb-5">
      <ul className="flex gap-0">
        <li
          onClick={() =>
            !isFirstPage &&
            !buttonDisabled &&
            setButtonDisabled(true) & prevPage()
          }
          className={`${
            isFirstPage || buttonDisabled
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-yellow hover:text-black"
          } m-0 font-mulish text-xs border rounded-l border-gray bg-white px-2 py-1 w-8 text-center align-middle leading-8 cursor-pointer duration-500 ease-in-out`}
        >
          <Link href="#searcher">{`<<`}</Link>
        </li>
        {new Array(dataPagination?.pageCount).fill("").map((data, idx) => {
          const dataPage = idx + 1;
          return (
            <li
              key={dataPage}
              className={`font-mulish m-0 text-m text-black border rounded-xs border-gray px-2 py-1 w-8 text-center leading-8 align-middle cursor-pointer duration-500 ease-in-out hover:bg-yellow hover:text-black hover:border-yellow ${
                dataPage === activePage
                  ? "bg-dark-gray border-dark-gray text-white cursor-default hover:text-white hover:border-dark-gray hover:bg-dark-gray"
                  : ""
              }`}
              onClick={() => {
                setPage(dataPage);
              }}
            >
              <Link href="#searcher">{dataPage}</Link>
            </li>
          );
        })}
        <li
          onClick={() =>
            !isLastPage &&
            !buttonDisabled &&
            setButtonDisabled(true) & nextPage()
          }
          className={`${
            isLastPage || buttonDisabled
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-yellow hover:text-black"
          } m-0 font-mulish text-xs border rounded-r border-gray bg-white px-2 py-1 w-8 text-center align-middle leading-8 cursor-pointer duration-500 ease-in-out`}
        >
          <Link href="#searcher">{`>>`}</Link>
        </li>
      </ul>
    </Container>
  );
}
