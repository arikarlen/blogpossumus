import { Suspense } from "react";
import Container from "../../commons/container/Container";
import FeaturedNew from "./featuredNew";
import FeaturedUI from "@/components/skeletons/FeaturedUI";

export default async function FeaturedNews() {
  return (
    <>
      <Suspense fallback={<FeaturedUI />}>
        <Container>
          <FeaturedNew />
        </Container>
      </Suspense>
    </>
  );
}
