"use client";
import ReactMarkdown from "react-markdown";
import useImageModal from "../../../hooks/useImageModal";
import ImageModal from "../../commons/imageModal/ImageModal";
import { useRef } from "react";
import useCodeEmbedded from "../../../hooks/useCodeEmbedded";
import style from "./NewBody.module.css";

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
        <ReactMarkdown>{cuerpo || ""}</ReactMarkdown>
      </div>
    </>
  );
}
