import { getDateAndSlugNews } from "./actions";

export default async function sitemap() {
  const news = await getDateAndSlugNews();
  return news.map((actualNew) => ({
    url: `https://grow.possumus.tech/news/${actualNew.slug}`,
    lastModified: actualNew.date,
  }));
}
