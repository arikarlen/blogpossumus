import Container from "./container/Container";

export default function StartSearch() {
  return (
    <Container>
      <div className="resultNotFound">
        <p className="text-center">
          Ingrese las palabras por las que desea realizar la busqueda
        </p>
      </div>
    </Container>
  );
}
