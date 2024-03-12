"use client";
import React, { Suspense } from "react";
import useNearScreen from "../../../hooks/useNearScreen";
import RelatedNewsSkeleton from "./relatedNewsSkeleton";
import styles from "./relatedNews.module.css";
import { motion } from "framer-motion";

const RelatedNews = React.lazy(() => import("./relatedNews"));

export default function LazyRelatedNews({ tags, title, actualNewTitle }) {
  const { isElementNearScreen, elementToObserveRef } = useNearScreen({
    distanceToElementToObserve: "0px",
  });

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

  return (
    <div ref={elementToObserveRef}>
      <div className={styles.container}>
        <h3>{title}</h3>
        <motion.div
          variants={containerAnimation}
          initial="hidden"
          whileInView="visible"
          className={styles.grid}
        >
          <Suspense fallback={<RelatedNewsSkeleton />}>
            {isElementNearScreen ? (
              <RelatedNews tags={tags} actualNewTitle={actualNewTitle} />
            ) : (
              <RelatedNewsSkeleton />
            )}
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
}
