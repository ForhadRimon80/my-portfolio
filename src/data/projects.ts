import { profile } from "./profile";
export const projects = [
  {
    slug: "bazar-dor",
    name: "Bazar Dor",
    bn: "বাজার দর",
    type: "Full stack",
    color: "mint",
    icon: "🥦",
    description:
      "A Bengali market price application for exploring commodity prices, comparing changes, and browsing everyday essentials.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Better Auth"],
    repo: profile.github + "/bazar-dor-app-project",
    features: [
      "Category-based product browsing",
      "Price changes and low-to-high sorting",
      "Authentication and profile management",
    ],
    lesson:
      "A useful interface starts with the information people need most. Prices, units, and changes deserve a clear hierarchy.",
  },
  {
    slug: "bangla-news-24",
    name: "Bangla News 24",
    bn: "বাংলা নিউজ ২৪",
    type: "Frontend",
    color: "lavender",
    icon: "📰",
    description:
      "A Bengali news portal with category navigation, API-powered stories, and readable article details.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    repo: profile.github + "/bangla-news-24",
    features: [
      "API-powered news sections",
      "Category navigation and active links",
      "Dedicated readable article pages",
    ],
    lesson:
      "News changes quickly. Separating navigation from article data makes fetching and rendering choices easier to reason about.",
  },
];
