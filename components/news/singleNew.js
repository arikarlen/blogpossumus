import { Container, Row, Col, Image } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import "moment/locale/es";
import ShareNews from "./share";
import DownloadPdf from "./downloadPdf";

export default function SingleNew({ singleNew, absoluteUrl }) {
    return (
        <Container id="fullNewContent">
            <Container id="fullNew">
                <Row>
                    <Col md={{ span: 10, offset: 1 }}>
                        <h1 className="title">{singleNew.Titulo}</h1>
                        <Row>
                            <Col md={2}>
                                <h6>{moment(singleNew.publishedAt).format("DD MMMM YYYY")}</h6>
                            </Col>
                            <Col md={10}>{singleNew.Bajada}</Col>
                            <Image src={singleNew.Imagen_Destacada?.data.attributes.url} fluid className="outstandingImg" alt={singleNew.Titulo} />
                        </Row>
                        <Row id="newsContent">
                            <Col md={9}>
                                <ReactMarkdown>{singleNew.cuerpo}</ReactMarkdown>
                            </Col>
                        </Row>
                        <Row id="downloadPdf" className="text-center">
                            <Col md={9}>{singleNew.descarga?.data == null ? "" : <DownloadPdf file={singleNew.descarga?.data.attributes.url} source={singleNew.Titulo} />}</Col>
                        </Row>
                        <ShareNews absoluteUrl={absoluteUrl} title={singleNew.Titulo} subTitle={singleNew.Bajada} />
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
