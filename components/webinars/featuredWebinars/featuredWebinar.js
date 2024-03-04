import AutoresList from "@/components/commons/autoresList/AutoresList";
import Date from "@/components/commons/date/Date";
import Title from "@/components/commons/titles";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FeaturedWebinar({ data }) {
  const { webinarInfo, header, autores } = data;

  const router = useRouter()
  return (
    <div key={webinarInfo.slug}>
      <Image
        src={webinarInfo.image?.data.attributes.url}
        width={1080}
        height={532}
        alt={header.titulo}
        priority
        onClick={() => router.push(`/webinars/${webinarInfo.slug}`)}
        className="cursor-pointer"
      />
      <article
        className="textContent"
        onClick={() => router.push(`/webinars/${webinarInfo.slug}`)}
      >
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
    </div>
  );
}
