"use client";
import { motion } from "framer-motion";
import Container from "@/components/commons/container/Container";

const defaultAnimation = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.2,
    },
  },
};

export default function Title({
  title,
  className = "mb-6",
  fluid = false,
  animation = defaultAnimation,
}) {
  return (
    <Container className={className} fluid={fluid}>
      <motion.h1 variants={animation} initial="hidden" animate="visible">
        {title}
      </motion.h1>
    </Container>
  );
}
