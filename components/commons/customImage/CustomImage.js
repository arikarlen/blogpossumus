"use client";

import ImageUI from "@/components/skeletons/ImageUI";
import Image from "next/image";
import { useState } from "react";

export default function CustomImage({
  src,
  alt,
  className,
  widht = 1920,
  height = 1080,
}) {
  const [isImageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="flex flex-col flex-1">
      {!isImageLoaded && <ImageUI/>}
      <Image
        src={src}
        width={widht}
        height={height}
        alt={alt}
        className={`${
          !isImageLoaded ? "opacity-0 absolute" : "opacity-100 relative"
        } ${className}`}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}
