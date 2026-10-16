import "server-only";
import { projects } from "@/data/projects";
import { database } from "./db";

export default async function getAdminStats() {
  let github: { followers: number; repos: number } | null = null;
  let views: number | null = null;
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };
    if (process.env.GITHUB_TOKEN)
      headers.Authorization = "Bearer " + process.env.GITHUB_TOKEN;
    const response = await fetch("https://api.github.com/users/ForhadRimon80", {
      headers,
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (response.ok) {
      const data = await response.json();
      github = { followers: data.followers, repos: data.public_repos };
    }
  } catch {}
  try {
    const db = await database();
    const totals = await db
      .collection("views")
      .aggregate([{ $group: { _id: null, total: { $sum: "$count" } } }])
      .toArray();
    views = totals[0]?.total || 0;
  } catch {}
  return { github, views, projects: projects.length };
}
