import ListDataSkeleton from "@/components/skeletons/ListDataSkeleton";
import ListWebinars from "@/components/webinars/listWebinars";
import ListNews from "@/components/commons/newsList";
import ResultsNotFound from "../resultNotFound";
import StartSearch from "../startSearch";
import Container from "../container/Container";
import { resetWebinars } from "app/webinars/actions";
import { resetNews } from "app/news/actions";

export default function DataList({ data, isLoading, isWebinar, keyword, resultsNotFounded }) {
  
  return (
    <Container>
      {isLoading ? (
        <>
          <ListDataSkeleton />
        </>
      ) : data ? (
        resultsNotFounded ? (
          <ResultsNotFound keyword={keyword} resetFunction={isWebinar ? resetWebinars : resetNews}/>
        ) : isWebinar ? (
          <ListWebinars webinarsData={data} title="Resultados" />
        ) : (
          <ListNews dataNews={data} title="Resultados" type="news" />
        )
      ) : (
        <StartSearch />
      )}
    </Container>
  );
}
