import { Container, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";

export default function SeeMoreeButton({ link }) {
    const router = useRouter();
    return (
        <Container className="seeMoreButton">
            <Row>
                <Col className="d-flex justify-content-center">
                    {" "}
                    <Button variant="primary" onClick={() => router.push(link)}>
                        Ver más notas
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
