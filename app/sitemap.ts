import type { MetadataRoute } from "next";
import { getExperienceSlugs } from "@/lib/experiences";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/experiences", "/calendar", "/community", "/about"];
  const staticRoutes = routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const experienceRoutes = getExperienceSlugs().map((slug) => ({
    url: `${site.url}/experiences/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
  return [...staticRoutes, ...experienceRoutes];
}
