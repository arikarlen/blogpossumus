"use client";
import Container from "@/components/commons/container/Container";
import AutoresList from "@/components/commons/autoresList/AutoresList";
import Title from "@/components/commons/titles";
import SeeMoreButton from "@/components/commons/seeMoreButton";
import useSeeMore from "@/hooks/useSeeMore";
import { useRouter } from "next/navigation";
import Date from "../commons/date/Date";
import CustomImage from "../commons/customImage/CustomImage";
import { motion } from "framer-motion";
import Link from "next/link";

export default function GridWebinars({
  webinars,
  withSeeMoreButton = false,
  tag,
  lang,
}) {
  const [webinarsList, loadMoreWebinars, isLoadingMoreWebinars, message] =
    useSeeMore({
      initialData: webinars,
      initialMessage: lang === "en" ? "See more" : "Ver más webinars",
      type: "blog-webinars",
      lang: lang,
    });

  const router = useRouter();

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

  return (
    <>
      <Container className="grid md:grid-cols-2 gap-7 pt-12">
        {webinarsList?.map(({ attributes }) => {
          const { webinarInfo, header, autores } = attributes;
          return (
            <motion.article
              variants={animation}
              initial="hidden"
              whileInView="visible"
              key={webinarInfo.slug}
            >
              <Link href={`/${lang}/webinars/${webinarInfo.slug}`}>
                <CustomImage
                  src={webinarInfo.image?.data.attributes.url}
                  alt={header.titulo}
                />
              </Link>
              <div
                onClick={() => router.push(`/webinars/${webinarInfo.slug}`)}
                className="cursor-pointer"
              >
                <Link href={`/${lang}/webinars/${webinarInfo.slug}`}>
                  <Title
                    title={header.titulo.replaceAll("#", "")}
                    className="my-6"
                    fluid
                  />
                </Link>
                <h5>
                  <Date date={header.fecha} /> | {tag}
                  <AutoresList autores={autores.colaboradores.data} />
                </h5>
                <Link href={`/${lang}/webinars/${webinarInfo.slug}`}>
                  <p>{header.bajada}</p>
                </Link>
              </div>
            </motion.article>
          );
        })}
      </Container>
      <Container className="mb-28">
        {withSeeMoreButton && !message.disabled && (
          <SeeMoreButton
            isLoadingMoreData={isLoadingMoreWebinars}
            message={message}
            loadMoreData={loadMoreWebinars}
          />
        )}
      </Container>
    </>
  );
}
