"use client"
import { Col, Container, Image, Row } from "react-bootstrap";

const MoreInfo = ({ title, personal, isPreWebinar }) => {
  return (
    <>
      {!isPreWebinar && (
        <Container id="moreInfo">
          <Row className="align-items-center justify-content-center">
            <Col md={5} className="text-center text-md-start">
              <h1>{title}</h1>
            </Col>
            <Col md={5} className="personalSection">
              {personal.map((persona, idx) => (
                <Row
                  className="align-items-center justify-content-center gap-4"
                  key={`moreInfo-personal-${persona.nombre}-${idx}`}
                >
                  <Col md={3} className="text-center text-md-start">
                    <Image
                      src={persona.image.data.attributes.url}
                      alt="imagen de persona"
                    />
                  </Col>
                  <Col md={6} className="text-center text-md-start">
                    <h3>{persona.nombre}</h3>
                    <span>{persona.puesto}</span>
                    <p>W: {persona.whatsapp}</p>
                    <p>T: {persona.tel}</p>
                    <p>E: {persona.email}</p>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default MoreInfo;
