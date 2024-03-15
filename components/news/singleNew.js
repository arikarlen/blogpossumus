"use client";
import ShareNews from "./share";
import DownloadPdf from "./downloadPdf";
import NewBody from "./newBody/newBody";
import RelatedNews from "./relatedNews";
import Date from "../commons/date/Date";
import AutoresList from "../commons/autoresList/AutoresList";
import Container from "../commons/container/Container";
import Breadcrumb from "../commons/breadCrumb/BreadCrumb";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import useDictionary from "@/hooks/useDictionary";

export default function SingleNew({ singleNew, absoluteUrl }) {
  const textContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const textAnimation = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  const { lang } = useParams();

  const dictionary = useDictionary(lang);

  return (
    <>
      <Container className="pt-32 xs:pt-20 relative">
        <Breadcrumb
          className="absolute top-20 xs:top-10 left-5 xl:left-0 overflow-hidden"
          items={[
            {
              text: dictionary.commons.breadCrumb.home,
              href: "/",
              active: false,
            },
            {
              text: "News",
              href: "/news",
              active: false,
            },
            {
              text: singleNew?.Titulo,
              href: null,
              active: true,
            },
          ]}
        />
      </Container>
      <Container className="w-10/12 md:w-7/12 pt-5">
        <motion.div variants={textContainer} initial="hidden" animate="visible">
          <motion.h6
            variants={textAnimation}
            className="font-mulish text-m leading-5"
          >
            {singleNew?.categoria?.data.attributes.Categoria}
          </motion.h6>
          <motion.h1
            variants={textAnimation}
            className="font-gotham font-bold text-xl md:text-3xl md:leading[82px]"
          >
            {singleNew?.Titulo}
          </motion.h1>
          <motion.h5 variants={textAnimation} className="my-5">
            <Date date={singleNew?.fecha_publicacion} /> | {dictionary.home.listNewsTag}{" "}
            <AutoresList autores={singleNew?.autores?.data} />
          </motion.h5>
          <motion.p variants={textAnimation} className="mb-5">
            {singleNew?.Bajada}
          </motion.p>
        </motion.div>
        <Image
          src={singleNew?.Imagen_Destacada.data?.attributes.url}
          alt={singleNew?.Titulo}
          width={1920}
          height={1080}
        />
        <NewBody cuerpo={singleNew?.cuerpo} />
        <div id="downloadPdf" className="text-center">
          <div>
            {singleNew?.descarga?.data == null ? (
              ""
            ) : (
              <DownloadPdf
                file={singleNew?.descarga?.data.attributes.url}
                source={singleNew?.Titulo}
                backGroundImage={singleNew?.img_descarga?.data.attributes.url}
              />
            )}
          </div>
        </div>
        <ShareNews
          absoluteUrl={absoluteUrl}
          title={singleNew?.Titulo}
          subTitle={singleNew?.Bajada}
        />
        <RelatedNews
          tags={singleNew?.tags}
          title={dictionary.commons.relatedNews.title}
          actualNewTitle={singleNew?.Titulo}
        />
      </Container>
    </>
  );
}
