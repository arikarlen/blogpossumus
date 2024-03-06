import ListDataSkeleton from "@/components/skeletons/ListDataSkeleton";
import ListWebinars from "@/components/webinars/listWebinars";
import ListNews from "@/components/commons/newsList";
import ResultsNotFound from "../resultNotFound";
import Container from "../container/Container";
import { resetWebinars } from "app/webinars/actions";
import { resetNews } from "app/news/actions";
import { Suspense } from "react";

export default function DataList({ isWebinar, keyword, resultsNotFounded }) {
  return (
    <Container>
      <h4>Resultados</h4>
      <Suspense fallback={<ListDataSkeleton />}>
        {resultsNotFounded ? (
          <ResultsNotFound
            keyword={keyword}
            resetFunction={isWebinar ? resetWebinars : resetNews}
          />
        ) : isWebinar ? (
          <ListWebinars />
        ) : (
          <ListNews />
        )}
      </Suspense>
    </Container>
  );
}
