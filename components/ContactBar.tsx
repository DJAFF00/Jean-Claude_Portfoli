import type { Profile } from "@prisma/client";

export default function ContactBar({ profile }: { profile: Profile }) {
  const items = [
    profile.github && { label: "Voir mon code", value: profile.github.replace(/^https?:\/\//, ""), href: profile.github },
    profile.phone && { label: "Appelez-moi", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    profile.email && { label: "Écrivez-moi", value: profile.email, href: `mailto:${profile.email}` },
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  return (
    <div className="grid gap-8 md:grid-cols-3 md:gap-0">
      {items.map((it, i) => (
        <a
          key={it.label}
          href={it.href}
          className={`group block md:px-8 ${i > 0 ? "md:border-l md:border-lime/70" : "md:pl-0"}`}
        >
          <span className="block text-paper/80">{it.label}</span>
          <span className="block break-all text-lg font-semibold text-lime group-hover:underline">{it.value}</span>
        </a>
      ))}
    </div>
  );
}
