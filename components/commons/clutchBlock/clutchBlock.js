"use client";

import { useEffect, useState } from "react";

export default function ClutchBlock() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient && (
        <div
          className="clutch-widget"
          data-url="https://widget.clutch.co"
          data-widget-type="2"
          data-height="45"
          data-nofollow="true"
          data-expandifr="true"
          data-primary-color="#fcd702"
          data-secondary-color="#fcd702"
          data-clutchcompany-id="1572791"
          style={{ maxWidth: "200px" }}
        ></div>
      )}
    </>
  );
}
