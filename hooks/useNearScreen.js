"use client";
import { useEffect, useRef, useState } from "react";

export default function useNearScreen({
  distanceToElementToObserve = "200px",
}) {
  const [isElementNearScreen, setIsElementNearScreen] = useState(false);
  const elementToObserveRef = useRef()

  useEffect(() => {
    let observer;

    const onChange = (entries, observer) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setIsElementNearScreen(true);
        observer.disconnect();
      }
    };

    observer = new IntersectionObserver(onChange, {
      rootMargin: distanceToElementToObserve,
    });

    observer.observe(elementToObserveRef.current);

    // return observer && observer.disconnect();
  });

  return { isElementNearScreen, elementToObserveRef };
}
