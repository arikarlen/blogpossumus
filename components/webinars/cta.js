"use client";
import Container from "../commons/container/Container";
import { motion } from "framer-motion";

export default function Cta({ titulo, backgroundImage, textoColor }) {
  return (
    <Container
      style={{
        backgroundImage: `url(${backgroundImage.url})`,
        color: textoColor,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="py-16 px-12 mt-24"
      id="cta"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, duration: 0.8 }}
        className="!font-gotham !text-l md:!text-[32px] md:!leading-9 !font-bold text-center"
      >
        {titulo}
      </motion.h2>
    </Container>
  );
}
