"use client";
import { useState } from "react";
import DownloadPdf from "./downloadPdf";
import Container from "../commons/container/Container";
import Button from "../commons/button/Button";
import Image from "next/image";
import Modal from "../commons/modal/Modal";

export default function PostWebinar({
  isPreWebinar,
  videoData,
  bannerBrochureData,
  downloadBrochureData,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const idVideo = "https://www.youtube.com/embed/" + videoData?.youtubeID;
  return (
    <>
      {!isPreWebinar && (
        <Container className="mt-24">
          <h1 className="text-center font-gotham font-bold !text-xl md:!text-[48px] md:!leading-10">
            {videoData.titulo}
          </h1>
          <iframe
            width="100%"
            height="400"
            src={idVideo}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="mt-8 rounded-md"
          ></iframe>
          <div className="flex flex-col md:flex-row items-center gap-5 mt-24 bg-light-gray py-6 md:px-12">
            <div className="md:w-6/12">
              <Image
                src={bannerBrochureData.imagen.data.attributes.url}
                alt="download webinar"
                width={400}
                height={200}
              />
            </div>
            <div className="md:w-6/12 grid justify-items-center md:justify-items-start items-center">
              <h1 className="font-bold text-m md:text-xl md:leading-10 text-center md:text-start">
                {bannerBrochureData.titulo}
              </h1>
              <Button
                text={bannerBrochureData.button.texto}
                variant="secondary"
                onClick={handleShow}
                fullWidth={false}
                className={`${
                  bannerBrochureData.button.hoverColor
                    ? `hover:text-[${bannerBrochureData.button.hoverColor}]`
                    : `hover:text-black`
                } font-gotham text-l`}
              />
            </div>
          </div>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header
              style={{
                backgroundImage: `url(${downloadBrochureData.backgroundImage.data.attributes.url})`,
              }}
              handleClose={handleClose}
            >
              <Modal.Title>{downloadBrochureData.titulo}</Modal.Title>
            </Modal.Header>
            <DownloadPdf
              file={downloadBrochureData.downloadFile.data.attributes.url}
            />
          </Modal>
        </Container>
      )}
    </>
  );
}
