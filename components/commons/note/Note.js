import styles from "./Note.module.css";
import { TrimText } from "../../../utils/functions";
import Link from "next/link";
import Date from "../date/Date";
import CustomImage from "../customImage/CustomImage";
import { motion } from "framer-motion";

export default function Note({ data }) {
  const noteAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1 },
    },
  };
  return (
    <motion.article
      variants={noteAnimation}
      initial="hidden"
      whileInView="visible"
      className={styles.note}
    >
      <Link href={`/news/${data.slug}`}>
        <CustomImage
          src={data.Imagen_Destacada.data.attributes.url}
          alt={data.Imagen_Destacada.data.attributes.name}
        />
        <h5>
          <Date date={data.fecha_publicacion} />
        </h5>
        <h2>{data.Titulo}</h2>
        {data.Bajada && <p>{TrimText(data.Bajada, 120)}</p>}
      </Link>
    </motion.article>
  );
}
