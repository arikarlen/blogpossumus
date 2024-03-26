"use server";

import { revalidatePath } from "next/cache";
import fetcher from "utils/fetcher";

let dataNews = null;
let pagination;

let page = 1;

let keyword = "";

let resultsNotFounded = false;

export async function getDateAndSlugNews(){
  const urlEs = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?locale=es`
  const urlEn = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?locale=en`
  const {data: dataEs} = await fetcher(urlEs)
  const {data: dataEn} = await fetcher(urlEn)

  return dataEs.map(actualNewEs => {
    return {locale: 'es', slug: actualNewEs.attributes.slug, date: actualNewEs.attributes.updatedAt}
  }).concat(dataEn.map(actualNewEn => {
    return {locale: 'en', slug: actualNewEn.attributes.slug, date: actualNewEn.attributes.updatedAt}
  }))
}

export async function getNews() {
  const url = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=*&pagination%5BwithCount%5D=true&pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=10&sort=id:desc`;
  if (!keyword) {
    const { data, meta } = await fetcher(url);
    const { pagination: newPagination } = meta;

    dataNews = data;
    pagination = newPagination;
    resultsNotFounded = false;
  }

  return { dataNews, pagination, keyword, resultsNotFounded };
}

export async function getRandomNews(quantity) {
  const url = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=*&pagination%5BpageSize%5D=${quantity}`;
  const { data } = await fetcher(url);

  dataNews = data;

  revalidatePath("/news");
}

export async function filterNews(FromData) {
  keyword = FromData.get("key");
  const url = `${process.env.NEXT_PUBLIC_API}/${
    process.env.NEXT_PUBLIC_API_BLOG
  }?populate=*&filters[$or][0][Titulo][$contains]=${keyword}&filters[$or][1][Bajada][$contains]=${keyword}&pagination%5BwithCount%5D=true&pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=${10}&sort=id:desc`;

  const { data, meta } = await fetcher(url);
  const { pagination: newPagination } = meta;

  dataNews = data;
  pagination = newPagination;

  if (dataNews.length === 0) {
    resultsNotFounded = true;
  } else {
    resultsNotFounded = false;
  }

  revalidatePath("/news");
}

export async function nextPageNews() {
  page = page + 1;
  revalidatePath("/news");
}
export async function prevPageNews() {
  page = page - 1;
  revalidatePath("/news");
}
export async function setPageNews(newPage) {
  if (page !== newPage) {
    page = newPage;
    revalidatePath("/news");
  }
}

export async function resetNews() {
  dataNews = null;

  page = 1;

  keyword = "";

  resultsNotFounded = false;
  revalidatePath("/news");
}
