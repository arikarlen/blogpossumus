"use client";
import Image from "next/image";
import LogoBlack from "../../assets/LogoBlack.svg";
import SearchButton from "./searchButton/searchButton";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Container from "@/components/commons/container/Container";

export default function Header() {
  const pathname = usePathname();

  const isWebinar = pathname.includes("webinars");

  return (
    <nav
      className={`fixed top-0 w-screen py-5 xl:px-0 bg-white z-10 shadow-md`}
    >
      <Container className="flex flex-col justify-center gap-3 xs:gap-0 xs:flex-row xs:justify-between items-center !px-2">
        <ul>
          <li className="flex gap-3">
            <Link
              href="/"
              className="flex pr-3 items-center border-r-2 border-gray-800"
            >
              <Image src={LogoBlack} width={180} height={32} alt="Possumus" />{" "}
            </Link>
            <Link
              href={isWebinar ? "/webinars" : "/news"}
              className="flex items-center"
            >
              <p className="mb-0 font-mulish text-m font-normal">{isWebinar ? "Webinars" : "Blog"}</p>
            </Link>
          </li>
        </ul>
        <SearchButton />
      </Container>
    </nav>
  );
}
