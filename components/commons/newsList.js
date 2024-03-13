import Container from "@/components/commons/container/Container";
import { getNews } from "app/[lang]/news/actions";
import NewInList from "../news/newInList/newInList";

export default async function ListNews() {
  const { dataNews } = await getNews();

  return (
    <Container>
      {dataNews.map((data) => (
        <NewInList dataNew={data} key={data.attributes.slug} />
      ))}
    </Container>
  );
}
