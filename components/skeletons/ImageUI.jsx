import Container from "../commons/container/Container";

export default function ImageUI() {
  return (
    <Container fluid className="mb-5 animate-pulse mt-0">
      <div
        id="image"
        className="w-full bg-gray dark:bg-gray-d8 rounded-s aspect-video min-h-32 max-h-60"
      ></div>
    </Container>
  );
}
