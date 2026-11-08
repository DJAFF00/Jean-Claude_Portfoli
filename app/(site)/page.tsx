import Link from "next/link";
import { getProfile, getPublishedProjects, getParcours } from "@/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const [profile, projects, { experience, education, skills }] = await Promise.all([getProfile(), getPublishedProjects(6), getParcours()]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -right-8 -top-10 select-none text-[26rem] font-extrabold leading-none text-olive/30">{"{ }"}</div>
        <div aria-hidden className="absolute -left-28 top-80 h-60 w-60 -rotate-[14deg] rounded-[2.75rem] bg-gradient-to-br from-lime/70 to-olive opacity-60 blur-[3px]" />
        <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-20 md:pt-28">
          <p className="rise text-lg text-paper/75" style={{ animationDelay: "0.05s" }}>{profile.headline}</p>
          <h1 className="mt-5 text-[clamp(3rem,9.5vw,8rem)] font-extrabold leading-[0.95] tracking-tight">
            <span className="rise block" style={{ animationDelay: "0.15s" }}>Des applications web</span>
            <span className="rise block font-script font-normal italic text-lime" style={{ animationDelay: "0.3s" }}>qui tiennent la route.</span>
          </h1>
          <p className="rise mt-10 max-w-xl text-lg leading-relaxed text-paper/80" style={{ animationDelay: "0.45s" }}>{profile.bio}</p>
          <div className="rise mt-10 flex flex-wrap items-center gap-5" style={{ animationDelay: "0.6s" }}>
            <Link href="/projets" className="btn btn-lime">Voir mes projets</Link>
            {profile.available && <span className="flex items-center gap-2 text-paper/75"><i className="h-2.5 w-2.5 rounded-full bg-lime" /> Disponible pour une mission</span>}
          </div>
        </div>
      </section>

      {/* Projets : cadre vert + écran blanc cassé, comme sur l'affiche */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="border border-lime p-3 md:p-4">
          <div className="bg-paper px-6 py-10 text-ink md:px-12 md:py-14">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">Ce que j'ai livré</h2>
              <Link href="/projets" className="hidden font-semibold underline decoration-lime decoration-4 underline-offset-4 md:block">Tout voir</Link>
            </div>
            {projects.length === 0 ? (
              <p className="mt-10 text-ink/60">Aucun projet publié pour l'instant. Ajoute-en depuis l'espace admin.</p>
            ) : (
              <ul className="mt-10 divide-y divide-ink/15">
                {projects.map((p) => (
                  <li key={p.id}>
                    <Link href={`/projets/${p.slug}`} className="group grid gap-3 py-7 md:grid-cols-[1fr_auto] md:items-center">
                      <div>
                        <h3 className="text-2xl font-bold group-hover:underline group-hover:decoration-lime group-hover:decoration-4 group-hover:underline-offset-4">{p.title}</h3>
                        <p className="mt-2 max-w-2xl text-ink/70">{p.summary}</p>
                      </div>
                      <ul className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
                        {p.stack.slice(0, 4).map((s) => (
                          <li key={s} className="bg-ink px-3 py-1 text-xs font-semibold text-paper">{s}</li>
                        ))}
                      </ul>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Parcours */}
      <section id="parcours" className="mx-auto max-w-6xl px-6 pt-32">
        <h2 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Trois stages, une licence, <span className="font-script font-normal italic text-lime">des serveurs plein les mains.</span>
        </h2>
        <div className="mt-16 grid gap-16 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold text-lime">Expérience</h3>
            <ul className="mt-6 space-y-5">
              {experience.map((e) => (
                <li key={e.id} className="border-l-2 border-lime/60 pl-5">
                  <p className="text-xl font-semibold">{e.place}</p>
                  <p className="text-paper/70">{e.role}{e.period ? `, ${e.period}` : ""}</p>
                  {e.description && <p className="mt-2 max-w-md text-paper/70">{e.description}</p>}
                </li>
              ))}
            </ul>
            <h3 className="mt-14 text-xl font-bold text-lime">Formation</h3>
            <ul className="mt-6 space-y-5">
              {education.map((e) => (
                <li key={e.id} className="border-l-2 border-lime/60 pl-5">
                  <p className="text-xl font-semibold">{e.degree}</p>
                  <p className="text-paper/70">{e.school}{e.years ? `, ${e.years}` : ""}</p>
                  {e.details && <p className="mt-3 max-w-md text-paper/70">{e.details}</p>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-lime">Compétences</h3>
            <dl className="mt-6 space-y-6">
              {skills.map((s) => (
                <div key={s.id}>
                  <dt className="font-semibold">{s.category}</dt>
                  <dd className="text-paper/70">{s.items}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
