import { Container, Row, Col, Image } from "react-bootstrap";
import notFound from "../../assets/notFound.png";

export default function ResultsNotFound() {
    return (
        <Container>
            <Row className="resultNotFound">
                <Col className="text-center">
                    <Image src={notFound.src} />
                    <h2>No se encontraron resultados</h2>
                    <p>Por favor intente otra busqueda</p>
                </Col>
            </Row>
        </Container>
    );
}
