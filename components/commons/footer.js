import { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import clutchImage from "../../assets/clutch.svg";
import certificaction from "../../assets/certification.svg";
import LinkedinBlack from "../../assets/LinkedInIcon.svg";
import InstagramBlack from "../../assets/InstagramIcon.svg";
import TwitterBlack from "../../assets/twitterIcon.svg";
import FacebookBlack from "../../assets/FaceBookIcon.png";

import logoWldBlack from "../../assets/Logo_WLDBY_Black.svg";
import logoWldWhite from "../../assets/Logo_WLDBY_White.svg";

export default function Footer({ dataInstitutional }) {
    const [theme, setTheme] = useState();
    const [linkedin, setLinkedin] = useState(LinkedinBlack);
    const [instagram, setInstagram] = useState(InstagramBlack);
    const [twitter, setTwitter] = useState(TwitterBlack);
    const [facebook, setFacebook] = useState(FacebookBlack);
    const [wldLogo, setWldLogo] = useState();

    const tel = "tel: " + dataInstitutional.data?.attributes.Contacto.telefono;
    const mailto = "mailto:" + dataInstitutional.data?.attributes.Contacto.Email;

    useEffect(() => {
        setTheme(localStorage.getItem("theme"));
        if (localStorage.theme === "dark") {
            setWldLogo(logoWldWhite.src);
        } else {
            setWldLogo(logoWldBlack.src);
        }
    }, []);

    return (
        <Container fluid id="footer">
            <Container>
                <Row id="mainFooter">
                    <Col>
                        <h4>Servicios</h4>
                        <ul>
                            <li>
                                <a href="https://www.possumus.tech/en-en/software-engineering" target="_blank">
                                    Software Engineering
                                </a>
                            </li>
                            <li>
                                <a href="https://www.possumus.tech/en-en/devops-sre" target="_blank">
                                    SRE
                                </a>
                            </li>
                            <li>
                                <a href="https://www.possumus.tech/en-en/staff-augmentation" target="_blank">
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
                                <a href="https://www.possumus.tech/en-en/organizational-policy" target="_blank">
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
                                <a href="https://careers.possumus.tech/jobs/" target="_blank">
                                    Postularte ahora
                                </a>
                            </li>
                        </ul>
                    </Col>
                    <Col>
                        <h4>Cultura</h4>
                        <ul>
                            <li>
                                <a href="https://careers.possumus.tech/jobs/" target="_blank">
                                    Beneficios
                                </a>
                            </li>
                            <li>
                                <a href="https://careers.possumus.tech/jobs/" target="_blank">
                                    Crecimiento
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
                    <Col>
                        <Image src={wldLogo} fluid alt="Possumus" />
                    </Col>
                    <Col>
                        <Image src={clutchImage.src} fluid alt="Possumus" />
                    </Col>
                    <Col>
                        <Image src={certificaction.src} fluid alt="Possumus" />
                    </Col>
                </Row>
                <Row id="subFooter">
                    <Col>
                        <p>Copyright © 2023 Possumus. Todos los derechos reservados.</p>
                    </Col>
                    <Col className="text-right">
                        <h4>
                            Join Us
                            <a href={dataInstitutional.data?.attributes.Contacto.Linkedin} target="_blank">
                                <Image src={linkedin.src} alt="Linkedin" />
                            </a>
                            <a href={dataInstitutional.data?.attributes.Contacto.Instagram} target="_blank">
                                <Image src={instagram.src} alt="Instagram" />
                            </a>
                            <a href={dataInstitutional.data?.attributes.Contacto.Twitter} target="_blank">
                                <Image src={twitter.src} alt="Twitter" />
                            </a>
                            <a href={dataInstitutional.data?.attributes.Contacto.Facebook} target="_blank">
                                <Image src={facebook.src} alt="Facebook" />
                            </a>
                        </h4>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
