"use client"
import React, { Suspense, useRef } from "react";
import useNearScreen from "../../../hooks/useNearScreen";
import RelatedNewsSkeleton from "./relatedNewsSkeleton";
import { Col, Row } from "react-bootstrap";
import styles from "./relatedNews.module.css";

const RelatedNews = React.lazy(() => import("./relatedNews"));

export default function LazyRelatedNews({ tags, title, actualNewTitle }) {
  const { isElementNearScreen, elementToObserveRef } = useNearScreen({
    distanceToElementToObserve: "0px",
  });

  return (
    <div ref={elementToObserveRef}>
      <Row className={styles.container}>
        <Col md={{ span: 8, offset: 2 }}>
          <h3>{title}</h3>
          <Row className={styles.grid}>
            <Suspense fallback={<RelatedNewsSkeleton />}>
              {isElementNearScreen ? (
                <RelatedNews tags={tags} actualNewTitle={actualNewTitle}/>
              ) : (
                <RelatedNewsSkeleton />
              )}
            </Suspense>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
