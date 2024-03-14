import Container from "@/components/commons/container/Container";
import FeaturedWebinar from "./featuredWebinar";
import { Suspense } from "react";
import FeaturedUI from "@/components/skeletons/FeaturedUI";

export default async function FeaturedWebinars({lang}) {
  return (
    <>
      <Suspense fallback={<FeaturedUI />}>
        <Container>
          <FeaturedWebinar lang={lang}/>
        </Container>
      </Suspense>
    </>
  );
}
