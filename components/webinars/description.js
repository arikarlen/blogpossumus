import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Description({ isPreWebinar, descriptionData }) {
  const { preWebinar, postWebinar, imagen } = descriptionData;
  return (
    <Container id="description">
      <Row>
        <Col
          md={isPreWebinar ? { span: 6, offset: 3 } : { span: 10, offset: 1 }}
          className="d-flex flex-column justify-content-center"
        >
          <ReactMarkdown
            className={isPreWebinar ? "prewebinar" : "text-center"}
          >
            {isPreWebinar ? preWebinar : postWebinar}
          </ReactMarkdown>
          <Image
            src={imagen.data.attributes.url}
            width={imagen.data.attributes.width}
            height={imagen.data.attributes.height}
            alt="Ilustración de la descripción"
          />
        </Col>
      </Row>
    </Container>
  );
}
