import { Container, Col, Image, Row, Breadcrumb } from "react-bootstrap";
import moment from "moment";
import "moment/locale/es";
export default function ListNews({ dataNews }) {
    return (
        <Container id="listBlog">
            <Breadcrumb>
                <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>

                <Breadcrumb.Item active>News</Breadcrumb.Item>
            </Breadcrumb>

            <h1>News</h1>

            {dataNews.map((data) => (
                <Row className="newsList blogItem" onClick={() => router.push("/news/" + data.attributes.slug)}>
                    <Col md={9}>
                        <h6>{moment(data.attributes.publishedAt).format("DD MMMM YYYY")}</h6>

                        <h1>{data.attributes.Titulo}</h1>

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
