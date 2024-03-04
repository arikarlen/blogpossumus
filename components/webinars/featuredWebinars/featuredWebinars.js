import Container from "@/components/commons/container/Container";
import FeaturedWebinar from "./featuredWebinar";
import fetcher from "utils/fetcher";

export default async function FeaturedWebinars() {
  const URLWEBINARSDESTACADA = `${process.env.NEXT_PUBLIC_API}/blog-webinars?populate=deep&filters[webinarInfo][preWebinar][$eq]=true&pagination[page]=0&pagination[pageSize]=4`;
  const { data: dataWebinarsInPreWebinar } = await fetcher(
    URLWEBINARSDESTACADA,
    3600
  );
  return (
    <>
      {dataWebinarsInPreWebinar.length > 0 && (
        <Container>
          {dataWebinarsInPreWebinar?.map(({ attributes }, idx) => {
            <FeaturedWebinar data={attributes} key={idx}/>;
          })}
        </Container>
      )}
    </>
  );
}
