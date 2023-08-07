import { Col, Row, Image, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/es";

export default function ListNews({ dataNews }) {
    const router = useRouter();

    return (
        <Container id="listBlog">
            <Row>
                {dataNews.map(
                    (data) =>
                        data.attributes.Destacada == false && (
                            <Col md={6} className="blogItem" key={data.attributes.slug}>
                                <Image src={data.attributes.Imagen_Destacada?.data.attributes.url} alt={data.attributes.Titulo} fluid onClick={() => router.push("/news/" + data.attributes.slug)} />

                                <div className="textContent ">
                                    <h6 className="linkPerfil" onClick={() => router.push("/category/" + data.attributes.categoria?.data.attributes.Categoria)}>
                                        {data.attributes.categoria?.data.attributes.Categoria}
                                    </h6>

                                    <h1 onClick={() => router.push("/news/" + data.attributes.slug)}>{data.attributes.Titulo}</h1>
                                    <h5>
                                        {moment(data.attributes.publishedAt).format("DD MMMM YYYY")} | Por{" "}
                                        {data.attributes.autores.data.map((autor) => (
                                            <a href={autor.attributes?.perfil} target="_blank" className="linkPerfil" key={autor.attributes?.Nombre}>
                                                {autor.attributes?.Nombre},{" "}
                                            </a>
                                        ))}
                                    </h5>
                                    <p>{data.attributes.Bajada}</p>
                                </div>
                            </Col>
                        )
                )}
            </Row>
        </Container>
    );
}
