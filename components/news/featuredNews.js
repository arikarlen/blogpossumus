import { Row, Image, Col, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/es";
import AutoresList from "../commons/autoresList/AutoresList";

export default function FeaturedNews({ dataNews, type, tag }) {
    const router = useRouter();
    return (
        <Container id="featuredNews">
            {dataNews?.map((data) => (
                <Row key={data.attributes.slug}>
                    <Image src={data.attributes.Imagen_Destacada?.data.attributes.url} fluid alt={data.attributes.Titulo} onClick={() => router.push(type + data.attributes.slug)} />
                    <Col className="textContent">
                        <h6 className="linkPerfil" onClick={() => router.push("/category/" + data.attributes.categoria?.data.attributes.Categoria)}>
                            {data.attributes.categoria?.data.attributes.Categoria}
                        </h6>
                        <h1 onClick={() => router.push(type + data.attributes.slug)}>{data.attributes.Titulo.replaceAll('#', '')}</h1>
                        <h5>
                            {moment(data.attributes.publishedAt).format("DD MMMM YYYY")} | Por{" "}
                            <AutoresList autores={data.attributes.autores.data} />
                        </h5>
                        <p>{data.attributes.Bajada}</p>
                    </Col>
                </Row>
            ))}
        </Container>
    );
}
