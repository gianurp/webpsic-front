'use client';

import { useEffect, useState } from "react";

export default function AvatarClient({ photoKey, name }: { photoKey: string | null; name: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const initials =
    (name || "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("") || "U";

  useEffect(() => {
    let ignore = false;
    async function load() {
      if (!photoKey) {
        setUrl(null);
        return;
      }
      const res = await fetch("/api/s3/presign-get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: photoKey }),
      });
      const data = await res.json();
      if (!ignore && res.ok && data?.url) setUrl(data.url);
    }
    load();
    return () => {
      ignore = true;
    };
  }, [photoKey]);

  return (
    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] flex items-center justify-center text-white text-2xl font-bold border border-[#e8e0f0] shadow">
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="avatar" className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}


