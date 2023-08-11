import { Col, Container, Row } from "react-bootstrap";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Description({ text }) {
    return (
        <Container id="description">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <ReactMarkdown>{text}</ReactMarkdown>
                </Col>
            </Row>
        </Container>
    );
}
