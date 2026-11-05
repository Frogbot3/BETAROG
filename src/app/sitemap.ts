import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/content";
import { publicArticles } from "@/content/journal";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/services",
    "/work",
    "/about",
    "/insights",
    "/contact",
    ...projects.map((project) => `/work/${project.slug}`),
    ...publicArticles().map((article) => `/insights/${article.slug}`),
  ].map((path) => ({
    url: `${site.url.replace(/\/$/, "")}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
