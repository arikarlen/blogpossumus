"use server";

import fetcher from "utils/fetcher";

export async function fetchFeatured(url, revalidate) {
  try {
    const data = await fetcher(url, revalidate);
    return data.data[0];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch featured data");
  }
}

