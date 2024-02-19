"use client"
import { Col, Container, Image, Row } from "react-bootstrap";
import AutoresList from "../commons/autoresList/AutoresList";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function FeaturedWebinars({ webinarsData }) {
    const router = useRouter()
    return (
    <Container id="featuredNews">
      {webinarsData?.map(({ attributes }) => {
        const { webinarInfo, header, autores } = attributes;
        return (
          <Row key={webinarInfo.slug}>
            <Image
              src={webinarInfo.image?.data.attributes.url}
              fluid
              alt={header.titulo}
              onClick={() => router.push(`/webinars/${webinarInfo.slug}`)}
            />
            <Col className="textContent">
              <h1 onClick={() => router.push(`/webinars/${webinarInfo.slug}`)}>
                {header.titulo.replaceAll("#", "")}
              </h1>
              <h5>
                {moment(header.fecha).format("DD [de] MMMM [del] YYYY")} | Por{" "}
                <AutoresList autores={autores.colaboradores.data} />
              </h5>
              <p>{header.bajada}</p>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
}
