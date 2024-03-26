export default function sitemap() {
    return [
      {
        url: 'https://possumus.tech',
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 1,
      },
      {
        url: 'https://grow.possumus.tech/es',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: 'https://grow.possumus.tech/en',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: 'https://grow.possumus.tech/en/news',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: 'https://grow.possumus.tech/es/news',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: 'https://grow.possumus.tech/es/webinars',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: 'https://grow.possumus.tech/en/webinars',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ]
  }