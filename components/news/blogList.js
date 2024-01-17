import { Col, Row, Image, Container, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/es";
import { useState } from "react";
import axios from "axios";

export default function ListNews({
  dataNews,
  type,
  tag,
  withSeeMoreButton = false,
}) {
  const [actualPagination, setActualPagination] = useState(4);
  const [news, setActualNews] = useState(dataNews);
  const [message, setMessage] = useState({text: 'Ver más notas', disabled: false})

  const router = useRouter();

  const loadMoreNews = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API}/${
          process.env.NEXT_PUBLIC_API_BLOG
        }?populate=Imagen_Destacada%2C%20autores.Perfiles%2C%20tags%2C%20categoria%2C%20categoria&filters[Destacada][$eq]=false&sort=fecha_publicacion:desc&pagination[page]=0&pagination[pageSize]=${
          actualPagination + 4
        }`
      )
      .then((res) => {
        if(res.data.meta.pagination.pageSize > res.data.meta.pagination.total + 4){
            // Ya no hay mas news
            setMessage({text: 'No hay más notas', disabled: true})
        }else{
            setActualNews(res.data.data)
        }
      });
    setActualPagination(actualPagination + 4);
  };

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
        {withSeeMoreButton && (
          <Container className="seeMoreButton">
            <Row>
              <Col className="d-flex justify-content-center">
                {" "}
                <Button disabled={message.disabled} variant="primary" onClick={() => !message.disabled && loadMoreNews()}>
                  {message.text}
                </Button>
              </Col>
            </Row>
          </Container>
        )}
      </Row>
    </Container>
  );
}
