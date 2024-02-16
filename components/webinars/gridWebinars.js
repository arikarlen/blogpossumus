import { Button, Col, Container, Image, Row } from "react-bootstrap";
import useSeeMore from "../../hooks/useSeeMore";
import { Loader } from "../commons/loader/Loader";
import moment from "moment";
import AutoresList from "../commons/autoresList/AutoresList";
import { useRouter } from "next/router";

export default function GridWebinars({ webinars, withSeeMoreButton = false }) {
  const [webinarsList, loadMoreWebinars, isLoadingMoreWebinars, message] =
    useSeeMore({
      initialData: webinars,
      initialMessage: "Ver más webinars",
      type: "blog-webinars",
    });

    const router = useRouter()

  return (
    <Container id="listBlog">
      <Row>
        {webinarsList?.map(({ attributes }) => {
          const { webinarInfo, header, autores } = attributes;
          return (
            <Col md={6} className="blogItem" key={webinarInfo.slug}>
              <Image
                src={webinarInfo.image?.data.attributes.url}
                alt={header.titulo}
                fluid
                onClick={() => router.push(`/webinars/${webinarInfo.slug}`)}
              />

              <div className="textContent ">
                {/* <h6
              className="linkPerfil"
              onClick={() =>
                router.push(
                  "/category/" +
                    data.attributes.categoria?.data.attributes.Categoria
                )
              }
            >
              {data.attributes.categoria?.data.attributes.Categoria}
            </h6> */}

                <h1 onClick={() => router.push(type + data.attributes.slug)}>
                  {header.titulo.replaceAll("#", "")}
                </h1>
                <h5>
                  {moment(header.fecha).format("DD [de] MMMM [del] YYYY")} |{" "}
                  {`Por: `}
                  <AutoresList autores={autores.colaboradores.data} />
                </h5>
                <p>{header.bajada}</p>
              </div>
            </Col>
          );
        })}
        {withSeeMoreButton && !message.disabled && (
          <>
            {isLoadingMoreWebinars && <Loader />}
            <Container className="seeMoreButton">
              <Row>
                <Col className="d-flex justify-content-center">
                  {" "}
                  <Button
                    disabled={message.disabled}
                    variant="primary"
                    onClick={() => !message.disabled && loadMoreWebinars()}
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
