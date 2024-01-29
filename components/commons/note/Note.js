import moment from "moment";
import Image from "next/image";
import { Col } from "react-bootstrap";
import styles from "./Note.module.css";
import { TrimText } from "../../../utils/functions";
import Link from "next/link";

export default function Note({ data }) {
  return (
    <Col className={styles.note}>
      <>
        <Link href={`/news/${data.slug}`}>
          <Image
            src={data.Imagen_Destacada.data.attributes.url}
            alt={data.Imagen_Destacada.data.attributes.name}
            width="360"
            height="190"
          />
          <h5>
            {moment(data.fecha_publicacion).format("DD [de] MMMM [del] YYYY")}
          </h5>
          <h2>{data.Titulo}</h2>
          {data.Bajada && <p>{TrimText(data.Bajada, 120)}</p>}
        </Link>
      </>
    </Col>
  );
}
