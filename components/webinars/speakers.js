"use client"
import Image from "next/image";
import Container from "../commons/container/Container";
import { motion } from "framer-motion";

export default function Speakers({ titulo, speakers }) {
  const containerAnimation = {
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

  const itemAnimation = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <Container className="flex flex-col w-10/12">
      <h4 className="!text-l leading-5 !font-bold mb-16 w-full">{titulo}</h4>
      <motion.div
        variants={containerAnimation}
        initial="hidden"
        whileInView="visible"
        className="grid gap-10 md:grid-cols-2"
      >
        {speakers.data.map((speaker) => (
          <motion.article
            variants={itemAnimation}
            key={speaker.attributes?.Nombre}
            className="flex items-center gap-4"
          >
            <Image
              src={speaker.attributes?.Imagen.data[0].attributes?.url}
              alt="webinar speaker"
              width={300}
              height={300}
              className="max-w-[100px] md:max-w-[150px]"
            />
            <div>
              <h2 className="!font-gotham font-bold text-m md:!text-l">
                {speaker.attributes?.Nombre}
              </h2>
              <h3 className="!font-[gotham-book] !text-s md:!text-[19px] !font-light">
                {speaker.attributes?.puesto?.data?.attributes?.Puesto},
                <br /> Possumus
              </h3>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Container>
  );
}
