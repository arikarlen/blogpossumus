import { Container, Row } from "react-bootstrap";
export default function HeaderWebinar({ backgroundImage, type }) {
    return (
        <Container style={{ backgroundImage: `url(${backgroundImage})` }} fluid id="headerWebinar">
            <Container>
                <Row id="contentHeader">
                    <h2>{type}</h2>
                </Row>
            </Container>
        </Container>
    );
}
