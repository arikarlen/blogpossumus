"use client";
import ShareNews from "./share";
import DownloadPdf from "./downloadPdf";
import NewBody from "./newBody/newBody";
import RelatedNews from "./relatedNews";
import Date from "../commons/date/Date";
import AutoresList from "../commons/autoresList/AutoresList";
import Container from "../commons/container/Container";
import Breadcrumb from "../commons/breadCrumb/BreadCrumb";
import Image from "next/image";

export default function SingleNew({ singleNew, absoluteUrl }) {
  return (
    <>
      <Container className="pt-32 xs:pt-20 relative">
        <Breadcrumb
          className="absolute top-20 xs:top-10 left-5 xl:left-0 overflow-hidden"
          items={[
            {
              text: "Inicio",
              href: "/",
              active: false,
            },
            {
              text: "News",
              href: "/news",
              active: false,
            },
            {
              text: singleNew.Titulo,
              href: null,
              active: true,
            },
          ]}
        />
      </Container>
      <Container className="w-10/12 md:w-7/12 pt-5">
        <div>
          <h6 className="font-mulish text-m leading-5">
            {singleNew?.categoria?.data.attributes.Categoria}
          </h6>
          <h1 className="font-gotham font-bold text-xl md:text-3xl md:leading[82px]">
            {singleNew?.Titulo}
          </h1>
          <h5 className="my-5">
            <Date date={singleNew?.fecha_publicacion} /> | Por{" "}
            <AutoresList autores={singleNew?.autores?.data} />
          </h5>
          <p className="mb-5">{singleNew?.Bajada}</p>
          <Image
            src={singleNew?.Imagen_Destacada.data?.attributes.url}
            alt={singleNew?.Titulo}
            width={1920}
            height={1080}
          />
          <NewBody cuerpo={singleNew?.cuerpo} />
          <div id="downloadPdf" className="text-center">
            <div>
              {singleNew?.descarga?.data == null ? (
                ""
              ) : (
                <DownloadPdf
                  file={singleNew?.descarga?.data.attributes.url}
                  source={singleNew?.Titulo}
                  backGroundImage={singleNew?.img_descarga?.data.attributes.url}
                />
              )}
            </div>
          </div>
          <ShareNews
            absoluteUrl={absoluteUrl}
            title={singleNew?.Titulo}
            subTitle={singleNew?.Bajada}
          />
          <RelatedNews
            tags={singleNew?.tags}
            title="Notas relacionadas"
            actualNewTitle={singleNew?.Titulo}
          />
        </div>
      </Container>
    </>
  );
}
