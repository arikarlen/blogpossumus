import { useState, useEffect } from "react";
import Image from "next/image";
import { Container, Navbar } from "react-bootstrap";
import LogoBlack from "../assets/LogoBlack.svg";
import LogoWhite from "../assets/LogoWhite.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    const [theme, setTheme] = useState();
    const [checked, setChecked] = useState();
    const [logoPossumus, setLogoPossumus] = useState();

    useEffect(() => {
        setTheme(localStorage.getItem("theme"));
        setChecked(theme === "dark" ? true : false);
        setLogoPossumus(theme === "dark" ? LogoWhite : LogoBlack);
    }, [checked]);

    useEffect(() => {
        document.getElementsByTagName("HTML")[0].setAttribute("data-theme", localStorage.getItem("theme"));
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
    };

    return (
        <Navbar className="bg-body-tertiary" id="mainNav">
            <Container>
                <Navbar.Brand href="#home">
                    <Image src={logoPossumus} width={180} height={32} alt="Picture of the author" /> <span>Blog</span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <div>
                            <input type="checkbox" class="checkbox" id="checkbox" onClick={HandleThemeChange} checked={checked} />
                            <label for="checkbox" class="checkbox-label">
                                <FontAwesomeIcon icon={faSun} />
                                <FontAwesomeIcon icon={faMoon} />
                                <span class="ball"></span>
                            </label>
                        </div>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
