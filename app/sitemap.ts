import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://artiificial.art",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://artiificial.art/restaurantes",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
