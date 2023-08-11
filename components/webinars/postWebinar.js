import { useState } from "react";
import { Col, Container, Image, Row, Button, Modal } from "react-bootstrap";

export default function PostWebinar({ status, data }) {
    console.log(data);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const idVideo = "https://www.youtube.com/embed/" + data.id_youtube;
    return (
        <>
            {!status && (
                <Container id="postWebinar">
                    <h1>{data.titulo}</h1>
                    <iframe width="100%" height="700" src={idVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <Row id="downloadPdfWebinar">
                        <Col md={6}>
                            <Image src={data.Imagen.data.attributes.url} fluid />
                        </Col>
                        <Col md={6}>
                            <h1>{data.Texto}</h1>
                            <Button variant="primary" onClick={handleShow}>
                                Launch demo modal
                            </Button>
                        </Col>
                    </Row>
                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton style={{ backgroundImage: `url(${data.Imagen.data.attributes.url})` }} className="modalTitle">
                            <Modal.Title id="contained-modal-title-vcenter">{data.Titulo_form}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            )}
        </>
    );
}
