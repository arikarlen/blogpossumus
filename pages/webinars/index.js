import { useState, useEffect } from "react";
import Head from "next/head";
import { Col, Container, Row, Form, Button, Breadcrumb } from "react-bootstrap";
import Header from "../../components/commons/header";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ResultsNotFound from "../../components/commons/resultNotFound";
import StartSearch from "../../components/commons/startSearch";

import Footer from "../../components/commons/footer/footer";
import PaginationBasic from "../../components/commons/paginationBasic";
import ListWebinars from "../../components/webinars/listWebinars";
import fetcher from "../../utils/fetcher";
import axios from "axios";

export async function getServerSideProps() {
  const webinarsURL = `${process.env.NEXT_PUBLIC_API}/blog-webinars?populate=deep&pagination%5BwithCount%5D=true&pagination%5Bpage%5D=0&pagination%5BpageSize%5D=10&sort=id:desc`;
  const institucionalURL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt`;
  const footerURL = `${process.env.NEXT_PUBLIC_API}/page-web-layout?populate=deep&locale=es`;
  try {
    const webinars = await fetcher(webinarsURL);
    const institucional = await fetcher(institucionalURL);
    const footer = await fetcher(footerURL);
    return {
      props: {
        webinarData: webinars.data,
        institucionalData: institucional.data,
        footerData: footer.data,
        pagination: webinars.meta,
      },
    };
  } catch (error) {
    console.error(
      `Ocurrió un error al obtener los webinars desde el servidor: ${error.message}`
    );
    return error;
  }
}

export default function Search({
  webinarData,
  institucionalData,
  footerData,
  pagination,
}) {
  const [webinars, setWebinars] = useState(webinarData);
  const [keyword, setKeyword] = useState("");
  const [showFooter, setShowFooter] = useState(false);
  const [page, setPage] = useState(1);
  const [dataPagination, setDataPagination] = useState(pagination);
  const pageSize = 10;

  const { register, handleSubmit } = useForm({
    mode: "onTouched",
    defaultValues: { Keyword: "" },
  });

  const onSubmit = (data) => {
    setKeyword(data.Keyword);
  };

  useEffect(() => {
    async function getData() {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_API}/blog-webinars?populate=deep&filters[$or][0][header][titulo][$contains]=${keyword}&filters[$or][1][header][bajada][$contains]=${keyword}&pagination%5BwithCount%5D=true&pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=${pageSize}&sort=id:desc`,
          {
            headers: {
              Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          }
        )
        .then((res) => {
          console.log(res)
          setWebinars(res.data.data);
          setDataPagination(res.data?.meta?.pagination);
        })
        .catch((error) =>
          console.log(`Ocurrió un error en su busqueda: ${error.message}`)
        );
    }
    if (keyword) {
      getData();
    }
  }, [keyword, page]);
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
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active href="/webinars">
            Webinars
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container fluid id="searchContainer">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1 className="text-center">Webinars</h1>
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

        {webinars ? (
          webinars.data == "" ? (
            <ResultsNotFound keyword={keyword} />
          ) : (
            <ListWebinars webinarsData={webinars} title="Resultados" />
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
      {showFooter && (
        <Footer
          dataInstitutional={institucionalData}
          footerContent={footerData}
        />
      )}
    </>
  );
}
