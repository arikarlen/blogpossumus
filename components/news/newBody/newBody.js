"use client";
import Markdown from "react-markdown";
import useImageModal from "../../../hooks/useImageModal";
import ImageModal from "../../commons/imageModal/ImageModal";
import { useRef } from "react";
import useCodeEmbedded from "../../../hooks/useCodeEmbedded";
import style from "./NewBody.module.css";
import remarkGfm from "remark-gfm";

export default function NewBody({ cuerpo }) {
  const bodyRef = useRef();
  const { imageData, setImageData } = useImageModal(bodyRef);
  useCodeEmbedded();
  return (
    <>
      {imageData.active && (
        <ImageModal data={imageData} handleModal={setImageData} />
      )}
      <div className={style.newsContent} ref={bodyRef}>
        <Markdown remarkPlugins={[remarkGfm]}>{cuerpo}</Markdown>
      </div>
    </>
  );
}
