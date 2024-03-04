export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/category',
      },
      sitemap: 'https://grow.possumus.tech/sitemap.xml',
    }
  }