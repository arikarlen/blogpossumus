"use client";
import AutoresList from "@/components/commons/autoresList/AutoresList";
import CustomImage from "@/components/commons/customImage/CustomImage";
import Date from "@/components/commons/date/Date";
import Title from "@/components/commons/titles";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WebinarInList({ webinarInfo, header, autores }) {
  const animation = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
        duration: 0.8,
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
        <Link href={`/webinars/${webinarInfo.slug}`}>
          <Title
            title={header?.titulo.replaceAll("#", "")}
            className="mt-6 mb-2"
            fluid
          />
        </Link>
        {/* se remplazan los # porque este campo viene desde un tipo ricktext en Strapi */}
        <h5>
          <Date date={header?.fecha} /> | Por{" "}
          <AutoresList autores={autores.colaboradores?.data} />
        </h5>

        <p>{header?.bajada}</p>
      </div>
      <div className="md:max-w-60">
        <Link href={`/webinars/${webinarInfo.slug}`}>
          <CustomImage
            src={webinarInfo?.image?.data?.attributes.url}
            alt={header?.titulo}
          />
        </Link>
      </div>
    </motion.article>
  );
}
