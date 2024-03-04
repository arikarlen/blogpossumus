"use client";
import Container from "@/components/commons/container/Container";
import AutoresList from "@/components/commons/autoresList/AutoresList";
import Title from "@/components/commons/titles";
import SeeMoreButton from "@/components/commons/seeMoreButton";
import useSeeMore from "@/hooks/useSeeMore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Date from "../commons/date/Date";

export default function GridWebinars({ webinars, withSeeMoreButton = false }) {
  const [webinarsList, loadMoreWebinars, isLoadingMoreWebinars, message] =
    useSeeMore({
      initialData: webinars,
      initialMessage: "Ver más webinars",
      type: "blog-webinars",
    });

  const router = useRouter();

  return (
    <>
      <Container className="grid md:grid-cols-2 gap-7 pt-12">
        {webinarsList?.map(({ attributes }) => {
          const { webinarInfo, header, autores } = attributes;
          return (
            <article key={webinarInfo.slug}>
              <Image
                src={webinarInfo.image?.data.attributes.url}
                alt={header.titulo}
                width={1920}
                height={1080}
                onClick={() => router.push(`/webinars/${webinarInfo.slug}`)}
                className="cursor-pointer"
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
                  <Date date={header.fecha}/> |{" "}
                  {`Por: `}
                  <AutoresList autores={autores.colaboradores.data} />
                </h5>
                <p>{header.bajada}</p>
              </div>
            </article>
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
