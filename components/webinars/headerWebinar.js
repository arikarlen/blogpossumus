"use client";
import fCalendar from "../../assets/FCalendar.svg";
import fClock from "../../assets/FClock.svg";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "../commons/container/Container";
import Breadcrumb from "../commons/breadCrumb/BreadCrumb";
import Button from "../commons/button/Button";
import Image from "next/image";
import { motion } from "framer-motion";
export default function HeaderWebinar({ headerData, isPreWebinar }) {
  const {
    titulo,
    backgroundHeader,
    bajada,
    fecha,
    botonPreWebinar,
    botonPostWebinar,
    textoColor,
    iconFilter,
  } = headerData;

  const router = useRouter();

  const [screenWidth, setWidth] = useState(0);

  const headerButton = isPreWebinar ? botonPreWebinar : botonPostWebinar;

  const textContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const textAnimation = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  useEffect(() => setWidth(window.innerWidth), []);
  return (
    <Container
      fluid
      style={{
        position: "relative",
        backgroundImage: `url(${backgroundHeader.data.attributes.url})`,
        color: textoColor,
      }}
      className="lg:min-h-screen grid items-center bg-center lg:bg-right-bottom bg-cover bg-no-repeat lg:pb-96"
    >
      <Container className="pt-32">
        <Breadcrumb
          className="absolute top-20 xs:top-10"
          items={[
            {
              text: "Inicio",
              href: "/",
              active: false,
            },
            {
              text: "Webinars",
              href: "/webinars",
              active: false,
            },
            {
              text:
                screenWidth < 768
                  ? titulo.slice(0, 25).replaceAll("#", "") + "..."
                  : titulo.replaceAll("#", ""),
              href: null,
              active: true,
            },
          ]}
        />
        <motion.div variants={textContainer} initial="hidden" animate="visible" className="max-w-2xl">
          <motion.h1
            variants={textAnimation}
            className="!text-xl md:!text-3xl leading-none tracking-tighter	"
          >
            {titulo.replaceAll("#", "")}
          </motion.h1>
          <motion.p variants={textAnimation}>{bajada}</motion.p>
        </motion.div>
        {isPreWebinar && (
          <section>
            <div>
              <h2>
                <Image
                  style={{ filter: iconFilter ? iconFilter : null }}
                  src={fCalendar.src}
                  alt="Date"
                  width={30}
                  height={30}
                />{" "}
                {moment(fecha).format("D") +
                  " de " +
                  moment(fecha).format("MMMM ")}
              </h2>
            </div>
            <div>
              <h2>
                <Image
                  style={{ filter: iconFilter ? iconFilter : null }}
                  src={fClock.src}
                  alt="Date"
                  width={30}
                  height={30}
                />{" "}
                {moment.utc(fecha).format("HH:mm") + " H (GMT-3)"}
              </h2>
            </div>
          </section>
        )}
        <Container className="mb-10" fluid>
          <Button
            text={headerButton.texto}
            variant="webinar"
            onClick={() => router.push(headerButton.href)}
            className={`w-10/12 md:w-4/12`}
            styles={{
              hover: {
                backgroundColor: headerButton.hoverBackgroundColor,
                borderColor: headerButton.hoverBackgroundColor,
                color: headerButton.hoverColor,
              },
              default: {
                backgroundColor: headerButton.backgroundColor,
                borderColor: headerButton.backgroundColor,
                color: headerButton.color,
              },
            }}
          />
        </Container>
      </Container>
    </Container>
  );
}
