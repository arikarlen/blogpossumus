import esDictionary from "../dictionaries/es.json";
import enDictionary from "../dictionaries/en.json";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useDictionary() {
  const [dictionary, setDictionary] = useState(esDictionary);
  const { lang } = useParams();
  useEffect(() => {
    if (lang === "en") {
      setDictionary(enDictionary);
    } else {
      setDictionary(esDictionary);
    }
  }, [lang]);
  return dictionary;
}
