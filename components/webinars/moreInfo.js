import { Col, Container, Image, Row } from "react-bootstrap";

const MoreInfo = ({ title, personal, status }) => {
  return (
    <>
      {!status && (
        <Container id="moreInfo">
          <Row className="align-items-center justify-content-center">
            <Col>
              <h1>{title}</h1>
            </Col>
            <Col className="personalSection">
              <Row className="align-items-center justify-content-center">
                <Col md={3}>
                  <Image
                    src={personal.image.data.attributes.url}
                    alt="imagen de personal"
                  />
                </Col>
                <Col md={9}>
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
