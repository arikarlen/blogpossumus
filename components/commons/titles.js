import Container from "@/components/commons/container/Container";

export default function Title({ title, className = "mb-6", fluid=false }) {
    return (
        <Container className={className} fluid={fluid}>
            <h1>{title}</h1>
        </Container>
    );
}
