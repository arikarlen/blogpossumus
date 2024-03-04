//Por defecto la data se va a revaldiar cada 1 hora
const fetcher = async (url, revalidate = 3600) => {
  try {
    const response = await fetch(`${url}`, {
      headers: { Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}` },
      next: {revalidate: revalidate},
    });
    const data = await response.json();

    return Promise.resolve(data);
  } catch (error) {
    console.log(error)
    return Promise.reject(error);
  }
};

export default fetcher;
