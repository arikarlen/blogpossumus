import Container from "@/components/commons/container/Container";
import certificaction from "../../../assets/certification.svg";
import Image from "next/image";
import ClutchBlock from "../clutchBlock/clutchBlock";
import fetcher from "utils/fetcher";

export default async function Footer() {
  const URLFOOTERCONTENT = `${process.env.NEXT_PUBLIC_API}/page-web-layout?populate=deep&locale=es`;
  const URLINSTITUCIONAL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt`;

  const { data: dataInstitutional } = await fetcher(URLINSTITUCIONAL);
  const { data: footerContent } = await fetcher(URLFOOTERCONTENT);
  const tel = "tel: " + dataInstitutional?.data?.attributes.Contacto.telefono;
  const mailto = "mailto:" + dataInstitutional?.data?.attributes.Contacto.Email;

  let newDate = new Date();
  let year = newDate.getFullYear();

  return (
    <Container fluid className="bg-gray">
      <Container>
        <section className="flex lg:flex-row flex-col lg:justify-between justify-center items-center md:items-start pt-20 gap-5 lg:gap-0">
          {footerContent?.attributes.footer.options?.map((option, idx) => {
            return (
              <div
                className="flex flex-col justify-center lg:max-w-52 text-center lg:text-start"
                key={idx}
              >
                <h3 className="font-bold text-m leading-6 mb-2">{option.title}</h3>
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
          <div className="flex items-center justify-center min-w-52">
            <ClutchBlock />
          </div>
          <div className="flex justify-center">
            <Image
              src={certificaction.src}
              alt="Possumus"
              width={260}
              height={130}
            />
          </div>
          <div className="grid justify-center lg:min-w-60 text-center lg:text-start">
            <div>
              <h3 className="font-bold text-m leading-6 mb-2">Hablemos</h3>
              <p className="font-s cursor-pointer duration-150 ease-in hover:opacity-80">
                <a href={tel}>0810 345 0562</a>
              </p>
              <p className="font-s cursor-pointer duration-150 ease-in hover:opacity-80">
                <a href={mailto}>info@possumus.tech</a>
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
