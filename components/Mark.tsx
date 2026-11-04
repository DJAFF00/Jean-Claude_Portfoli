export default function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M4 3 L36 20 L4 37 L11 20 Z" fill="none" stroke="#a3e635" strokeWidth="4" strokeLinejoin="round" />
      <path d="M16 14 L27 20 L16 26 Z" fill="#a3e635" />
    </svg>
  );
}
