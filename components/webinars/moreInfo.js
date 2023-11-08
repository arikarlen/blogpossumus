import { Col, Container, Image, Row } from "react-bootstrap";

const MoreInfo = ({ title, personal, status }) => {
  return (
    <>
      {!status && (
        <Container id="moreInfo">
          <Row className="align-items-center justify-content-center">
            <Col md={5} className="text-center text-md-start">
              <h1>{title}</h1>
            </Col>
            <Col md={5} className="personalSection">
              <Row className="align-items-center justify-content-center gap-4">
                <Col md={3} className="text-center text-md-start">
                  <Image
                    src={personal.image.data.attributes.url}
                    alt="imagen de personal"
                  />
                </Col>
                <Col md={6} className="text-center text-md-start">
                  <h3>{personal.nombre}</h3>
                  <span>{personal.puesto}</span>
                  <p>W: {personal.whatsapp}</p>
                  <p>T: {personal.tel}</p>
                  <p>E: {personal.email}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default MoreInfo;
