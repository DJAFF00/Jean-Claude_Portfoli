import Link from "next/link";
import ProjectShot from "@/components/ProjectShot";
import { getProfile, getPublishedProjects, getParcours } from "@/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const [profile, projects, { experience, education, skills }] = await Promise.all([getProfile(), getPublishedProjects(6), getParcours()]);

  const firstName = profile.fullName.split(" ")[0];
  const parts = profile.fullName.split(" ");
  const initials = (parts[0][0] + (parts[parts.length - 1][0] ?? "")).toUpperCase();

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-28 pt-4 md:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-paper/10 bg-ink/70 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
          <div aria-hidden className="absolute -left-24 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,106,0,0.55),rgba(124,45,18,0.4)_55%,transparent)]" />
          <div className="relative grid items-center md:grid-cols-12">
            <div className="relative h-[22rem] md:col-span-5 md:h-[36rem]">
              {profile.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.photoUrl} alt={profile.fullName} className="absolute inset-0 h-full w-full object-cover object-top [mask-image:linear-gradient(to_bottom,#000_72%,transparent)]" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center font-script text-[12rem] leading-none text-accent/85 drop-shadow-[0_0_40px_rgba(255,106,0,0.4)]">{initials}</div>
              )}
            </div>
            <div className="flex flex-col px-6 pb-12 md:col-span-7 md:items-end md:px-12 md:pb-0 md:text-right">
              {profile.available && (
                <p className="rise flex w-fit items-center gap-2 rounded-full border border-paper/15 bg-ink/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-paper/80" style={{ animationDelay: "0.05s" }}>
                  <i className="h-2 w-2 rounded-full bg-accent" /> Disponible pour une mission
                </p>
              )}
              <h1 className="rise mt-6 text-6xl leading-[1.02] md:text-8xl" style={{ animationDelay: "0.15s" }}>
                Salut, je suis <span className="font-script font-normal italic text-accent">{firstName}.</span>
              </h1>
              <p className="rise mt-5 max-w-lg text-sm font-medium uppercase tracking-[0.2em] text-paper/60" style={{ animationDelay: "0.3s" }}>{profile.headline}</p>
              <p className="rise mt-6 max-w-md text-lg leading-relaxed text-paper/80" style={{ animationDelay: "0.45s" }}>{profile.bio}</p>
              <div className="rise mt-9 flex flex-wrap gap-4 md:justify-end" style={{ animationDelay: "0.6s" }}>
                <Link href="/projets" className="btn btn-accent">Voir mes projets →</Link>
                <Link href="/#contact" className="btn border-paper/20 bg-ink/60 hover:border-paper hover:bg-paper hover:text-ink">Me contacter</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projets */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Ce que j'ai <span className="font-script font-normal italic text-accent">livré.</span>
          </h2>
          <Link href="/projets" className="hidden font-semibold text-accent underline decoration-2 underline-offset-4 md:block">Tous les projets</Link>
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
                  <p className="font-script text-5xl text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-3xl font-extrabold leading-tight md:text-4xl">{p.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-paper/75">{p.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((t) => <li key={t} className="rounded-full border border-accent/50 px-3 py-1 text-sm text-accent">{t}</li>)}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <Link href={`/projets/${p.slug}`} className="btn btn-accent">Voir le projet</Link>
                    {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-accent decoration-2 underline-offset-4">Site en ligne</a>}
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
          Trois stages, une licence, <span className="font-script font-normal italic text-accent">des serveurs plein les mains.</span>
        </h2>
        <div className="mt-16 grid gap-16 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold text-accent">Expérience</h3>
            <ul className="mt-6 space-y-5">
              {experience.map((e) => (
                <li key={e.id} className="border-l-2 border-accent/60 pl-5">
                  <p className="text-xl font-semibold">{e.place}</p>
                  <p className="text-paper/70">{e.role}{e.period ? `, ${e.period}` : ""}</p>
                  {e.description && <p className="mt-2 max-w-md text-paper/70">{e.description}</p>}
                </li>
              ))}
            </ul>
            <h3 className="mt-14 text-xl font-bold text-accent">Formation</h3>
            <ul className="mt-6 space-y-5">
              {education.map((e) => (
                <li key={e.id} className="border-l-2 border-accent/60 pl-5">
                  <p className="text-xl font-semibold">{e.degree}</p>
                  <p className="text-paper/70">{e.school}{e.years ? `, ${e.years}` : ""}</p>
                  {e.details && <p className="mt-3 max-w-md text-paper/70">{e.details}</p>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-accent">Compétences</h3>
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
