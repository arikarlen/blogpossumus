export default function AutoresList({ autores }) {
  const lastAuthorAndPenultimateAuthor = (id) => {
    const lastPosition = autores.length - 1;
    return {
      lastAuthor: lastPosition === id,
      penultimateAuthor: lastPosition - 1 === id,
    };
  };

  const soleAuthor = autores.length === 1;
  return (
    <>
      {autores?.map((autor, idx) => {
        const { lastAuthor, penultimateAuthor } =
          lastAuthorAndPenultimateAuthor(idx);
        return (
          <a
            href={autor.attributes?.Perfiles?.Principal}
            target="_blank"
            className="linkPerfil"
            key={`${autor.attributes?.Nombre}-${idx}`}
          >
            {soleAuthor
              ? `${autor.attributes?.Nombre}`
              : lastAuthor
              ? ` ${
                  autor.attributes?.Nombre.charAt(0).toLowerCase() === "i"
                    ? "e"
                    : "y"
                } ${autor.attributes?.Nombre}`
              : penultimateAuthor
              ? `${autor.attributes?.Nombre}`
              : `${autor.attributes?.Nombre}, `}
          </a>
        );
      })}
    </>
  );
}
