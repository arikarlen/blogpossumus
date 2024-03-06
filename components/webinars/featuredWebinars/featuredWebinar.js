import AutoresList from "@/components/commons/autoresList/AutoresList";
import Date from "@/components/commons/date/Date";
import Title from "@/components/commons/titles";
import { fetchFeatured } from "app/actions";
import Image from "next/image";
import Link from "next/link";

export default async function FeaturedWebinar() {
  const URLWEBINARSDESTACADA = `${process.env.NEXT_PUBLIC_API}/blog-webinars?populate=deep&filters[webinarInfo][preWebinar][$eq]=true&pagination[page]=0&pagination[pageSize]=4`;
  const data = await fetchFeatured(URLWEBINARSDESTACADA, 3600);
  if(!data) return
  const { webinarInfo, header, autores } = data;

  return (
    <div key={webinarInfo.slug}>
      <Link href={`/webinars/${webinarInfo.slug}`}>
        <Image
          src={webinarInfo.image?.data.attributes.url}
          width={1080}
          height={532}
          alt={header.titulo}
          priority
          className="cursor-pointer"
        />
        <article className="textContent">
          <Title
            title={header.titulo.replaceAll("#", "")}
            className="cursor-pointer mb-2"
            fluid
          />
          <h5>
            <Date date={header.fecha} /> | Por{" "}
            <AutoresList autores={autores.colaboradores.data} />
          </h5>
          <p className="cursor-pointer">{header.bajada}</p>
        </article>
      </Link>
    </div>
  );
}
