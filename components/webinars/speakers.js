import Image from "next/image";
import Container from "../commons/container/Container";

export default function Speakers({ titulo, speakers }) {
  return (
    <Container className="flex flex-col w-10/12">
      <h4 className="!text-l leading-5 !font-bold mb-16 w-full">{titulo}</h4>
        <div className="grid gap-10 md:grid-cols-2">
          {speakers.data.map((speaker) => (
            <article
              key={speaker.attributes?.Nombre}
              className="flex items-center gap-4"
            >
              <Image
                src={speaker.attributes?.Imagen.data[0].attributes?.url}
                alt="webinar speaker"
                width={300}
                height={300}
                className="max-w-[100px] md:max-w-[150px]"
              />
              <div>
                <h2 className="!font-gotham font-bold text-m md:!text-l">
                  {speaker.attributes?.Nombre}
                </h2>
                <h3 className="!font-[gotham-book] !text-s md:!text-[19px] !font-light">
                  {speaker.attributes?.puesto?.data?.attributes?.Puesto},
                  <br /> Possumus
                </h3>
              </div>
            </article>
          ))}
        </div>
    </Container>
  );
}
