import { Container, Row, Col } from "react-bootstrap";

export default function StartSearch() {
    return (
        <Container>
            <Row className="resultNotFound">
                <Col className="text-center">
                    <p>Ingrese las palabras por las que desea realizar la busqueda</p>
                </Col>
            </Row>
        </Container>
    );
}
