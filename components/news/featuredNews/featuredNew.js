"use client"
import AutoresList from "@/components/commons/autoresList/AutoresList";
import Date from "@/components/commons/date/Date";
import Title from "@/components/commons/titles";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FeaturedNew({data}) {
    const router = useRouter()
    return <article
    className="hover:cursor-pointer"
    key={data.attributes.slug}
    onClick={() => router.push(`/news/${data.attributes.slug}`)}
  >
    <Image
      src={data.attributes.Imagen_Destacada?.data.attributes.url}
      width={1920}
      height={1080}
      alt={data.attributes.Titulo}
      priority
      onClick={() => router.push(`/news/${data.attributes.slug}`)}
    />
    <div className="textContent">
      <h6
        className="linkPerfil"
        onClick={() =>
          router.push(
            "/category/" +
              data.attributes.categoria?.data.attributes.Categoria
          )
        }
      >
        {data.attributes.categoria?.data.attributes.Categoria}
      </h6>
      <Title
        title={data.attributes.Titulo.replaceAll("#", "")}
        className="mb-2"
        fluid
      />
      <h5>
        <Date date={data.attributes.publishedAt} /> | Por{" "}
        <AutoresList autores={data.attributes.autores.data} />
      </h5>
      <p>{data.attributes.Bajada}</p>
    </div>
  </article>
}