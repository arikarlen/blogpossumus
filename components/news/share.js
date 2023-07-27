import { Row, Col, Image } from "react-bootstrap";
import facebook from "../../assets/share/facebook.svg";
import twitter from "../../assets/share/twitter.svg";
import linkedin from "../../assets/share/linkedin.svg";
import whatsApp from "../../assets/share/whastapp.svg";
import telegram from "../../assets/share/telegram.svg";
import mail from "../../assets/share/email.svg";
import copyLink from "../../assets/share/link.svg";
import { useRouter } from "next/router";

export default function ShareNews({ absoluteUrl, title, subTitle }) {
    const { asPath } = useRouter();

    const shareUrl = absoluteUrl + asPath;
    console.log(shareUrl);
    const urlFacebook = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    const urlTwitter = `https://twitter.com/intent/tweet?text=${title}&url=${shareUrl}`;
    const urlLinkedin = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${title}&summary=${subTitle}&source=Possumus.tech`;
    const urlWhatsApp = `https://api.whatsapp.com/send?text=${shareUrl}`;
    const urlTelegram = `https://t.me/share/url?url${shareUrl}&text=${title}`;
    const urlMail = `mailto:?subject=${title}&body=Te%20comparti%20esta%20nota${shareUrl}`;

    const CopyToClipboard = (toCopy) => {
        const el = document.createElement(`textarea`);
        el.value = toCopy;
        el.setAttribute(`readonly`, ``);
        el.style.position = `absolute`;
        el.style.left = `-9999px`;
        document.body.appendChild(el);
        el.select();
        document.execCommand(`copy`);
        document.body.removeChild(el);
        alert("Link Copiado al portapapeles");
        // setShowA(!showA);
    };

    return (
        <>
            <Row id="share">
                <Col md={9} className="sharedLinks">
                    <p>
                        Compartir:
                        <a href={urlFacebook} target="_blank">
                            <Image src={facebook.src} />
                        </a>
                        <a href={urlTwitter} target="_blank">
                            <Image src={twitter.src} />
                        </a>
                        <a href={urlLinkedin} target="_blank">
                            <Image src={linkedin.src} />
                        </a>
                        <a href={urlWhatsApp} target="_blank">
                            <Image src={whatsApp.src} />
                        </a>
                        <a href={urlTelegram} target="_blank">
                            <Image src={telegram.src} />
                        </a>
                        <a href={urlMail} target="_blank">
                            <Image src={mail.src} />
                        </a>
                        <a
                            onClick={() => {
                                CopyToClipboard(window.location.href);
                            }}
                            target="_blank"
                        >
                            <Image src={copyLink.src} />
                        </a>
                    </p>
                </Col>
            </Row>
        </>
    );
}
