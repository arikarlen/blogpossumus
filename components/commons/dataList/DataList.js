import ListDataSkeleton from "@/components/skeletons/ListDataSkeleton";
import ListWebinars from "@/components/webinars/listWebinars";
import ListNews from "@/components/commons/newsList";
import ResultsNotFound from "../resultNotFound";
import Container from "../container/Container";
import { resetWebinars } from "app/[lang]/webinars/actions";
import { resetNews } from "app/[lang]/news/actions";
import { Suspense } from "react";
import { getDictionary } from "app/[lang]/dictionaries";

export default async function DataList({
  isWebinar,
  keyword,
  resultsNotFounded,
  lang,
}) {
  const dictionary = await getDictionary(lang);
  return (
    <Container>
      <h4>
        {isWebinar ? dictionary.webinars.results : dictionary.news.results}
      </h4>
      <Suspense fallback={<ListDataSkeleton />}>
        {resultsNotFounded ? (
          <ResultsNotFound
            keyword={keyword}
            resetFunction={isWebinar ? resetWebinars : resetNews}
          />
        ) : isWebinar ? (
          <ListWebinars lang={lang} />
        ) : (
          <ListNews lang={lang} />
        )}
      </Suspense>
    </Container>
  );
}
