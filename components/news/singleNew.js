import { Container, Row, Col, Image } from "react-bootstrap";
import moment from "moment";
import "moment/locale/es";
import ShareNews from "./share";
import DownloadPdf from "./downloadPdf";
import NewBody from "./newBody";
import RelatedNews from "./relatedNews";

export default function SingleNew({ singleNew, absoluteUrl }) {

  return (
    <>
      <Container id="fullNewContent">
        <Container id="fullNew">
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <h6>{singleNew?.categoria?.data.attributes.Categoria}</h6>
              <h1 className="title">{singleNew?.Titulo}</h1>
              <h5>
                {moment(singleNew?.fecha_publicacion).format("DD MMMM YYYY")} |
                Por{" "}
                {singleNew?.autores?.data.map((autor) => (
                  <a
                    href={autor.attributes?.Perfiles?.Principal}
                    target="_blank"
                    className="linkPerfil"
                    key={autor.attributes?.Nombre}
                  >
                    {autor.attributes?.Nombre},{" "}
                  </a>
                ))}
              </h5>
              <Row id="dateContent">
                <Col md={10}>{singleNew?.Bajada}</Col>
                <Image
                  src={singleNew?.Imagen_Destacada?.data.attributes.url}
                  fluid
                  className="outstandingImg"
                  alt={singleNew?.Titulo}
                />
              </Row>
              <NewBody cuerpo={singleNew?.cuerpo}/>
              <Row id="downloadPdf" className="text-center">
                <Col md={9}>
                  {singleNew?.descarga?.data == null ? (
                    ""
                  ) : (
                    <DownloadPdf
                      file={singleNew?.descarga?.data.attributes.url}
                      source={singleNew?.Titulo}
                      backGroundImage={
                        singleNew?.img_descarga?.data.attributes.url
                      }
                    />
                  )}
                </Col>
              </Row>
              <ShareNews
                absoluteUrl={absoluteUrl}
                title={singleNew?.Titulo}
                subTitle={singleNew?.Bajada}
              />
              <RelatedNews tags={singleNew?.tags} title="Notas relacionadas" actualNewTitle={singleNew?.Titulo}/>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
