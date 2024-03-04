export default function sitemap() {
    return [
      {
        url: 'https://possumus.tech',
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 1,
      },
      {
        url: 'https://grow.possumus.tech',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: 'https://grow.possumus.tech/news',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: 'https://grow.possumus.tech/webinars',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ]
  }