import Container from "@/components/commons/container/Container";

export default function Loading(){
    return <Container className="grid gap-5 pt-20 xs:pt-10 mb-5 animate-pulse">
        <div id="breadcrumb" className="w-4/12 bg-gray dark:bg-gray-d8 rounded-md h-5 pb-5"></div>
        <Container className="w-10/12 md:7/12 flex flex-col gap-1 pt-5">
            <div id="category" className="w-20 bg-gray dark:bg-gray-d8 rounded-xl h-5"></div>
            <div id="title" className="w-full bg-gray dark:bg-gray-d8 rounded-xl h-6"></div>
            <div id="title" className="w-full bg-gray dark:bg-gray-d8 rounded-xl h-6"></div>
            <div id="date" className="w-10/12 bg-gray dark:bg-gray-d8 rounded-md h-4 my-4"></div>
            <div id="text" className="w-full bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
            <div id="imagen" className="w-full bg-gray dark:bg-gray-d8 rounded-md h-96 my-4"></div>
            <div id="text" className="w-full bg-gray dark:bg-gray-d8 rounded-md h-5 my-2"></div>
            <div id="text" className="w-full bg-gray dark:bg-gray-d8 rounded-md h-5 my-2"></div>
            <div id="text" className="w-full bg-gray dark:bg-gray-d8 rounded-md h-5 my-2"></div>
            <div id="text" className="w-6/12 bg-gray dark:bg-gray-d8 rounded-md h-5 my-2"></div>
        </Container>
  </Container>
}