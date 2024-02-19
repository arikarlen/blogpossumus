"use client"
import { Container, Row } from "react-bootstrap";

export default function Cta({ titulo, backgroundImage, textoColor }) {
    return (
        <Container id="cta" style={{ backgroundImage: `url(${backgroundImage.url})`, color: textoColor }}>
            <Row>
                <h2>{titulo}</h2>
            </Row>
        </Container>
    );
}
