import Container from "../commons/container/Container";

export default function FeaturedUI(){
    return <Container className="grid gap-5 pt-10 xs:pt-0 mb-5 animate-pulse mt-0">
    <div id="image" className="w-full bg-gray dark:bg-gray-d8 rounded-md h-96"></div>
    <div id="subtitle" className="w-10 bg-gray dark:bg-gray-d8 rounded-md h-3"></div>
    <div id="text" className="w-full bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
    <div id="text" className="w-full bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
    <div id="text" className="w-40 bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
  </Container>
}