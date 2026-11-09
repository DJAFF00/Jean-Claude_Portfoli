"use client";
import { useState } from "react";

export default function ImageInput() {
  const [err, setErr] = useState("");
  return (
    <>
      <input
        id="image"
        name="image"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="field"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f && f.size > 4 * 1024 * 1024) {
            setErr("Cette image fait plus de 4 Mo. Réduis-la ou exporte-la en WebP.");
            e.target.value = "";
          } else setErr("");
        }}
      />
      {err && <p role="alert" className="mt-2 font-medium text-red-700">{err}</p>}
    </>
  );
}
