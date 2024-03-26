"use client";
import { cva } from "class-variance-authority";
import { useState } from "react";

const buttonStyles = cva(
  `flex justify-center mt-5 border-2 rounded-lg py-3 px-4 duration-300 ease-in-out`,
  {
    variants: {
      variant: {
        primary: `border-black hover:cursor-pointer hover:bg-yellow hover:border-yellow`,
        secondary: `bg-black border-black text-white cursor-pointer hover:bg-yellow hover:border-yellow hover:text-black`,
        webinar: `text-l font-bold cursor-pointer bg-black text-white border-black hover:bg-yellow hover:border-yellow hover:text-black`,
      },
      fullWidth: {
        true: "w-full",
        false: "w-max",
      },
      disabled: {
        true: "opacity-50 hover:cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);
export default function Button({
  text,
  variant,
  href = null,
  onClick = () => {},
  className: defaultClass = "",
  disabled = false,
  fullWidth = null,
  styles = {default: null, hover: null},
}) {
  const [hoverStyles, setHoverStyles] = useState(styles["default"]);
  return (
    <a
      href={href}
      onClick={() => !disabled && onClick()}
      className={buttonStyles({
        variant,
        fullWidth,
        disabled,
        class: defaultClass,
      })}
      onMouseEnter={() => setHoverStyles(styles["hover"])}
      onMouseLeave={() => setHoverStyles(styles["default"])}
      style={hoverStyles}
    >
      {text}
    </a>
  );
}
