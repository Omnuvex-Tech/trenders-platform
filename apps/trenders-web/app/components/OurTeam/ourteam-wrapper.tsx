import { OurTeamUI } from "@repo/ui";
import type { OurTeamMember } from "@repo/ui";

function toAbsUrl(path: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${process.env.API_URL}${path}`;
}

async function getOurTeamMembers(): Promise<OurTeamMember[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/blog/authors/our-team`, { cache: "no-store" });
    if (!res.ok) return [];
    const authors = await res.json();
    return (authors as any[]).map((a) => ({
      id: a.id,
      image: toAbsUrl(a.avatar ?? ""),
      imageAlt: a.avatarAlt ?? a.name ?? "",
      name: a.name ?? "",
      role: a.role ?? "",
      href: a.slug ? `/BlogAuthor/${a.slug}` : "#",
    }));
  } catch {
    return [];
  }
}

export async function OurTeamWrapper() {
  const members = await getOurTeamMembers();
  if (members.length === 0) return null;
  return (
    <OurTeamUI
      title="Komandamız"
      descriptionText="Biz tipik bir marketinq şirkəti deyilik! Bir çox brendlər trendləri izləməyə çalışdığı zaman,"
      descriptionLink="biz sizə trendi yaratmağa kömək edəcəyik."
      members={members}
    />
  );
}