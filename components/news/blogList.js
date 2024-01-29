import { Col, Row, Image, Container, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/es";
import { Loader } from "../commons/loader/Loader";
import useSeeMore from "../../hooks/useSeeMore";

export default function ListNews({
  dataNews,
  type,
  tag,
  withSeeMoreButton = false,
}) {
  const [news, loadMoreNews, isLoadingMoreNotes, message] = useSeeMore({
    initialData: dataNews,
    initialMessage: `Ver más ${type.includes('news') ? 'notas' : 'webinars'}`,
    type: `${type.replaceAll("/", "").replaceAll("news", "blogs")}`,
  });

  const router = useRouter();

  return (
    <Container id="listBlog">
      <Row>
        {news.map((data) => (
          <Col md={6} className="blogItem" key={data.attributes.slug}>
            <Image
              src={data.attributes.Imagen_Destacada?.data.attributes.url}
              alt={data.attributes.Titulo}
              fluid
              onClick={() => router.push(type + data.attributes.slug)}
            />

            <div className="textContent ">
              <h6
                className="linkPerfil"
                onClick={() =>
                  router.push(
                    "/category/" +
                      data.attributes.categoria?.data.attributes.Categoria
                  )
                }
              >
                {data.attributes.categoria?.data.attributes.Categoria}
              </h6>

              <h1 onClick={() => router.push(type + data.attributes.slug)}>
                {data.attributes.Titulo.replaceAll("#", "")}
              </h1>
              <h5>
                {moment(data.attributes.fecha_publicacion).format(
                  "DD MMMM YYYY"
                )}{" "}
                | {tag}
                {data.attributes.autores.data.map((autor) => (
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
              <p>{data.attributes.Bajada}</p>
            </div>
          </Col>
        ))}
        {withSeeMoreButton && !message.disabled && (
          <>
            {isLoadingMoreNotes && <Loader />}
            <Container className="seeMoreButton">
              <Row>
                <Col className="d-flex justify-content-center">
                  {" "}
                  <Button
                    disabled={message.disabled}
                    variant="primary"
                    onClick={() => !message.disabled && loadMoreNews()}
                  >
                    {message.text}
                  </Button>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </Row>
    </Container>
  );
}
