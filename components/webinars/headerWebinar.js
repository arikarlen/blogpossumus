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
import { useRouter } from "next/router";
import FloatingLogo from "../commons/floatingLogo";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
export default function HeaderWebinar({
  backgroundImage,
  type,
  title,
  subtitle,
  date,
  textRegister,
  textSeeWebinar,
  status,
  textColor,
  btnHeader,
  iconFilter,
  headerLogo,
}) {
  const router = useRouter();
  const [screenWidth, setWidth] = useState(0);

  useEffect(() => setWidth(window.innerWidth), []);
  return (
    <Container
      style={{
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        color: textColor,
        "--bs-secondary-color": textColor,
        "--text-color": textColor,
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
              ? title.slice(0, 25).replaceAll("#", "") + "..."
              : title.replaceAll("#", "")}
            {/* se remplazan los # porque este campo viene desde un tipo ricktext en Strapi */}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container>
        <Row id="contentHeader">
          <Col md={9}>
            <h2>{type}</h2>
            <ReactMarkdown>{title}</ReactMarkdown>
            <p>{subtitle}</p>
          </Col>
        </Row>
        <Row id="contentDate">
          <Col lg={3} xxl={2}>
            <h2>
              <Image
                style={{ filter: iconFilter ? iconFilter : null }}
                src={fCalendar.src}
                alt="Date"
                className="iconDate"
              />{" "}
              {moment(date).format("D") + " de " + moment(date).format("MMMM ")}
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
              {moment.utc(date).format("HH:mm") + " H (GMT-3)"}
            </h2>
          </Col>
        </Row>
        <Row className="participateButton">
          <Col md={6} lg={4}>
            <Button
              variant="primary"
              onClick={() => router.push("#cta")}
              style={{
                "--btnHeader-backgroundColor": btnHeader
                  ? btnHeader.backgroundColor
                  : "#2e2d31",
                "--btnHeader-color": btnHeader ? btnHeader.color : "#FFF",
                "--hover-color": btnHeader?.colorHover,
                "--hover-backgroundColor": btnHeader?.backgroundColorHover,
              }}
            >
              {status ? textRegister : textSeeWebinar}
            </Button>
          </Col>
        </Row>
      </Container>
      {/* <FloatingLogo logo={headerLogo} /> */}
    </Container>
  );
}
