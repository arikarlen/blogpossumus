import { Row, Image, Col, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/es";

export default function FeaturedNews({ dataNews }) {
    const router = useRouter();
    return (
        <Container id="featuredNews">
            {dataNews.map(
                (data) =>
                    data.attributes.Destacada == true && (
                        <Row key={data.attributes.slug}>
                            <Image src={data.attributes.Imagen_Destacada?.data.attributes.url} fluid alt={data.attributes.Titulo} onClick={() => router.push("/news/" + data.attributes.slug)} />
                            <Col className="textContent">
                                <h6 className="linkPerfil" onClick={() => router.push("/category/" + data.attributes.categoria?.data.attributes.Categoria)}>
                                    {data.attributes.categoria?.data.attributes.Categoria}
                                </h6>
                                <h1 onClick={() => router.push("/news/" + data.attributes.slug)}>{data.attributes.Titulo}</h1>
                                <h5>
                                    {" "}
                                    {moment(data.attributes.publishedAt).format("DD MMMM YYYY")} - Por{" "}
                                    {data.attributes.autores.data.map((autor) => (
                                        <>
                                            <a href={autor.attributes?.perfil} target="_blank" className="linkPerfil">
                                                {autor.attributes?.Nombre},
                                            </a>{" "}
                                        </>
                                    ))}
                                </h5>
                                <p>{data.attributes.Bajada}</p>
                            </Col>
                        </Row>
                    )
            )}
        </Container>
    );
}
