import Container from "@/components/commons/container/Container";

export default function Loading(){
    return (
        <Container className="grid gap-5 pt-20 xs:pt-10 mb-5 animate-pulse">
          <div className="w-28 bg-gray dark:bg-gray-d8 rounded-md h-3"></div>
          <div className="flex flex-col gap-5 justify-center items-center">
              <div id="titulo" className="w-48 bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
              <div id="input" className="w-72 bg-gray dark:bg-gray-d8 rounded-xl h-8"></div>
          </div>
          <div id="subtitulo" className="w-36 bg-gray dark:bg-gray-d8 rounded-md h-4"></div>
          {new Array(5).fill("").map((e, idx)=>(
            <div className="flex flex-col md:flex-row flex-nowrap gap-3 w-full" key={`loading-webinars-${idx}`}>
            <div className="flex flex-col gap-3 md:w-3/4">
                <div id="titulo" className="bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
                <div id="titulo" className="w-2/4 bg-gray dark:bg-gray-d8 rounded-md h-5"></div>
                <div id="subtitle" className="w-2/4 bg-gray dark:bg-gray-d8 rounded-md h-3"></div>
                <div id="text" className="bg-gray dark:bg-gray-d8 rounded-md h-4"></div>
                <div id="text" className="bg-gray dark:bg-gray-d8 rounded-md h-4"></div>
            </div>
            <div id="image" className="md:w-1/4 bg-gray dark:bg-gray-d8 rounded-md h-40"></div>
          </div>
          ))}
        </Container>
      );
}