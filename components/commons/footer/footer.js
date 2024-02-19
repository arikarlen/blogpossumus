"use client";
import { Container, Row, Col, Image } from "react-bootstrap";
import certificaction from "../../../assets/certification.svg";
import styles from "./footer.module.css";
import { useEffect, useState } from "react";

export default function Footer({ dataInstitutional, footerContent }) {
  const tel = "tel: " + dataInstitutional?.data?.attributes.Contacto.telefono;
  const mailto = "mailto:" + dataInstitutional?.data?.attributes.Contacto.Email;

  const [isClient, setIsClient] = useState(false);

  let newDate = new Date();
  let year = newDate.getFullYear();

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <Container fluid className={styles.footer}>
      <Container
        style={{ padding: "0 50px" }}
        className="d-flex flex-column-reverse flex-md-column"
      >
        <Row className={styles.primaryFooter}>
          {footerContent?.attributes.footer.options?.map((option, idx) => {
            return (
              <Col className="p-0" key={idx}>
                <p className={styles.titleFooter}>{option.title}</p>
                {option.multipleOptions?.data.map((multipleOption) => (
                  <p
                    key={multipleOption.attributes.title}
                    className={styles.links}
                  >
                    <a
                      href={`https://www.possumus.tech/es-es${multipleOption.attributes.href}`}
                      target="_blank"
                    >
                      {multipleOption.attributes.title}
                    </a>
                  </p>
                ))}
              </Col>
            );
          })}
        </Row>
        <Row md={12} className={styles.secondaryFooter}>
          <Col className="p-0">
            <a href="https://possumus.tech/">
              <Image
                src={
                  dataInstitutional?.attributes.Assets.Logo_Alt.data
                    .attributes.url
                }
                alt="Possumus"
                fluid
              />
            </a>
          </Col>
          <Col className="justify-content-center d-flex align-items-center p-0">
            <Image src={certificaction.src} alt="Possumus" fluid />
          </Col>
          <Col className="justify-content-center d-flex align-items-center p-0">
            {isClient && (
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
                style={{ maxWidth: "200px" }}
              ></div>
            )}
          </Col>
          <Col className="d-grid justify-content-center p-0">
            <div>
              <p className={styles.titleFooter}>Hablemos</p>
              <p className={styles.links}>
                <a href="tel: 08103450562">0810 345 0562</a>
              </p>
              <p className={styles.links}>
                <a href="mailto:info@possumus.tech">info@possumus.tech</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Row className={styles.disclaimer}>
        <Col>
          <p>Copyright © {year} Possumus. All Rigths Reserved.</p>
        </Col>
        <Col className={styles.redes}>
          <h4>Join Us</h4>
          {footerContent?.attributes.footer.socials.map((social) => (
            <a href={social.href} target="_blank" key={social.href}>
              <Image
                src={social.image.data.attributes.url}
                alt={social.image.data.attributes.name}
              />
            </a>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
