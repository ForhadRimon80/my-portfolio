import { projects } from "@/data/projects";
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const root = process.env.SITE_URL || "http://localhost:3000";
  return [
    "",
    "/about",
    "/projects",
    "/toolbox",
    "/links",
    "/contact",
    ...projects.map((p) => "/projects/" + p.slug),
  ].map((path) => ({
    url: root + path,
    lastModified: new Date("2026-10-16"),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
