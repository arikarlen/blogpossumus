import { useState } from "react";
import { Col, Container, Image, Row, Button, Modal } from "react-bootstrap";
import DownloadPdf from "./downloadPdf";
import closeIcon from '../../assets/close-circle.png'

export default function PostWebinar({ status, data, color }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const idVideo = "https://www.youtube.com/embed/" + data?.id_youtube;
    return (
        <>
            {!status && (
                <Container id="postWebinar">
                    <h1>{data.titulo}</h1>
                    <iframe width="100%" height="700" src={idVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <Row id="downloadPdfWebinar">
                        <Col md={6}>
                            <Image src={data.Imagen.data.attributes.url} alt="download webinar" fluid />
                        </Col>
                        <Col md={6}>
                            <h1>{data.Texto}</h1>
                            <Button
                                variant="primary"
                                onClick={handleShow}
                                style={{
                                    "--hover-color": color,
                                }}
                            >
                                Free Download
                            </Button>
                        </Col>
                    </Row>
                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header style={{ backgroundImage: `url(${data.background_form.data?.attributes.url})` }} className="modalTitle">
                            <Image src={closeIcon.src} alt="Close modal" onClick={handleClose}/>
                            <Modal.Title id="contained-modal-title-vcenter">{data.Titulo_form}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <DownloadPdf source={data.Texto} file={data.descarga.data?.attributes.url} />
                        </Modal.Body>
                    </Modal>
                </Container>
            )}
        </>
    );
}
