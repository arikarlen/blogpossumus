import { Container, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";

export default function SeeMoreeButton({ link }) {
    const router = useRouter();
    return (
        <Container className="seeMoreButton">
            <Row>
                <Col md={{ span: 2, offset: 5 }}>
                    {" "}
                    <Button variant="primary" onClick={() => router.push(link)}>
                        Ver mas
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
