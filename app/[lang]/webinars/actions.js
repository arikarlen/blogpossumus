"use server";

import { revalidatePath } from "next/cache";
import fetcher from "utils/fetcher";

let dataWebinars = null;
let pagination;

let page = 1;

let keyword = "";

let resultsNotFounded = false;

export async function getDateAndSlugWebinars() {
  const urlEs = `${process.env.NEXT_PUBLIC_API}/blog-webinars?locale=es&populate[webinarInfo][slug]`;
  const urlEn = `${process.env.NEXT_PUBLIC_API}/blog-webinars?locale=en&populate[webinarInfo][slug]`;
  const { data: dataEs } = await fetcher(urlEs);
  const { data: dataEn } = await fetcher(urlEn);

  return dataEs
    .map((webinar) => {
      return {
        slug: webinar.attributes.webinarInfo.slug,
        date: webinar.attributes.updatedAt,
        locale: "es",
      };
    })
    .concat(
      dataEn.map((webinar) => {
        return {
          slug: webinar.attributes.webinarInfo.slug,
          date: webinar.attributes.updatedAt,
          locale: "en",
        };
      })
    );
}

export async function getWebinars(lang) {
  const url = `${process.env.NEXT_PUBLIC_API}/blog-webinars?locale=${lang}&populate=deep&pagination%5BwithCount%5D=true&pagination%5Bpage%5D=0&pagination%5BpageSize%5D=10&sort=id:desc`;
  if (!keyword) {
    const { data, meta } = await fetcher(url);
    const { pagination: newPagination } = meta;

    dataWebinars = data;
    pagination = newPagination;
    resultsNotFounded = false;
  }
  
  return { dataWebinars, pagination, keyword, resultsNotFounded };
}

export async function getRandomWebinars(quantity) {
  const url = `${process.env.NEXT_PUBLIC_API}/blog-webinars?populate=deep&pagination%5BpageSize%5D=${quantity}`;
  const { data } = await fetcher(url);

  dataWebinars = data;

  revalidatePath("/webinars");
}

export async function filterWebinars(FromData) {
  keyword = FromData.get("key");
  const url = `${
    process.env.NEXT_PUBLIC_API
  }/blog-webinars?populate=deep&filters[$or][0][header][titulo][$contains]=${keyword}&filters[$or][1][header][bajada][$contains]=${keyword}&pagination%5BwithCount%5D=true&pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=${10}&sort=id:desc`;

  const { data, meta } = await fetcher(url);
  const { pagination: newPagination } = meta;

  dataWebinars = data;
  pagination = newPagination;

  if (dataWebinars.length === 0) {
    resultsNotFounded = true;
  } else {
    resultsNotFounded = false;
  }

  revalidatePath("/webinars");
}

export async function nextPageWebinars() {
  page = page + 1;
}
export async function prevPageWebinars() {
  page = page - 1;
}
export async function setPageWebinars(newPage) {
  if (page !== newPage) {
    page = newPage;
    revalidatePath("/webinars");
  }
}

export async function resetWebinars() {
  dataWebinars = null;

  page = 1;

  keyword = "";

  resultsNotFounded = false;
  revalidatePath("/webinars");
}
