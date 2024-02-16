const fetcher = async (url) => {
  try {
    const response = await fetch(
      `${url}`, {headers: {Authorization: `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`}}
    );
    const data = await response.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default fetcher