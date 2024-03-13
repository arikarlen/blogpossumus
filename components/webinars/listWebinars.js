import Container from "@/components/commons/container/Container";
import { getWebinars } from "app/[lang]/webinars/actions";
import WebinarInList from "./webinarInList/webinarInList";

export default async function ListWebinars() {
  const { dataWebinars } = await getWebinars();
  return (
    <Container>
      {dataWebinars?.map(({ attributes }) => {
        const { webinarInfo, header, autores } = attributes;
        return (
          <WebinarInList
            webinarInfo={webinarInfo}
            header={header}
            autores={autores}
            key={webinarInfo?.slug}
          />
        );
      })}
    </Container>
  );
}
