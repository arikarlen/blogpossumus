import moment from "moment";
import { Col, Container, Image, Row } from "react-bootstrap";
import AutoresList from "../commons/autoresList/AutoresList";
import { useRouter } from "next/router";

export default function ListWebinars({ webinarsData, title }) {
  const router = useRouter();
  return (
    <Container id="listBlog">
      <h4>{title}</h4>

      {webinarsData?.map(({ attributes }) => {
        const { webinarInfo, header, autores } = attributes;
        return (
          <Row
            className="newsList blogItem"
            onClick={() => router.push(`/webinars/${webinarInfo.slug}`)}
            key={webinarInfo.slug}
          >
            <Col md={9}>
              <h1>{header.titulo.replaceAll("#", "")}</h1>
              {/* se remplazan los # porque este campo viene desde un tipo ricktext en Strapi */}
              <h5>
                {moment(header.fecha).format("DD [de] MMMM [del] YYYY")} | Por{" "}
                <AutoresList autores={autores.colaboradores.data} />
              </h5>

              <p>{header.bajada}</p>
            </Col>
            <Col md={3}>
              <Image
                src={webinarInfo.image?.data.attributes.url}
                alt={header.titulo}
                fluid
              />
            </Col>
          </Row>
        );
      })}
    </Container>
  );
}
