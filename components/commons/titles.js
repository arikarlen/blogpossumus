"use client"
import { Container } from "react-bootstrap";

export default function Title({ title }) {
    return (
        <Container>
            <h1>{title}</h1>
        </Container>
    );
}
