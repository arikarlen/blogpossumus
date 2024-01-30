import axios from "axios";
import { useEffect, useState } from "react";

export default function useClientApi(url){
    const [response, setResponse] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const [actualUrl, setActualUrl] = useState('')

    useEffect(() => {
      setIsLoading(true)
      async function getData() {
        return await axios
        .get(url,  {headers: {Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`}})
        .then((res) => {
          setResponse(res.data.data)
          setActualUrl(url)
        })
        .catch((e) =>
        console.log(`Ocurrio un problema en la llamda a la API desde el cliente: ${e.message}`)
        ).finally(()=> setIsLoading(false))
      }
      if(url !== actualUrl){
          getData();
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [url]);

    return [response, setResponse, isLoading]
}