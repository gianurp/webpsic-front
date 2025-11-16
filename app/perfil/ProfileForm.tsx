'use client';

import { useEffect, useState } from "react";

export default function ProfileForm({
  initialName,
  initialEmail,
  initialPhotoKey
}: {
  initialName: string;
  initialEmail: string;
  initialPhotoKey: string | null;
}) {
  const [nombre, setNombre] = useState(initialName.split(" ").slice(0, -1).join(" ") || initialName);
  const [apellidos, setApellidos] = useState(initialName.split(" ").slice(-1).join(" "));
  const [email, setEmail] = useState(initialEmail);
  const [telefono, setTelefono] = useState("");
  const [photoKey, setPhotoKey] = useState<string | null>(initialPhotoKey);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [loadedTel, setLoadedTel] = useState(false);

  useEffect(() => {
    // Cargar datos extra (teléfono) si existen
    let ignore = false;
    async function load() {
      const res = await fetch("/api/users/me", { method: "GET" });
      if (!res.ok) return;
      const data = await res.json();
      if (!ignore && data?.user?.telefono) {
        setTelefono(data.user.telefono);
        setLoadedTel(true);
      } else {
        setLoadedTel(true);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  const onSelectPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let newKey = photoKey;
      if (photoFile) {
        const tempUser = crypto.randomUUID();
        const key = `users/${tempUser}/photos/${crypto.randomUUID()}-${photoFile.name}`;
        const presignRes = await fetch("/api/s3/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, contentType: photoFile.type || "application/octet-stream" }),
        });
        if (!presignRes.ok) throw new Error("No se pudo obtener URL prefirmada");
        const { url } = await presignRes.json();
        const putRes = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": photoFile.type || "application/octet-stream",
            "x-amz-server-side-encryption": "AES256",
          },
          body: photoFile,
        });
        if (!putRes.ok) throw new Error("Error subiendo la nueva foto");
        newKey = key;
      }

      const res = await fetch("/api/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellidos,
          email,
          telefono,
          photoKey: newKey,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error guardando cambios");

      setPhotoKey(newKey || null);
      setPhotoPreview(null);
      setPhotoFile(null);
      alert("Perfil actualizado. Si no ves los cambios en el encabezado, recarga la página.");
      // window.location.reload(); // si se desea refrescar sesión inmediatamente
    } catch (err: any) {
      alert(err?.message || "Error guardando cambios");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#e8e0f0] shadow-lg p-6 md:p-8 space-y-6">
      <div className="flex items-start md:items-center gap-6 md:gap-10">
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] flex items-center justify-center text-white text-2xl font-bold border border-[#e8e0f0] shadow">
            {photoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <AvatarInline photoKey={photoKey} name={`${nombre} ${apellidos}`.trim()} />
            )}
          </div>
          <label className="mt-2 inline-block cursor-pointer text-sm text-[#4a9a8a] hover:underline">
            <input type="file" accept="image/*" className="hidden" onChange={onSelectPhoto} />
            Cambiar foto
          </label>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 flex-1">
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
            <label className="block text-sm font-medium text-[#2d2d2d] mb-2">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
              placeholder="tu@email.com"
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
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving || !loadedTel}
          className="bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}

function AvatarInline({ photoKey, name }: { photoKey: string | null; name: string }) {
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

  return url ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} alt="avatar" className="w-full h-full object-cover" />
  ) : (
    <span>{initials}</span>
  );
}


