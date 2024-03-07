import styles from "./Note.module.css";
import { TrimText } from "../../../utils/functions";
import Link from "next/link";
import Date from "../date/Date";
import CustomImage from "../customImage/CustomImage";

export default function Note({ data }) {
  return (
    <article className={styles.note}>
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
    </article>
  );
}
