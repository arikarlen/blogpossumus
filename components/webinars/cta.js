import Container from "../commons/container/Container";

export default function Cta({ titulo, backgroundImage, textoColor }) {
  return (
    <Container
      style={{
        backgroundImage: `url(${backgroundImage.url})`,
        color: textoColor,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
      className="py-16 px-12 mt-24"
      id="cta"
    >
      <h2 className="!font-gotham !text-l md:!text-[32px] md:!leading-9 !font-bold text-center">{titulo}</h2>
    </Container>
  );
}
