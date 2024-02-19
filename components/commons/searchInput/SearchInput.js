"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import ResultsNotFound from "../resultNotFound";
import ListWebinars from "../../webinars/listWebinars";
import StartSearch from "../startSearch";
import PaginationBasic from "../paginationBasic";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ListNews from "../newsList";

export default function SearchInput({ initialData, type, pagination }) {
  const [data, setData] = useState(initialData);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [dataPagination, setDataPagination] = useState(pagination);
  const pageSize = 10;

  const isWebinar = type === "Webinars";

  const { register, handleSubmit } = useForm({
    mode: "onTouched",
    defaultValues: { Keyword: "" },
  });

  const onSubmit = (data) => {
    setKeyword(data.Keyword);
  };

  useEffect(() => {
    async function getData() {
      const url = isWebinar
        ? `${process.env.NEXT_PUBLIC_API}/blog-webinars?populate=deep&filters[$or][0][header][titulo][$contains]=${keyword}&filters[$or][1][header][bajada][$contains]=${keyword}&pagination%5BwithCount%5D=true&pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=${pageSize}&sort=id:desc`
        : `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=*&filters[$or][0][Titulo][$contains]=${keyword}&filters[$or][1][Bajada][$contains]=${keyword}&pagination%5BwithCount%5D=true&pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=${pageSize}&sort=id:desc`;

      await axios
        .get(url, {
          headers: {
            Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        })
        .then((res) => {
          setData(res.data.data);
          setDataPagination(res.data?.meta?.pagination);
        })
        .catch((error) =>
          console.log(`Ocurrió un error en su busqueda: ${error.message}`)
        );
    }
    getData();
  }, [keyword, page, isWebinar]);
  return (
    <>
    <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active href="/news">
            {type}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container fluid id="searchContainer">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1 className="text-center">{type}</h1>
            <form onSubmit={handleSubmit(onSubmit)} id="searchForm">
              <Form.Control
                type="text"
                id="searchKeyword"
                aria-describedby="passwordHelpBlock"
                {...register("Keyword")}
              />
              <Button variant="primary" type="Submit" id="searchButton">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            </form>
          </Col>
        </Row>

        {data ? (
          data.data == "" ? (
            <ResultsNotFound keyword={keyword} />
          ) : isWebinar ? (
            <ListWebinars webinarsData={data} title="Resultados" />
          ) : (
            <ListNews dataNews={data} title="Resultados" />
          )
        ) : (
          <StartSearch />
        )}

        <PaginationBasic
          page={page}
          setPage={setPage}
          dataPagination={dataPagination}
        />
      </Container>
    </>
  );
}
