import { getWebinars } from "app/[lang]/webinars/actions";
import WebinarInList from "./webinarInList/webinarInList";
import { getDictionary } from "app/[lang]/dictionaries";

export default async function ListWebinars({ lang }) {
  const { dataWebinars } = await getWebinars(lang);
  const dictionary = await getDictionary(lang);
  return (
    <>
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
    </>
  );
}
