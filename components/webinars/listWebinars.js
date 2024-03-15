import Container from "@/components/commons/container/Container";
import { getWebinars } from "app/[lang]/webinars/actions";
import WebinarInList from "./webinarInList/webinarInList";
import { getDictionary } from "app/[lang]/dictionaries";

export default async function ListWebinars({lang}) {
  const { dataWebinars } = await getWebinars();
  const dictionary = await getDictionary(lang)
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
            tag={dictionary.home.listNewsTag}
          />
        );
      })}
    </Container>
  );
}
