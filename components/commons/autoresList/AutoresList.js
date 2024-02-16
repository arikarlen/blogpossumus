export default function AutoresList({ autores }) {
  return (
    <>
      {autores?.map((autor, idx) => (
        <a
          href={autor.attributes?.Perfiles?.Principal}
          target="_blank"
          className="linkPerfil"
          key={`${autor.attributes?.Nombre}-${idx}`}
        >
          {autores.length - 1 === idx
            ? autor.attributes?.Nombre
            : `${autor.attributes?.Nombre}, `}
        </a>
      ))}
    </>
  );
}
