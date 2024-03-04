import Image from "next/image";
import Container from "../commons/container/Container";

const MoreInfo = ({ title, personal, isPreWebinar }) => {
  return (
    <>
      {!isPreWebinar && (
        <Container className="mt-24 flex flex-col text-center md:text-start md:flex-row items-center justify-evenly shadow-xl rounded-xl py-12">
          <h1 className="font-gotham mb-5 font-bold text-[27px] leading-8">
            {title}
          </h1>
          <div>
            {personal.map((persona, idx) => (
              <div className="flex flex-col md:flex-row items-center gap-8" key={`moreInfo-personal-${persona.nombre}-${idx}`}>
                <Image
                  src={persona.image.data.attributes.url}
                  width={100}
                  height={100}
                  alt="imagen de persona"
                />
                <div className="grid items-center gap-1">
                  <h3 className="font-gotham font-bold text-l leading-6">
                    {persona.nombre}
                  </h3>
                  <span className="font-mulish text-m leading-5">
                    {persona.puesto}
                  </span>
                  <p className="text-s leading-4">W: {persona.whatsapp}</p>
                  <p className="text-s leading-4">T: {persona.tel}</p>
                  <p className="text-s leading-4">E: {persona.email}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      )}
    </>
  );
};

export default MoreInfo;
