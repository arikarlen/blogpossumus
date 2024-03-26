"use client";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./switchLang.css";

export default function SwitchLang() {
  const [checked, setChecked] = useState(false);
  function handleChange(event) {
    if (event.target.type === "checkbox") {
      setChecked(!checked);
    }
  }

  const { lang } = useParams();

  const pathname = usePathname();

  useEffect(() => {
    if (lang === "en") {
      setChecked(false);
    } else if (lang === "es") {
      setChecked(true);
    }
  }, [lang]);
  return (
    <div id="mySwitch">
      <input
        type="checkbox"
        id="switch"
        checked={checked}
        onChange={(event) => {
          handleChange(event);
          if (!checked) {
            //Spanish to English
            const newPath = `/es${pathname.replace(`/en`, "")}`;
            if (
              pathname.includes("/news/") ||
              pathname.includes("/webinars/")
            ) {
              window.location.pathname = `${newPath}-es`;
            } else {
              window.location.pathname = newPath;
            }
          } else {
            //English to Spanish
            const newPath = `/en${pathname.replace('/es', "")}`;
            if (
              pathname.includes("/news/") ||
              pathname.includes("/webinars/")
            ) {
              window.location.pathname = newPath.replace(/-es$/, "");
            } else {
              window.location.pathname = newPath;
            }
          }
        }}
      />
      <div className="app">
        <div className="container-switch justify-end">
          <label id="switchLanguage" htmlFor="switch">
            <div className="toggle"></div>
            <div className="language">
              <p className="english">EN</p>
              <p className="espanol">ES</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
