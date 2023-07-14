import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";

export default function Home() {
    return (
        <Container>
            <Row>
                <Col md={6}>Hola</Col>
                <Col md={6}>Hola</Col>
            </Row>
        </Container>
    );
}
