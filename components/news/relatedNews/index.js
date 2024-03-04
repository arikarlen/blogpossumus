"use client";
import React, { Suspense } from "react";
import useNearScreen from "../../../hooks/useNearScreen";
import RelatedNewsSkeleton from "./relatedNewsSkeleton";
import styles from "./relatedNews.module.css";

const RelatedNews = React.lazy(() => import("./relatedNews"));

export default function LazyRelatedNews({ tags, title, actualNewTitle }) {
  const { isElementNearScreen, elementToObserveRef } = useNearScreen({
    distanceToElementToObserve: "0px",
  });

  return (
    <div ref={elementToObserveRef}>
      <div className={styles.container}>
        <h3>{title}</h3>
        <div className={styles.grid}>
          <Suspense fallback={<RelatedNewsSkeleton />}>
            {isElementNearScreen ? (
              <RelatedNews tags={tags} actualNewTitle={actualNewTitle} />
            ) : (
              <RelatedNewsSkeleton />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
