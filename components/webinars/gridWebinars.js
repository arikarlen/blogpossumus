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

export default function GridWebinars({ webinars, withSeeMoreButton = false }) {
  const [webinarsList, loadMoreWebinars, isLoadingMoreWebinars, message] =
    useSeeMore({
      initialData: webinars,
      initialMessage: "Ver más webinars",
      type: "blog-webinars",
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
              onClick={() => router.push(`/webinars/${webinarInfo.slug}`)}
              className="cursor-pointer"
            >
              <CustomImage
                src={webinarInfo.image?.data.attributes.url}
                alt={header.titulo}
              />
              <div
                onClick={() => router.push(`/webinars/${webinarInfo.slug}`)}
                className="cursor-pointer"
              >
                <Title
                  title={header.titulo.replaceAll("#", "")}
                  className="my-6"
                  fluid
                />
                <h5>
                  <Date date={header.fecha} /> | {`Por: `}
                  <AutoresList autores={autores.colaboradores.data} />
                </h5>
                <p>{header.bajada}</p>
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
