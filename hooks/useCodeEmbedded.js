"use client"
import { useEffect, useState } from "react";
import { KEYWORDS } from "../utils/data/keywordToCodeEmbedded";
import { CopyToClipboard } from "../utils/functions";

export default function useCodeEmbedded() {
  const [wasCopiedToClipboard, setWasCopied] = useState();

  useEffect(()=>{
    const pres = document.querySelectorAll('pre')
    pres.forEach(pre => {
        pre.addEventListener('click', (e)=>{
            CopyToClipboard(e.target.innerText, "Código copiado en el portapapeles")
            setWasCopied(true)
            setTimeout(()=>{
                setWasCopied(false)
            }, 3000)
        })
    })
  })
  useEffect(() => {
    const codes = document.querySelectorAll("code");
    codes.forEach((code) => {
      const innerHTML = code.innerHTML;
      const arrayDeCadenas = code.innerHTML.split("\n");

      const newHTML = arrayDeCadenas
        .map((lineText) => {
          let line = lineText;
          for (let i = 0; i < KEYWORDS.length; i++) {
            const item = KEYWORDS[i];
            if (lineText.includes(item.keyword)) {
              line = line.replace(item.keyword, item.replace);
            } else if (lineText.includes("//") || lineText.includes("/*")|| lineText.includes("*/")) {
              line = `<span style="color: green">${lineText}</span>`;
            }
          }
          return line + "\n";
        })
        .toString()
        .replaceAll(",", "");
      code.innerHTML = newHTML;
    });
  });
  return { wasCopiedToClipboard };
}
