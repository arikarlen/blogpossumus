import { Row, Col, Image, Button } from "react-bootstrap";
import facebook from "../../assets/share/facebook.svg";
import twitter from "../../assets/share/twitter.svg";
import linkedin from "../../assets/share/linkedin.svg";
import whatsApp from "../../assets/share/whastapp.svg";
import telegram from "../../assets/share/telegram.svg";
import mail from "../../assets/share/email.svg";
import copyLink from "../../assets/share/link.svg";
import moreShareOptions from "../../assets/share/moreShareOptions.svg";
import closeMoreShareOptions from "../../assets/share/closeMoreShareOptions.svg";
import { useRouter } from "next/router";
import { Toaster, toast } from "sonner";
import { useState } from "react";

export default function ShareNews({ absoluteUrl, title, subTitle }) {
  const { asPath } = useRouter();

  const [isMoreOptionsMobileVisible, setIsMoreOptionsMobileVisible] =
    useState(false);

  const shareUrl = "https://grow.possumus.tech" + asPath;

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
    console;
    toast.success("Link copiado al portapapeles");
  };
  
  return (
    <>
      <Row id="share">
        <Col md={12} className="sharedLinks">
          <Col className="d-flex justify-content-around">
            Compartir:
            <a href={urlFacebook} target="_blank">
              <Image src={facebook.src} alt="Facebook" />
            </a>
            <a href={urlTwitter} target="_blank">
              <Image src={twitter.src} alt="Twitter" />
            </a>
            <a href={urlLinkedin} target="_blank">
              <Image src={linkedin.src} alt="Linkedin" />
            </a>
            <a href={urlWhatsApp} target="_blank">
              <Image src={whatsApp.src} alt="WhatsApp" />
            </a>
            <a href={urlTelegram} target="_blank">
              <Image src={telegram.src} alt="Telegram" />
            </a>
            <a href={urlMail} target="_blank">
              <Image src={mail.src} alt="Mail" />
            </a>
            <a
              onClick={() => {
                CopyToClipboard(window.location.href);
              }}
              target="_blank"
            >
              <Image src={copyLink.src} alt="Compartir" />
            </a>
          </Col>
        </Col>
        <Col md={12} className="sharedLinks mobile">
            Compartir:
            <a href={urlTwitter} target="_blank">
              <Image src={twitter.src} alt="Twitter" />
            </a>
            <a href={urlLinkedin} target="_blank">
              <Image src={linkedin.src} alt="Linkedin" />
            </a>
            <a href={urlWhatsApp} target="_blank">
              <Image src={whatsApp.src} alt="WhatsApp" />
            </a>
            <div className="more-options-container">
              <a
                onClick={() =>
                  setIsMoreOptionsMobileVisible(!isMoreOptionsMobileVisible)
                }
              >
                <Image
                  src={
                    isMoreOptionsMobileVisible
                      ? closeMoreShareOptions.src
                      : moreShareOptions.src
                  }
                  alt="More options"
                />
              </a>
              <div
                className={
                  isMoreOptionsMobileVisible
                    ? "more-options visible"
                    : "more-options no-visible"
                }
              >
                <a href={urlFacebook} target="_blank">
                  <Image src={facebook.src} alt="Facebook" />
                </a>
                <a href={urlTelegram} target="_blank">
                  <Image src={telegram.src} alt="Telegram" />
                </a>
                <a href={urlMail} target="_blank">
                  <Image src={mail.src} alt="Mail" />
                </a>
                <a
                  onClick={() => {
                    CopyToClipboard(window.location.href);
                  }}
                  target="_blank"
                >
                  <Image src={copyLink.src} alt="Compartir" />
                </a>
              </div>
            </div>
        </Col>
      </Row>
      <Toaster richColors position="top-right" />
    </>
  );
}
