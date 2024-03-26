import Container from "@/components/commons/container/Container";

export default function Loading(){
    return (
        <Container className="grid gap-5 pt-20 xs:pt-10 mb-5 animate-pulse">
          <div id="breadcrumb" className="w-58 bg-gray dark:bg-gray-d8 rounded-md h-5 pb-5"></div>
          <div id="megatitle" className="md:w-6/12 bg-gray dark:bg-gray-d8 rounded-xl h-16"></div>
          <div id="megatitle" className="md:w-6/12 bg-gray dark:bg-gray-d8 rounded-xl h-16"></div>
          <div id="megatitle" className="w-40 bg-gray dark:bg-gray-d8 rounded-xl h-16"></div>
          <div id="text" className="md:w-6/12 bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
          <div id="text" className="md:w-6/12 bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
          <div id="text" className="w-40 bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
          <div id="btn" className="w-40 bg-gray dark:bg-gray-d8 rounded-md h-16"></div>
        </Container>
      );
}