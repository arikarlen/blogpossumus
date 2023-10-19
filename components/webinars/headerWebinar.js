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
import WeLoveTechFloatingLogo from "../commons/weLoveTechFloatingLogo";
export default function HeaderWebinar({
  backgroundImage,
  type,
  title,
  subtitle,
  date,
  textRegister,
  textSeeWebinar,
  status,
  color,
  textColor,
  btnHeader,
}) {
  const router = useRouter();
  console.log(btnHeader);
  return (
    <Container
      style={{ backgroundImage: `url(${backgroundImage})` }}
      fluid
      id="headerWebinar"
    >
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item href="/webinars">Webinars</Breadcrumb.Item>
          <Breadcrumb.Item active>{title}</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container>
        <Row id="contentHeader">
          <Col md={9}>
            <h2>{type}</h2>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </Col>
        </Row>
        <Row id="contentDate">
          <Col md={2}>
            <h2>
              <Image src={fCalendar.src} alt="Date" className="iconDate" />{" "}
              {moment(date).format("DD") +
                " de " +
                moment(date).format("MMMM ")}
            </h2>
          </Col>
          <Col md={6}>
            <h2>
              <Image src={fClock.src} alt="Date" className="iconDate" />{" "}
              {moment.utc(date).format("HH:mm") + " H (GMT-3)"}
            </h2>
          </Col>
        </Row>
        <Row className="participateButton">
          <Col md={4}>
            <Button
              variant="primary"
              onClick={() => router.push("#cta")}
              style={{
                "--btnHeader-backgroundColor": btnHeader.backgroundColor,
                "--btnHeader-color": btnHeader.color,
                "--hover-color": btnHeader.colorHover,
                "--hover-backgroundColor": btnHeader.backgroundColorHover,
              }}
            >
              {status ? textRegister : textSeeWebinar}
            </Button>
          </Col>
        </Row>
      </Container>
      <WeLoveTechFloatingLogo />
    </Container>
  );
}
