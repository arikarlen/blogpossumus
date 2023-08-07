import { Container, Row, Col, Image } from "react-bootstrap";
import notFound from "../../assets/notFound.png";

export default function ResultsNotFound({ keyword }) {
    return (
        <Container>
            <Row className="resultNotFound">
                <Col className="text-center">
                    <Image src={notFound.src} />
                    <h1>No se encontraron resultados</h1>
                    <p>
                        No encontramos articulos que contengan <strong>{keyword}</strong>, por favor intente otra busqueda
                    </p>
                </Col>
            </Row>
        </Container>
    );
}
