import projects from "@/data/projects.json";

export function getFeaturedItems() {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);
}

export function getAllItems() {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getItemBySlug(slug) {
  return projects.find((p) => p.slug === slug) ?? null;
}
