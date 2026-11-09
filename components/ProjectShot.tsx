/* Capture d'un projet dans un cadre de navigateur : le haut du site reste visible. */
export default function ProjectShot({ src, title }: { src?: string | null; title: string }) {
  return (
    <div className="overflow-hidden border border-lime/70 bg-ink shadow-[10px_10px_0_0_rgba(163,230,53,0.22)] transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
      <div className="flex items-center gap-1.5 border-b border-lime/30 px-3 py-2.5">
        <i className="h-2.5 w-2.5 rounded-full bg-lime" />
        <i className="h-2.5 w-2.5 rounded-full bg-lime/50" />
        <i className="h-2.5 w-2.5 rounded-full bg-lime/25" />
      </div>
      <div className="aspect-[16/10] bg-paper">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={`Capture du projet ${title}`} className="h-full w-full object-cover object-top" />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-moss to-olive p-6 text-center font-script text-4xl text-lime">{title}</div>
        )}
      </div>
    </div>
  );
}
