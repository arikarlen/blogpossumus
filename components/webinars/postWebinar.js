import { useState } from "react";
import { Col, Container, Image, Row, Button, Modal } from "react-bootstrap";
import DownloadPdf from "./downloadPdf";
import closeIcon from "../../assets/close-circle.png";

export default function PostWebinar({
  isPreWebinar,
  videoData,
  bannerBrochureData,
  downloadBrochureData,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const idVideo = "https://www.youtube.com/embed/" + videoData?.youtubeID;
  return (
    <>
      {!isPreWebinar && (
        <Container id="postWebinar">
          <h1>{videoData.titulo}</h1>
          <iframe
            width="100%"
            height="700"
            src={idVideo}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <Row id="downloadPdfWebinar" className="align-items-center">
            <Col md={6}>
              <Image
                src={bannerBrochureData.imagen.data.attributes.url}
                alt="download webinar"
                fluid
              />
            </Col>
            <Col md={6}>
              <h1>{bannerBrochureData.titulo}</h1>
              <Button
                variant={bannerBrochureData.button.variante}
                onClick={handleShow}
                style={{
                  "--hover-color": bannerBrochureData.button.hoverColor || "#000",
                }}
              >
                {bannerBrochureData.button.texto}
              </Button>
            </Col>
          </Row>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header
              style={{
                backgroundImage: `url(${downloadBrochureData.backgroundImage.data.attributes.url})`,
              }}
              className="modalTitle"
            >
              <Image
                src={closeIcon.src}
                alt="Close modal"
                onClick={handleClose}
              />
              <Modal.Title id="contained-modal-title-vcenter">
                {downloadBrochureData.titulo}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DownloadPdf
                file={downloadBrochureData.downloadFile.data.attributes.url}
              />
            </Modal.Body>
          </Modal>
        </Container>
      )}
    </>
  );
}
