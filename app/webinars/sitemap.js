import { getDateAndSlugWebinars } from "./actions";

export default async function sitemap() {
  const webinars = await getDateAndSlugWebinars();
  return webinars.map((webinar) => ({
    url: `https://grow.possumus.tech/webinars/${webinar.slug}`,
    lastModified: webinar.date,
  }))
}
