"use client";
import facebook from "../../assets/share/facebook.svg";
import twitter from "../../assets/share/x.svg";
import linkedin from "../../assets/share/linkedin.svg";
import whatsApp from "../../assets/share/wsp.svg";
import telegram from "../../assets/share/compartir.svg";
import mail from "../../assets/share/correo.svg";
import copyLink from "../../assets/share/enlace.svg";
import moreShareOptions from "../../assets/share/moreShareOptions.svg";
import closeMoreShareOptions from "../../assets/share/closeMoreShareOptions.svg";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { CopyToClipboard } from "../../utils/functions";
import Image from "next/image";
import Container from "../commons/container/Container";
import useDictionary from "@/hooks/useDictionary";


export default function ShareNews({ title, subTitle }) {
  const { asPath } = useRouter();
  const {lang} = useParams()

  const [isMoreOptionsMobileVisible, setIsMoreOptionsMobileVisible] =
    useState(false);

  const shareUrl = "https://grow.possumus.tech" + asPath;

  const urlFacebook = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  const urlTwitter = `https://twitter.com/intent/tweet?text=${title}&url=${shareUrl}`;
  const urlLinkedin = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${title}&summary=${subTitle}&source=Possumus.tech`;
  const urlWhatsApp = `https://api.whatsapp.com/send?text=${shareUrl}`;
  const urlTelegram = `https://t.me/share/url?url${shareUrl}&text=${title}`;
  const urlMail = `mailto:?subject=${title}&body=Te%20comparti%20esta%20nota${shareUrl}`;

  const dictionary = useDictionary(lang)

  return (
    <>
      <Container className="flex md:justify-center my-14">
        <div className="md:block hidden border-y w-full border-y-gray-d8 py-9">
          <div className="flex justify-around w-full items-center">
            {dictionary.commons.share.title}
            <a href={urlFacebook} target="_blank">
              <Image
                className="opacity-60 hover:opacity-100 ease-in-out duration-200"
                width={40}
                height={40}
                src={facebook.src}
                alt="Facebook"
              />
            </a>
            <a href={urlTwitter} target="_blank">
              <Image
                className="opacity-60 hover:opacity-100 ease-in-out duration-200"
                width={40}
                height={40}
                src={twitter.src}
                alt="Twitter"
              />
            </a>
            <a href={urlLinkedin} target="_blank">
              <Image
                className="opacity-60 hover:opacity-100 ease-in-out duration-200"
                width={40}
                height={40}
                src={linkedin.src}
                alt="Linkedin"
              />
            </a>
            <a href={urlWhatsApp} target="_blank">
              <Image
                className="opacity-60 hover:opacity-100 ease-in-out duration-200"
                width={40}
                height={40}
                src={whatsApp.src}
                alt="WhatsApp"
              />
            </a>
            <a href={urlTelegram} target="_blank">
              <Image
                className="opacity-60 hover:opacity-100 ease-in-out duration-200"
                width={40}
                height={40}
                src={telegram.src}
                alt="Telegram"
              />
            </a>
            <a href={urlMail} target="_blank">
              <Image
                className="opacity-60 hover:opacity-100 ease-in-out duration-200"
                width={40}
                height={40}
                src={mail.src}
                alt="Mail"
              />
            </a>
            <a
              onClick={() => {
                CopyToClipboard(window.location.href);
              }}
              target="_blank"
            >
              <Image
                className="opacity-60 hover:opacity-100 ease-in-out duration-200 cursor-pointer"
                width={40}
                height={40}
                src={copyLink.src}
                alt="Compartir"
              />
            </a>
          </div>
        </div>
        <div className="flex md:hidden w-full border-y border-y-gray-d8 py-9">
          <div className="flex justify-around w-full items-center">
            Compartir:
            <a href={urlTwitter} target="_blank">
              <Image
                className="opacity-60 hover:opacity-100 ease-in-out duration-200"
                width={40}
                height={40}
                src={twitter.src}
                alt="Twitter"
              />
            </a>
            <a href={urlLinkedin} target="_blank">
              <Image
                className="opacity-60 hover:opacity-100 ease-in-out duration-200"
                width={40}
                height={40}
                src={linkedin.src}
                alt="Linkedin"
              />
            </a>
            <a href={urlWhatsApp} target="_blank">
              <Image
                className="opacity-60 hover:opacity-100 ease-in-out duration-200"
                width={40}
                height={40}
                src={whatsApp.src}
                alt="WhatsApp"
              />
            </a>
            <div className="relative">
              <a
                onClick={() =>
                  setIsMoreOptionsMobileVisible(!isMoreOptionsMobileVisible)
                }
              >
                <Image
                  className="opacity-60 hover:opacity-100 ease-in-out duration-200"
                  width={40}
                  height={40}
                  src={
                    isMoreOptionsMobileVisible
                      ? closeMoreShareOptions.src
                      : moreShareOptions.src
                  }
                  alt="More options"
                />
              </a>
              <div
                className={`${
                  isMoreOptionsMobileVisible
                    ? "opacity-100 top-[-500%] z-10"
                    : "opacity-0 top-[-300%] z-[-10]"
                } absolute grid gap-2 ease-in-out duration-200`}
              >
                <a href={urlFacebook} target="_blank">
                  <Image
                    width={40}
                    height={40}
                    src={facebook.src}
                    alt="Facebook"
                  />
                </a>
                <a href={urlTelegram} target="_blank">
                  <Image
                    width={40}
                    height={40}
                    src={telegram.src}
                    alt="Telegram"
                  />
                </a>
                <a href={urlMail} target="_blank">
                  <Image width={40} height={40} src={mail.src} alt="Mail" />
                </a>
                <a
                  onClick={() => {
                    CopyToClipboard(window.location.href);
                  }}
                  target="_blank"
                >
                  <Image
                    width={40}
                    height={40}
                    src={copyLink.src}
                    alt="Compartir"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
