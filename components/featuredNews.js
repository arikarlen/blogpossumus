import { Row, Image, Col } from "react-bootstrap";
import featuredImage from "../assets/newsImage/featured.jpg";
import moment from "moment";
import "moment/locale/es";

export default function FeaturedNews({ dataNews }) {
    return (
        <>
            {dataNews.map((data) => (
                <>
                    {data.attributes.Destacada == true && (
                        <Row id="featuredNews">
                            <Image src={featuredImage.src} fluid />
                            <Col className="textContent">
                                <h6>{moment(data.attributes.publishedAt).format("DD MMMM YYYY")}</h6>
                                <h1>{data.attributes.Titulo}</h1>
                                <p>{data.attributes.Bajada}</p>
                            </Col>
                        </Row>
                    )}
                </>
            ))}
        </>
    );
}
