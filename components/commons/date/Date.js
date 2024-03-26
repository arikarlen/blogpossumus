"use client";
import moment from "moment";
import "moment/min/locales";
import { useParams } from "next/navigation";

export default function Date({ date }) {
  const { lang } = useParams();
  const isInEnglish = lang === "en";

  const format = isInEnglish ? "DD MMMM YYYY" : "DD [de] MMMM [del] YYYY";

  return (
    <>
      {moment(date)
        .locale(lang)
        .format(format)}
    </>
  );
}
