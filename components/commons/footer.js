import { Container, Row, Col, Image } from "react-bootstrap";
import clutchImage from "../../assets/clutch.svg";
import certificaction from "../../assets/certification.svg";
import LinkedinBlack from "../../assets/LinkedInIcon.svg";
import InstagramBlack from "../../assets/InstagramIcon.svg";
import TwitterBlack from "../../assets/twitterIcon.svg";
import FacebookBlack from "../../assets/FaceBookIcon.png";

export default function Footer({ dataInstitutional }) {
  const tel = "tel: " + dataInstitutional.data?.attributes.Contacto.telefono;
  const mailto = "mailto:" + dataInstitutional.data?.attributes.Contacto.Email;

  let newDate = new Date();
  let year = newDate.getFullYear();
  return (
    <Container fluid id="footer">
      <Container>
        <Row id="mainFooter">
          <Col>
            <h4>Servicios</h4>
            <ul>
              <li>
                <a
                  href="https://www.possumus.tech/en-en/software-engineering"
                  target="_blank"
                >
                  Software Engineering
                </a>
              </li>
              <li>
                <a
                  href="https://www.possumus.tech/en-en/devops-sre"
                  target="_blank"
                >
                  Ingeniería Cloud y <br></br> Práctica DevOps
                </a>
              </li>
              <li>
                <a
                  href="https://www.possumus.tech/en-en/microsoft-ecosystem"
                  target="_blank"
                >
                  Microsoft Ecosystem
                </a>
              </li>
              <li>
                <a href="https://www.possumus.tech/en-en/itaas" target="_blank">
                  ITaaS
                </a>
              </li>
              <li>
                <a
                  href="https://www.possumus.tech/en-en/staff-augmentation"
                  target="_blank"
                >
                  Staff augmentation
                </a>
              </li>
            </ul>
          </Col>
          <Col>
            <h4>Nosotros</h4>
            <ul>
              <li>
                <a href="https://www.possumus.tech/en-en/about" target="_blank">
                  Quiénes somos
                </a>
              </li>
              <li>
                <a
                  href="https://www.possumus.tech/en-en/organizational-policy"
                  target="_blank"
                >
                  Política organizacional
                </a>
              </li>
            </ul>
          </Col>
          <Col>
            <h4>¡Trabaja con nosotros!</h4>
            <ul>
              <li>
                <a href="https://careers.possumus.tech/jobs/" target="_blank">
                  Carreras
                </a>
              </li>
              <li>
                <a href="https://possumus.tech/en-en/culture" target="_blank">
                  Cultura
                </a>
              </li>
              <li>
                <a href="https://careers.possumus.tech/jobs/" target="_blank">
                  Beneficios
                </a>
              </li>
            </ul>
          </Col>
          <Col>
            <h4>Productos</h4>
            <ul>
              <li>
                <a href="https://possumus.tech/en-en/simple-pay" target="_blank">
                  Simple Pay
                </a>
              </li>
              <li>
                <a href="https://possumus.tech/en-en/products/molix" target="_blank">
                  Molix
                </a>
              </li>
              <li>
                <a href="https://possumus.tech/en-en/products/paax" target="_blank">
                  Paax.io
                </a>
              </li>
            </ul>
          </Col>
          <Col>
            <h4>Contacto</h4>
            <ul>
              <li>
                <a href={tel} target="_blank">
                  {dataInstitutional.data?.attributes.Contacto.telefono}
                </a>
              </li>

              <li>
                <a href={mailto} target="_blank">
                  {dataInstitutional.data?.attributes.Contacto.Email}
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row id="secondaryFooter">
          <Col lg={3} className="d-flex justify-content-center">
            <Image
              src={
                dataInstitutional.data?.attributes.Assets.Logo_Alt.data
                  .attributes.url
              }
              fluid
              alt="Possumus"
            />
          </Col>
          <Col className="justify-content-center d-flex align-items-center">
            <div
              className="clutch-widget"
              data-url="https://widget.clutch.co"
              data-widget-type="2"
              data-height="45"
              data-nofollow="true"
              data-expandifr="true"
              data-primary-color="#fcd702"
              data-secondary-color="#fcd702"
              data-clutchcompany-id="1572791"
            ></div>
          </Col>
          <Col lg={3} className="d-flex justify-content-center">
            <Image src={certificaction.src} fluid alt="Possumus" />
          </Col>
        </Row>
        <Row id="subFooter">
          <Col md={6}>
            <p>Copyright © {year} Possumus. Todos los derechos reservados.</p>
          </Col>
          <Col
            md={6}
            className="text-right d-flex justify-content-center justify-content-md-end align-items-center"
          >
            <h4>Join Us</h4>
            <a
              href={dataInstitutional.data?.attributes.Contacto.Linkedin}
              target="_blank"
            >
              <Image src={LinkedinBlack.src} alt="Linkedin" />
            </a>
            <a
              href={dataInstitutional.data?.attributes.Contacto.Facebook}
              target="_blank"
            >
              <Image src={FacebookBlack.src} alt="Facebook" />
            </a>
            <a
              href={dataInstitutional.data?.attributes.Contacto.Instagram}
              target="_blank"
            >
              <Image src={InstagramBlack.src} alt="Instagram" />
            </a>
            <a
              href={dataInstitutional.data?.attributes.Contacto.Twitter}
              target="_blank"
            >
              <Image src={TwitterBlack.src} alt="Twitter" />
            </a>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
