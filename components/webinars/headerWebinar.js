"use client"
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Image,
  Button,
} from "react-bootstrap";
import fCalendar from "../../assets/FCalendar.svg";
import fClock from "../../assets/FClock.svg";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
export default function HeaderWebinar({headerData, isPreWebinar}) {
  const {
    titulo,
    backgroundHeader,
    bajada,
    fecha,
    botonPreWebinar,
    botonPostWebinar,
    textoColor,
    iconFilter
  } = headerData

  const router = useRouter();
  
  const [screenWidth, setWidth] = useState(0);

  const headerButton = isPreWebinar ? botonPreWebinar : botonPostWebinar

  useEffect(() => setWidth(window.innerWidth), []);
  return (
    <Container
      style={{
        position: "relative",
        backgroundImage: `url(${backgroundHeader.data.attributes.url})`,
        color: textoColor,
        "--bs-secondary-color": textoColor,
        "--text-color": textoColor,
      }}
      fluid
      id="headerWebinar"
    >
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item href="/webinars">Webinars</Breadcrumb.Item>
          <Breadcrumb.Item active>
            {screenWidth < 768
              ? titulo.slice(0, 25).replaceAll("#", "") + "..."
              : titulo.replaceAll("#", "")}
            {/* se remplazan los # porque este campo viene desde un tipo ricktext en Strapi */}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container>
        <Row id="contentHeader">
          <Col md={9}>
            {/* <h2>{type}</h2> */}
            <ReactMarkdown>{titulo}</ReactMarkdown>
            <p>{bajada}</p>
          </Col>
        </Row>
        {isPreWebinar && (
          <Row id="contentDate">
            <Col lg={3} xxl={2}>
              <h2>
                <Image
                  style={{ filter: iconFilter ? iconFilter : null }}
                  src={fCalendar.src}
                  alt="Date"
                  className="iconDate"
                />{" "}
                {moment(fecha).format("D") +
                  " de " +
                  moment(fecha).format("MMMM ")}
              </h2>
            </Col>
            <Col lg={3}>
              <h2>
                <Image
                  style={{ filter: iconFilter ? iconFilter : null }}
                  src={fClock.src}
                  alt="Date"
                  className="iconDate"
                />{" "}
                {moment.utc(fecha).format("HH:mm") + " H (GMT-3)"}
              </h2>
            </Col>
          </Row>
        )}
        <Row className="participateButton">
          <Col md={6} lg={4}>
            <Button
              variant={headerButton.variante}
              onClick={() => router.push(headerButton.href)}
              style={{
                "--btnHeader-backgroundColor": headerButton.backgroundColor || "#2e2d31",
                "--btnHeader-color": headerButton.color || "#FFF",
                "--hover-color": headerButton.hoverColor || "#FFF",
                "--hover-backgroundColor": headerButton.hoverBackgroundColor || "#000",
              }}
            >
              {headerButton.texto}
            </Button>
          </Col>
        </Row>
      </Container>
      {/* <FloatingLogo logo={headerLogo} /> */}
    </Container>
  );
}
