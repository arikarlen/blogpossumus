import { useOutsideListener } from "@/hooks/useOutsideListener";
import { cva } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { TrimText } from "utils/functions";

const articlesStyles = cva(
  "absolute top-full left-0 bg-white rounded-b-md shadow-md max-h-80",
  {
    variants: {
      variant: {
        search: "overflow-y-scroll",
        recommended: "py-5 px-2 text-center",
      },
    },
    defaultVariants: {
      variant: "search",
    },
  }
);

export default function SearchArticles({ items, resetSearch, variant }) {
  const actualSearchRef = useRef(null);

  const { lang } = useParams();

  useOutsideListener(actualSearchRef, resetSearch);
  return (
    <aside className={articlesStyles({ variant })} ref={actualSearchRef}>
      {variant === "recommended" && (
        <h3 className="!leading-5 !text-[17px]">
          {lang === "en"
            ? "No results were found but we recommend:"
            : "No se encontraron resultados pero te recomendamos:"}
        </h3>
      )}
      {items.map((search) => (
        <>
          {variant === "search" ? (
            <Link
              key={search.attributes.slug}
              className="block hover:bg-gray-d8 p-4 border-b border-b-gray-d8"
              href={`/news/${search.attributes.slug}`}
              onClick={resetSearch}
            >
              {search.attributes.Titulo}
            </Link>
          ) : (
            <Link
              key={search.attributes.slug}
              className="block hover:bg-gray-d8 p-4 border-b border-b-gray-d8 text-start"
              href={`/news/${search.attributes.slug}`}
              onClick={resetSearch}
            >
              <Image
                src={search.attributes.Imagen_Destacada.data.attributes.url}
                alt={search.attributes.Titulo}
                width={1820}
                height={1080}
              />
              {TrimText(search.attributes.Titulo, 50)}
            </Link>
          )}
        </>
      ))}
    </aside>
  );
}
