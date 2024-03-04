"use client";
import Container from "@/components/commons/container/Container";
import certificaction from "../../../assets/certification.svg";
import { useEffect, useState } from "react";
import Image from "next/image";

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
    <Container fluid className="bg-gray">
      <Container>
        <section className="flex lg:flex-row flex-col lg:justify-between justify-center items-center md:items-start pt-20 gap-5 lg:gap-0">
          {footerContent?.attributes.footer.options?.map((option, idx) => {
            return (
              <div className="flex flex-col justify-center lg:max-w-52 text-center lg:text-start" key={idx}>
                <p className="font-gotham font-bold text-m">{option.title}</p>
                {option.multipleOptions?.data.map((multipleOption) => (
                  <p
                    key={multipleOption.attributes.title}
                    className="font-s cursor-pointer duration-150 ease-in hover:opacity-80"
                  >
                    <a
                      href={`https://www.possumus.tech/es-es${multipleOption.attributes.href}`}
                      target="_blank"
                    >
                      {multipleOption.attributes.title}
                    </a>
                  </p>
                ))}
              </div>
            );
          })}
        </section>
        <section className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center py-20 gap-10 lg:gap-0">
          <div className="flex justify-center">
            <a href="https://possumus.tech/">
              <Image
                src={
                  dataInstitutional?.attributes.Assets.Logo_Alt.data.attributes
                    .url
                }
                alt="Possumus"
                width={200}
                height={100}
              />
            </a>
          </div>
          <div className="flex justify-center">
            <Image
              src={certificaction.src}
              alt="Possumus"
              width={260}
              height={130}
            />
          </div>
          <div className="flex justify-center min-w-52">
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
          </div>
          <div className="grid justify-center lg:min-w-60 text-center lg:text-start">
            <div>
              <p className="font-gotham font-bold text-m">Hablemos</p>
              <p className="font-s cursor-pointer duration-150 ease-in hover:opacity-80">
                <a href="tel: 08103450562">0810 345 0562</a>
              </p>
              <p className="font-s cursor-pointer duration-150 ease-in hover:opacity-80">
                <a href="mailto:info@possumus.tech">info@possumus.tech</a>
              </p>
            </div>
          </div>
        </section>
      </Container>
      <Container className="flex lg:flex-row flex-col-reverse gap-5 lg:gap-0 justify-between items-center border-t border-t-gray-d8 py-6">
        <div>
          <p className="text-s">
            Copyright © {year} Possumus. All Rigths Reserved.
          </p>
        </div>
        <div className="flex justify-end items-center gap-4">
          <h4>Join Us</h4>
          {footerContent?.attributes.footer.socials.map((social) => (
            <a href={social.href} target="_blank" key={social.href}>
              <Image
                width={40}
                height={40}
                className="hover:opacity-65 ease-in-out duration-700"
                src={social.image.data.attributes.url}
                alt={social.image.data.attributes.name}
              />
            </a>
          ))}
        </div>
      </Container>
    </Container>
  );
}
