import { useState, useEffect } from "react";
import Head from "next/head";
import { Col, Container, Row, Form, Button, Breadcrumb } from "react-bootstrap";
import Header from "../../components/commons/header";
import { useForm } from "react-hook-form";
import axios from "axios";
import ListNews from "../../components/commons/newsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ResultsNotFound from "../../components/commons/resultNotFound";
import StartSearch from "../../components/commons/startSearch";

import Footer from "../../components/commons/footer";

export default function Search() {
    const [dataNews, setDataNews] = useState();
    const [dataInstitucional, setDataInstitucional] = useState();
    const [keyword, setKeyword] = useState("");
    const [showFooter, setShowFooter] = useState(false);

    const { register, handleSubmit } = useForm({
        mode: "onTouched",
        defaultValues: { Keyword: "" },
    });

    const onSubmit = (data) => {
        setKeyword(data.Keyword);
    };

    useEffect(
        (data) => {
            axios.get(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=*&filters[$or][0][Titulo][$contains]=${keyword}&filters[$or][1][Bajada][$contains]=${keyword}&sort=id:desc`).then((res) => {
                setDataNews(res.data);
            });
        },
        [keyword]
    );

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt`).then((res) => {
            setDataInstitucional(res.data);
            setShowFooter(true);
        });
    }, []);

    return (
        <>
            <Head>
                <title>Blog Possumus || News</title>
                <meta name="description" content="Blog de Possumus" />
                <meta name="keywords" content="News, webinars, noticias, novedades, tecnologia, desarrollo" />
                <meta name="author" content="Possumus" />
                <meta property="og:title" content="Blo de possumus" key="title" />
                <meta property="og:description" content="At Possumus, we implement Agile methodologies to create positive experiences through technology with human value. Software Engineering." />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Blog Possumus" />
                {/* <meta property="og:image" content={dataNew.data[0].attributes.Imagen_Destacada.data.attributes.url}></meta> */}
            </Head>
            <Header />
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item active href="/news">
                        News
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Container>
            <Container fluid id="searchContainer">
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1 className="text-center">News</h1>
                        <form onSubmit={handleSubmit(onSubmit)} id="searchForm">
                            <Form.Control type="text" id="searchKeyword" aria-describedby="passwordHelpBlock" {...register("Keyword")} />
                            <Button variant="primary" type="Submit" id="searchButton">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </Button>
                        </form>
                    </Col>
                </Row>

                {dataNews ? dataNews.data == "" ? <ResultsNotFound keyword={keyword} /> : <ListNews dataNews={dataNews.data} title="Resultados" /> : <StartSearch />}
            </Container>
            {showFooter && <Footer dataInstitutional={dataInstitucional} />}
        </>
    );
}
