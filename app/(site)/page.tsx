import Link from "next/link";
import ProjectShot from "@/components/ProjectShot";
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

      {/* Projets */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Ce que j'ai <span className="font-script font-normal italic text-lime">livré.</span>
          </h2>
          <Link href="/projets" className="hidden font-semibold text-lime underline decoration-2 underline-offset-4 md:block">Tous les projets</Link>
        </div>
        {projects.length === 0 ? (
          <p className="mt-12 text-paper/60">Aucun projet publié pour l'instant.</p>
        ) : (
          <div className="mt-16 space-y-24 md:space-y-32">
            {projects.map((p, i) => (
              <article key={p.id} className="grid items-center gap-8 md:grid-cols-12 md:gap-14">
                <Link href={`/projets/${p.slug}`} className={`group block md:col-span-7 ${i % 2 ? "md:order-2" : ""}`} aria-label={p.title}>
                  <ProjectShot src={p.imageUrl} title={p.title} />
                </Link>
                <div className="md:col-span-5">
                  <p className="font-script text-5xl text-lime">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-3xl font-extrabold leading-tight md:text-4xl">{p.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-paper/75">{p.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((t) => <li key={t} className="border border-lime/50 px-3 py-1 text-sm text-lime">{t}</li>)}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <Link href={`/projets/${p.slug}`} className="btn btn-lime">Voir le projet</Link>
                    {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-lime decoration-2 underline-offset-4">Site en ligne</a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
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
