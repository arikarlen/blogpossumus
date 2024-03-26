"use client";
import { useRouter } from "next/navigation";
import useSeeMore from "@/hooks/useSeeMore";
import AutoresList from "@/components/commons/autoresList/AutoresList";
import Container from "@/components/commons/container/Container";
import Title from "@/components/commons/titles";
import SeeMoreButton from "@/components/commons/seeMoreButton";
import Date from "../commons/date/Date";
import CustomImage from "../commons/customImage/CustomImage";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ListNews({
  dataNews,
  type,
  tag,
  lang,
  withSeeMoreButton = false,
}) {
  const [news, loadMoreNews, isLoadingMoreNotes, message] = useSeeMore({
    initialData: dataNews,
    initialMessage: lang === "en" ? "See more" : "Ver más notas",
    type: `${type.replaceAll("/", "").replaceAll("news", "blogs")}`,
    lang: lang,
  });

  const animation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delayChildren: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const router = useRouter();

  return (
    <>
      <Container className="grid md:grid-cols-2 gap-7 pt-12">
        {news.map((data) => (
          <motion.article
            variants={animation}
            initial="hidden"
            whileInView="visible"
            className="cursor-pointer"
            key={data.attributes.slug}
          >
            <CustomImage
              src={data.attributes.Imagen_Destacada?.data.attributes.url}
              alt={data.attributes.Titulo}
            />

            <div className="hover:cursor-pointer">
              <Link href={`/${lang}/news/${data.attributes.slug}`}>
                <h6
                  onClick={() =>
                    router.push(
                      "/category/" +
                        data.attributes.categoria?.data.attributes.Categoria
                    )
                  }
                >
                  {data.attributes.categoria?.data.attributes.Categoria}
                </h6>
              </Link>
              <Link href={`/${lang}/news/${data.attributes.slug}`}>
                <Title
                  title={data.attributes.Titulo.replaceAll("#", "")}
                  fluid
                />
              </Link>
              <h5>
                <Date date={data.attributes.fecha_publicacion} /> | {tag}
                <AutoresList autores={data.attributes.autores.data} />
              </h5>
              <Link href={`/${lang}/news/${data.attributes.slug}`}>
                <p>{data.attributes.Bajada}</p>
              </Link>
            </div>
          </motion.article>
        ))}
      </Container>
      {withSeeMoreButton && !message.disabled && (
        <>
          <SeeMoreButton
            isLoadingMoreData={isLoadingMoreNotes}
            message={message}
            loadMoreData={loadMoreNews}
          />
        </>
      )}
    </>
  );
}
