import { Container, Col, Image, Row, Breadcrumb } from "react-bootstrap";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/es";
export default function ListNews({ dataNews, title }) {
    const router = useRouter();

    return (
        <Container id="listBlog">
            <h4>{title}</h4>

            {dataNews.map((data) => (
                <Row className="newsList blogItem" onClick={() => router.push("/news/" + data.attributes.slug)} key={data.attributes.slug}>
                    <Col md={9}>
                        <h6 className="linkPerfil" onClick={() => router.push("/category/" + data.attributes.categoria?.data.attributes.Categoria)}>
                            {data.attributes.categoria?.data.attributes.Categoria}
                        </h6>

                        <h1>{data.attributes.Titulo}</h1>
                        <h5>
                            {moment(data.attributes.publishedAt).format("DD MMMM YYYY")} | Por{" "}
                            {data.attributes?.autores.data.map((autor) => (
                                <>
                                    <a href={autor.attributes?.perfil} target="_blank" className="linkPerfil">
                                        {autor.attributes?.Nombre},{" "}
                                    </a>
                                </>
                            ))}
                        </h5>

                        <p>{data.attributes.Bajada}</p>
                    </Col>
                    <Col md={3}>
                        <Image src={data.attributes.Imagen_Destacada?.data.attributes.url} fluid />
                    </Col>
                </Row>
            ))}
        </Container>
    );
}
