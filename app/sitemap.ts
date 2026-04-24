import type { MetadataRoute } from "next";

const citySlugs = [
  "bucaramanga",
  "medellin",
  "bogota",
  "barranquilla",
  "cali",
  "miami",
  "california",
  "texas",
  "new-york",
  "berlin",
  "hamburg",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const cityUrls: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `https://artiificial.art/ciudades/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [
    {
      url: "https://artiificial.art",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://artiificial.art/?lang=en",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://artiificial.art/?lang=de",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://artiificial.art/restaurantes",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://artiificial.art/hedinyer",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://artiificial.art/ciudades",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...cityUrls,
  ];
}
