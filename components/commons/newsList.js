import Container from "@/components/commons/container/Container";
import { getNews } from "app/[lang]/news/actions";
import NewInList from "../news/newInList/newInList";
import { getDictionary } from "app/[lang]/dictionaries";

export default async function ListNews({lang}) {
  const { dataNews } = await getNews();

  const dictionary = await getDictionary(lang)
  return (
    <Container>
      {dataNews.map((data) => (
        <NewInList dataNew={data} key={data.attributes.slug} tag={dictionary.home.listNewsTag}/>
      ))}
    </Container>
  );
}
