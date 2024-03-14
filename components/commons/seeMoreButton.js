import Container from "@/components/commons/container/Container";
import { Loader } from "@/components/commons/loader/Loader";
import Button from "./button/Button";

export default function SeeMoreButton({
  isLoadingMoreData,
  message,
  loadMoreData
}) {
  return (
    <>
      {isLoadingMoreData && <Loader />}
      <Container className="pt-28 pb-7 border-b border-b-gray-d8">
        <div>
          <article className="flex justify-center">
            {" "}
            <Button
              text={message.text}
              variant="primary"
              onClick={loadMoreData}
              disabled={message.disabled}
            />
          </article>
        </div>
      </Container>
    </>
  );
}
