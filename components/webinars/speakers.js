import { Col, Container, Image, Row } from "react-bootstrap";

export default function Speakers({ speakers }) {
    return (
        <Container id="speakers">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h4>Speakers:</h4>
                    <Row id="speakersContainer">
                        {speakers.map((speaker) => (
                            <Col key={speaker.attributes?.Nombre}>
                                <Row>
                                    <Col md={4} className="d-flex align-items-center">
                                        <Image src={speaker.attributes?.Imagen.data[0].attributes?.url} alt="webinar speaker" fluid />
                                    </Col>
                                    <Col md={8}>
                                        <h2>{speaker.attributes?.Nombre}</h2>
                                        <h3>{speaker.attributes?.puesto?.data.attributes?.Puesto}, Possumus</h3>
                                    </Col>
                                </Row>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
