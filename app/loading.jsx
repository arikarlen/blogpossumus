import Container from "@/components/commons/container/Container";

export default function Loading() {
  return (
    <Container className="grid gap-5 pt-20 xs:pt-10 mb-5 animate-pulse">
      <div id="title" className="w-40 bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
      <div id="image" className="w-full bg-gray dark:bg-gray-d8 rounded-md h-96"></div>
      <div id="subtitle" className="w-10 bg-gray dark:bg-gray-d8 rounded-md h-3"></div>
      <div id="text" className="w-full bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
      <div id="text" className="w-full bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
      <div id="text" className="w-40 bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="grid gap-3">
          <div id="image" className="w-full bg-gray dark:bg-gray-d8 rounded-md h-96"></div>
          <div id="subtitle" className="w-1/4 bg-gray dark:bg-gray-d8 rounded-md h-3"></div>
          <div id="text" className="w-full bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
          <div id="text" className="w-full bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
        </div>
        <div className="grid gap-3">
          <div id="image" className="w-full bg-gray dark:bg-gray-d8 rounded-md h-96"></div>
          <div id="subtitle" className="w-1/4 bg-gray dark:bg-gray-d8 rounded-md h-3"></div>
          <div id="text" className="w-full bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
          <div id="text" className="w-full bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
        </div>
      </div>
    </Container>
  );
}
