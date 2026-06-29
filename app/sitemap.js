const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sanmitrabank.example';

const staticRoutes = [
  '',
  '/about-us',
  '/our-products',
  '/approved-project',
  '/calculators',
  '/faq',
  '/contact-us',
];

export default function sitemap() {
  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.7,
  }));
}
