import { Col, Container, Row } from "react-bootstrap";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Description({ text, status }) {
    return (
        <Container id="description">
            <Row>
                <Col md={status ? { span: 6, offset: 3 } : {span:10, offset: 1}}>
                    <ReactMarkdown className={status ? "" : "text-center"}>{text}</ReactMarkdown>
                </Col>
            </Row>
        </Container>
    );
}
