import Image from "next/image";
import styles from "./Note.module.css";
import { TrimText } from "../../../utils/functions";
import Link from "next/link";
import Date from "../date/Date";

export default function Note({ data }) {
  return (
    <article className={styles.note}>
      <Link href={`/news/${data.slug}`}>
        <Image
          src={data.Imagen_Destacada.data.attributes.url}
          alt={data.Imagen_Destacada.data.attributes.name}
          width={1920}
          height={1080}
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
