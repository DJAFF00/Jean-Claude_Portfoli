/* Capture d'un projet dans un cadre de navigateur : le haut du site reste visible. */
export default function ProjectShot({ src, title }: { src?: string | null; title: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-paper/10 bg-ink shadow-[0_30px_60px_-30px_rgba(255,106,0,0.45)] transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
      <div className="flex items-center gap-1.5 border-b border-paper/10 px-3 py-2.5">
        <i className="h-2.5 w-2.5 rounded-full bg-accent" />
        <i className="h-2.5 w-2.5 rounded-full bg-accent/50" />
        <i className="h-2.5 w-2.5 rounded-full bg-accent/25" />
      </div>
      <div className="aspect-[16/10] bg-paper">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={`Capture du projet ${title}`} className="h-full w-full object-cover object-top" />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-cocoa to-ember p-6 text-center font-script text-4xl text-accent">{title}</div>
        )}
      </div>
    </div>
  );
}
