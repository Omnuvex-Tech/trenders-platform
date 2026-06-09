import { AboutStoryUI } from "@repo/ui";

function toAbsUrl(path: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${process.env.API_URL}${path}`;
}

async function getAboutSettings() {
  try {
    const res = await fetch(`${process.env.API_URL}/about/settings`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

export async function AboutStoryWrapper() {
  const s = await getAboutSettings();
  if (!s) return null;
  const blocks = Array.isArray(s.storyBlocks) ? s.storyBlocks : [];
  if (blocks.length === 0) return null;
  return (
    <AboutStoryUI
      blocks={blocks.map((b: any) => ({
        title: b.title ?? "",
        paragraphs: Array.isArray(b.paragraphs) ? b.paragraphs : [],
        image: b.image ? toAbsUrl(b.image) : undefined,
        imageAlt: b.imageAlt ?? "",
      }))}
    />
  );
}