import { Row, Image, Col, Container } from "react-bootstrap";
import featuredImage from "../assets/newsImage/featured.jpg";
import moment from "moment";
import "moment/locale/es";

export default function FeaturedNews({ dataNews }) {
    return (
        <Container id="featuredNews">
            {dataNews.map(
                (data) =>
                    data.attributes.Destacada == true && (
                        <Row>
                            <Image src={data.attributes.Imagen_Destacada?.data.attributes.url} fluid />
                            <Col className="textContent">
                                <h6>{moment(data.attributes.publishedAt).format("DD MMMM YYYY")}</h6>
                                <h1>{data.attributes.Titulo}</h1>
                                <p>{data.attributes.Bajada}</p>
                            </Col>
                        </Row>
                    )
            )}
        </Container>
    );
}
