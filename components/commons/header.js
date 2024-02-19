"use client"
import Image from "next/image";
import { Container, Navbar } from "react-bootstrap";
import LogoBlack from "../../assets/LogoBlack.svg";
import LogoWhite from "../../assets/LogoWhite.svg";
import SearchButton from "./searchButton";

export default function Header({ title, style }) {

  return (
    <Navbar className="bg-body-tertiary" id={style}>
      <Container>
        <Navbar.Brand href="/">
          <Image src={LogoBlack} width={180} height={32} alt="Possumus" />{" "}
          <span>{title}</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <SearchButton />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
