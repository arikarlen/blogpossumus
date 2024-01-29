import Image from "next/image";
import { Container } from "react-bootstrap";
import styles from "./ImageModal.module.css";
import closeIcon from "../../../assets/close-circle.png";
import { useState } from "react";
import { Loader } from "../loader/Loader";

export default function ImageModal({ data, handleModal }) {
  const [isImageLoading, setIsLoading] = useState(true);
  const handleKeyDown = (e) => {
    console.log(e);
  };

  return (
    <Container
      tabIndex={0}
      onKeyDown={handleKeyDown}
      fluid
      className={styles.background}
      onClick={() => handleModal(false)}
    >
      <Image
        id="close"
        alt="Close icon"
        src={closeIcon}
        width={35}
        height={35}
        className={styles.close}
        onClick={() => handleModal(false)}
      />

      {isImageLoading && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}

      <Image
        alt="Modal image"
        src={data?.src}
        width={data?.width}
        height={data?.height}
        onClick={() => null}
        onLoad={() => {
          setIsLoading(false)
        }}
      />
    </Container>
  );
}
