import { Container, Row } from "react-bootstrap";

export default function Cta({ data, textColor }) {
    return (
        <Container id="cta" style={{ backgroundImage: `url(${data.Image_Background.data.attributes.url})`, color: textColor }}>
            <Row>
                <h2>{data.Titulo}</h2>
            </Row>
        </Container>
    );
}
