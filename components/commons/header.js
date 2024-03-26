"use client";
import Image from "next/image";
import LogoBlack from "../../assets/LogoBlack.svg";
import SearchButton from "./searchButton/searchButton";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import Container from "@/components/commons/container/Container";
import SwitchLang from "./switchLang/switchLang";

export default function Header() {
  const pathname = usePathname();

  const { lang } = useParams();

  const isWebinar = pathname.includes("webinars");

  return (
    <nav
      className={`fixed top-0 left-[-7px] w-screen py-5 xl:px-0 bg-white z-10 shadow-md`}
    >
      <Container className="flex justify-between">
        <ul>
          <li className="flex gap-3">
            <Link
              href={lang ? `/${lang}/` : "/"}
              className="flex pr-3 items-center border-r-2 border-gray-800"
            >
              <Image src={LogoBlack} width={180} height={32} alt="Possumus" />{" "}
            </Link>
            <Link
              href={isWebinar ? "/webinars" : "/news"}
              className="flex items-center"
            >
              <p className="mb-0 font-mulish text-m font-normal">
                {isWebinar ? "Webinars" : "Blog"}
              </p>
            </Link>
          </li>
        </ul>
        <div className="flex">
          <SearchButton />
          <SwitchLang />
        </div>
      </Container>
    </nav>
  );
}
