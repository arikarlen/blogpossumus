import { Col, Row, Image, Container } from "react-bootstrap";
import moment from "moment";
import "moment/locale/es";

export default function ListNews({ dataNews }) {
    return (
        <Container id="listBlog">
            <Row>
                {dataNews.map(
                    (data) =>
                        data.attributes.Destacada == false && (
                            <Col md={6} className="blogItem">
                                <Image src={data.attributes.Imagen_Destacada?.data.attributes.url} fluid />
                                <div className="textContent ">
                                    <h6>{moment(data.attributes.publishedAt).format("DD MMMM YYYY")}</h6>
                                    <h1>{data.attributes.Titulo}</h1>
                                    <p>{data.attributes.Bajada}</p>
                                </div>
                            </Col>
                        )
                )}
            </Row>
        </Container>
    );
}
