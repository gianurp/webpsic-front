'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Props = {
  initialName: string;
  initialEmail: string;
  initialPhotoKey: string | null;
};

export default function EditProfileForm({ initialName, initialEmail, initialPhotoKey }: Props) {
  const { data: session } = useSession();
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [photoKey, setPhotoKey] = useState<string | null>(initialPhotoKey);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Cargar datos actuales desde API
    async function load() {
      const res = await fetch("/api/users/me");
      if (!res.ok) return;
      const { user } = await res.json();
      setNombre(user?.nombre || initialName.split(" ")[0] || "");
      setApellidos(user?.apellidos || initialName.split(" ").slice(1).join(" ") || "");
      setTelefono(user?.telefono || "");
      setPhotoKey(user?.photoKey ?? initialPhotoKey ?? null);
      if (user?.photoKey) {
        const u = await presignGet(user.photoKey);
        setPreviewUrl(u);
      }
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function presignGet(key: string) {
    const res = await fetch("/api/s3/presign-get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
    const data = await res.json();
    return data?.url || null;
  }

  const onSelectPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhotoFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let newPhotoKey = photoKey;
      if (photoFile) {
        const userId = (session as any)?.userId || crypto.randomUUID();
        const key = `users/${userId}/photos/${crypto.randomUUID()}-${photoFile.name}`;
        const presignRes = await fetch("/api/s3/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, contentType: photoFile.type || "application/octet-stream" }),
        });
        const { url } = await presignRes.json();
        const putRes = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": photoFile.type || "application/octet-stream",
            "x-amz-server-side-encryption": "AES256",
          },
          body: photoFile,
        });
        if (!putRes.ok) throw new Error("Error subiendo archivo");
        newPhotoKey = key;
      }

      const res = await fetch("/api/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          apellidos: apellidos.trim(),
          telefono: telefono.trim(),
          photoKey: newPhotoKey ?? null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error al actualizar");
      setPhotoKey(newPhotoKey ?? null);
      if (newPhotoKey) {
        const u = await presignGet(newPhotoKey);
        setPreviewUrl(u);
      }
      // Notificar al Header para refrescar avatar/nombre
      window.dispatchEvent(new Event("profile-updated"));
      // Refrescar vista (App Router) para server components/SEO
      if (typeof window !== "undefined") {
        // recarga suave
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 0);
      }
      alert("Perfil actualizado");
    } catch (err: any) {
      alert(err?.message || "Error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="flex items-start md:items-center gap-6 md:gap-10">
        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] flex items-center justify-center text-white text-2xl font-bold border border-[#e8e0f0] shadow">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <span>{(nombre || initialName || "U").charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2d2d2d] mb-2">Foto de perfil</label>
          <input type="file" accept="image/*" onChange={onSelectPhoto} className="text-sm" />
          <p className="text-xs text-[#777] mt-1">Formatos: JPG/PNG. Tamaño recomendado &lt; 1MB.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#2d2d2d] mb-2">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
            placeholder="Tu nombre"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2d2d2d] mb-2">Apellidos</label>
          <input
            type="text"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
            placeholder="Tus apellidos"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2d2d2d] mb-2">Teléfono</label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
            placeholder="+51 999 999 999"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2d2d2d] mb-2">Correo</label>
          <input
            type="email"
            value={initialEmail}
            disabled
            className="w-full px-4 py-3 rounded-lg border-2 border-[#e8e0f0] bg-[#faf9fd] text-[#777] cursor-not-allowed"
          />
          <p className="text-xs text-[#777] mt-1">El correo no se puede editar por ahora.</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </form>
  );
}


