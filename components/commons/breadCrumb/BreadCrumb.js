"use client"
import { Fragment, useEffect, useState } from "react";
import { TrimText } from "utils/functions";

export default function Breadcrumb({ items, className="" }) {
  const [screenWidth, setScreenWidth] = useState(1800)

  useEffect(()=>{
    setScreenWidth(window.innerWidth) 
  },[])
  return (
    <div className={`flex gap-2 ${className}`}>
      {items.map((item, idx) => (
        <Fragment key={`${item.text}-${idx}`}>
          <a
            href={item.href}
            key={`${item.text}-${idx}`}
            className={`${item.active ? "font-mulish" : "font-gotham font-bold"} hover:opacity-80`}
          >
            {screenWidth < 768 && item.active && item.text.length > 25 ? TrimText(item.text, 25) : item.text}
          </a>
          {items.length - 1 !== idx && "/"}
        </Fragment>
      ))}
    </div>
  );
}
