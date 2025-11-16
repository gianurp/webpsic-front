'use client';

import { useEffect, useState, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

type Props = {
  name?: string | null;
  photoKey?: string | null;
};

export default function UserMenu({ name, photoKey }: Props) {
  const { data: session, update } = useSession();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(name ?? null);
  const [currentPhotoKey, setCurrentPhotoKey] = useState<string | null>(photoKey ?? (session as any)?.photoKey ?? null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Función para cargar la foto de perfil
  const loadAvatar = async (key: string | null) => {
    if (!key) {
      setAvatarUrl(null);
      return;
    }
    try {
      const res = await fetch("/api/s3/presign-get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.url) {
          setAvatarUrl(data.url);
        } else {
          setAvatarUrl(null);
        }
      } else {
        setAvatarUrl(null);
      }
    } catch (error) {
      console.error("Error loading avatar:", error);
      setAvatarUrl(null);
    }
  };

  // Cargar datos del usuario y avatar al montar o cuando cambie la sesión
  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        // Obtener datos actuales del usuario para reflejar cambios sin re-login
        const me = await fetch("/api/users/me");
        if (me.ok) {
          const { user } = await me.json();
          if (!ignore) {
            const fullName = `${user?.nombre ?? ""} ${user?.apellidos ?? ""}`.trim();
            setDisplayName(fullName || user?.email || name || null);
            const userPhotoKey = user?.photoKey ?? null;
            setCurrentPhotoKey(userPhotoKey);
            // Cargar avatar
            await loadAvatar(userPhotoKey);
          }
        } else {
          // fallback a props o sesión
          const sessionPhotoKey = (session as any)?.photoKey ?? null;
          const fallbackPhotoKey = photoKey ?? sessionPhotoKey;
          setDisplayName(name ?? session?.user?.name ?? null);
          setCurrentPhotoKey(fallbackPhotoKey);
          await loadAvatar(fallbackPhotoKey);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        // Fallback a props o sesión
        const sessionPhotoKey = (session as any)?.photoKey ?? null;
        const fallbackPhotoKey = photoKey ?? sessionPhotoKey;
        setCurrentPhotoKey(fallbackPhotoKey);
        await loadAvatar(fallbackPhotoKey);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [session, photoKey, name]);

  // Escucha un evento global para refrescar avatar/nombre tras editar perfil
  useEffect(() => {
    const onUpdated = async () => {
      try {
        const me = await fetch("/api/users/me");
        if (me.ok) {
          const { user } = await me.json();
          const fullName = `${user?.nombre ?? ""} ${user?.apellidos ?? ""}`.trim();
          setDisplayName(fullName || user?.email || null);
          const userPhotoKey = user?.photoKey ?? null;
          setCurrentPhotoKey(userPhotoKey);
          await loadAvatar(userPhotoKey);
          // Actualizar la sesión también
          if (update) {
            await update({
              name: fullName || user?.email || name || undefined,
              photoKey: userPhotoKey,
            });
          }
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };
    window.addEventListener("profile-updated", onUpdated);
    return () => window.removeEventListener("profile-updated", onUpdated);
  }, [update, name]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  const initials = (displayName || name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("") || "U";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 rounded-full bg-white/70 backdrop-blur px-3 py-1.5 border border-[#e8e0f0] shadow-sm hover:shadow transition-all"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] flex items-center justify-center text-white font-bold">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <div className="hidden md:flex flex-col items-start leading-tight">
          <span className="text-sm text-[#2d2d2d]">Hola,</span>
          <span className="text-sm font-semibold text-[#2d2d2d] truncate max-w-[120px]">
            {(displayName || name || "").split(" ")[0] || "Usuario"}
          </span>
        </div>
        <svg className={`w-4 h-4 text-[#2d2d2d] transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.25 4.53a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white/95 backdrop-blur border border-[#e8e0f0] shadow-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[#f0eaf6]">
            <p className="text-sm text-[#777]">Conectado como</p>
            <p className="text-sm font-semibold text-[#2d2d2d] truncate">{name || "Usuario"}</p>
          </div>
          <div className="py-1">
            <Link href="/perfil" className="block px-4 py-2 text-sm text-[#2d2d2d] hover:bg-[#f5f3f8] transition-colors">
              Ver perfil
            </Link>
            <Link href="/dashboard" className="block px-4 py-2 text-sm text-[#2d2d2d] hover:bg-[#f5f3f8] transition-colors">
              Ir al dashboard
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full text-left px-4 py-2 text-sm text-[#b23b3b] hover:bg-[#fff1f1] transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


