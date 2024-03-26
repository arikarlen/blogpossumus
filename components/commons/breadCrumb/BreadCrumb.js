"use client";
import { Fragment, useEffect, useState } from "react";
import { TrimText } from "utils/functions";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function Breadcrumb({ items, className = "" }) {
  const [screenWidth, setScreenWidth] = useState(1800);

  const {lang} = useParams()

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

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);
  return (
    <motion.div
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
      className={`flex gap-2 ${className}`}
    >
      {items.map((item, idx) => (
        <Fragment key={`${item.text}-${idx}`}>
          <motion.a
            variants={itemAnimation}
            href={`/${lang}/${item.href}`}
            key={`${item.text}-${idx}`}
            className={`${
              item.active ? "font-mulish" : "font-bold"
            } hover:opacity-80`}
            onClick={() => item?.resetFunction() || null}
          >
            {screenWidth < 768 && item.active && item.text.length > 25
              ? TrimText(item.text, 25)
              : item.text}
          </motion.a>
          {items.length - 1 !== idx && "/"}
        </Fragment>
      ))}
    </motion.div>
  );
}
