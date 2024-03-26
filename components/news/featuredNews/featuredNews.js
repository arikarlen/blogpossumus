import { Suspense } from "react";
import Container from "../../commons/container/Container";
import FeaturedNew from "./featuredNew";
import FeaturedUI from "@/components/skeletons/FeaturedUI";

export default async function FeaturedNews({lang}) {
  return (
    <>
      <Suspense fallback={<FeaturedUI />}>
        <Container>
          <FeaturedNew lang={lang}/>
        </Container>
      </Suspense>
    </>
  );
}
