"use client";
import AutoresList from "@/components/commons/autoresList/AutoresList";
import CustomImage from "@/components/commons/customImage/CustomImage";
import Date from "@/components/commons/date/Date";
import Title from "@/components/commons/titles";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NewInList({ dataNew }) {
  const animation = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
        duration: 0.2,
      },
    },
  };
  return (
    <motion.article
      variants={animation}
      initial="hidden"
      whileInView="visible"
      className="flex flex-col md:flex-row gap-8 justify-between items-center border-b border-b-gray-d8 pb-3 cursor-pointer md:hover:scale-101 md:hover:shadow-md duration-300 ease-in-out"
    >
      <div>
        <h6 className="mt-6">
          {dataNew.attributes.categoria?.data.attributes.Categoria}
        </h6>
        <Link href={`/news/${dataNew.attributes.slug}`}>
          <Title
            title={dataNew.attributes.Titulo.replaceAll("#", "")}
            className="mb-2"
            fluid
          />
        </Link>
        {/* se remplazan los # porque este campo viene desde un tipo ricktext en Strapi */}
        <h5>
          <Date date={dataNew.attributes.publishedAt} /> | Por{" "}
          <AutoresList autores={dataNew.attributes?.autores.data} />
        </h5>

        <p>{dataNew.attributes.Bajada}</p>
      </div>
      <div className="md:max-w-60">
        <Link href={`/news/${dataNew.attributes.slug}`}>
          <CustomImage
            src={dataNew.attributes.Imagen_Destacada.data?.attributes.url}
            alt={dataNew.attributes.Titulo.replaceAll("#", "")}
          />
        </Link>
      </div>
    </motion.article>
  );
}
