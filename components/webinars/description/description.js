import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Container from "../../commons/container/Container";
import styles from './description.module.css'

export default function Description({ isPreWebinar, descriptionData }) {
  const { preWebinar, postWebinar, imagen } = descriptionData;
  return (
    <Container className="grid justify-center mt-24">
        <ReactMarkdown className={styles.markdown}>
          {isPreWebinar ? preWebinar : postWebinar}
        </ReactMarkdown>
        <Image
          src={imagen.data.attributes.url}
          width={350}
          height={350}
          className="my-8 mx-auto"
          alt="Ilustración de la descripción"
        />
    </Container>
  );
}
