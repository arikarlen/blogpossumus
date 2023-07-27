import { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
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

    const { register, handleSubmit } = useForm({
        mode: "onTouched",
        defaultValues: {},
    });

    const onSubmit = (data) => {
        axios.get(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=*&filters[$or][0][Titulo][$contains]=${data.Keyword}&filters[$or][1][Bajada][$contains]=${data.Keyword}`).then((res) => {
            setDataNews(res.data);
        });
    };

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt`).then((res) => {
            setDataInstitucional(res.data);
        });
    }, []);

    return (
        <>
            <Header />
            <Container fluid id="searchContainer">
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1 className="text-center">Buscador</h1>
                        <form onSubmit={handleSubmit(onSubmit)} id="searchForm">
                            <Form.Control type="text" id="searchKeyword" aria-describedby="passwordHelpBlock" {...register("Keyword")} />
                            <Button variant="primary" type="Submit" id="searchButton">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </Button>
                        </form>
                    </Col>
                </Row>

                {dataNews ? dataNews.data == "" ? <ResultsNotFound /> : <ListNews dataNews={dataNews.data} title="Resultados de la busqueda" /> : <StartSearch />}
            </Container>
            <Footer dataInstitutional={dataInstitucional} />
        </>
    );
}
