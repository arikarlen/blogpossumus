import { useState, useEffect } from "react";
import Image from "next/image";
import { Container, Navbar } from "react-bootstrap";
import LogoBlack from "../../assets/LogoBlack.svg";
import LogoWhite from "../../assets/LogoWhite.svg";
import SearchButton from "./searchButton";

export default function Header({ title, style }) {
  const [theme, setTheme] = useState();
  const [checked, setChecked] = useState();
  const [logoPossumus, setLogoPossumus] = useState();

  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
    setChecked(theme === "dark" ? true : false);
    setLogoPossumus(theme === "dark" ? LogoWhite : LogoBlack);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  useEffect(() => {
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", localStorage.getItem("theme"));
  }, [checked]);

  const HandleThemeChange = () => {
    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "ligth");
      setChecked(false);
      setLogoPossumus(LogoBlack);
    } else {
      localStorage.setItem("theme", "dark");
      setLogoPossumus(LogoWhite);
      setChecked(true);
    }
  };8

  return (
    <Navbar className="bg-body-tertiary" id={style}>
      <Container>
        <Navbar.Brand href="/">
          <Image src={logoPossumus} width={180} height={32} alt="Possumus" />{" "}
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
