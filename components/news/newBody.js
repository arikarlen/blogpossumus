import { Col, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import useImageModal from "../../hooks/useImageModal";
import ImageModal from "../commons/imageModal/ImageModal";
import { useRef } from "react";

export default function NewBody({ cuerpo }) {
    const bodyRef = useRef()
  const { imageData, setImageData } = useImageModal(bodyRef);

  return (
    <>
      {imageData.active && (
        <ImageModal data={imageData} handleModal={setImageData} />
      )}
      <Row id="newsContent" ref={bodyRef}>
        <Col md={{ span: 8, offset: 2 }}>
          <ReactMarkdown>{cuerpo || ""}</ReactMarkdown>
        </Col>
      </Row>
    </>
  );
}
