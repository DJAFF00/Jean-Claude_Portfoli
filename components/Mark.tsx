export default function Mark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-flex items-center justify-center rounded-xl bg-accent font-script text-xl italic leading-none text-ink ${className}`}>
      JH
    </span>
  );
}
