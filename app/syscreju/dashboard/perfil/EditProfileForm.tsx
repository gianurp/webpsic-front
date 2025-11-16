'use client';

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  nombres: string;
  apellidos: string;
  email: string;
  nombreUsuario: string;
  numeroCelular: string;
  direccion: string;
  photoKey: string | null;
}

interface EditProfileFormProps {
  user: User;
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    nombres: user.nombres,
    apellidos: user.apellidos,
    numeroCelular: user.numeroCelular,
    direccion: user.direccion,
  });

  // Cargar foto de perfil si existe
  useEffect(() => {
    if (user.photoKey) {
      loadPhoto(user.photoKey);
    }
  }, [user.photoKey]);

  const loadPhoto = async (photoKey: string) => {
    try {
      const res = await fetch("/api/s3/presign-get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: photoKey }),
      });
      if (res.ok) {
        const { url } = await res.json();
        setPhotoPreview(url);
      }
    } catch (error) {
      console.error("Error cargando foto:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("La imagen debe ser menor a 5MB");
        return;
      }
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        setError("El archivo debe ser una imagen");
        return;
      }
      setSelectedFile(file);
      setError(null); // Limpiar errores previos
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const storedUser = localStorage.getItem("syscreju_user");
      if (!storedUser) {
        router.push("/syscreju/login");
        return;
      }

      const userData = JSON.parse(storedUser);
      const userId = userData._id;

      let photoKey = user.photoKey;

      // Subir nueva foto si hay una seleccionada
      if (selectedFile) {
        const fileExtension = selectedFile.name.split(".").pop();
        const key = `usersWork/${userId}/photos/${crypto.randomUUID()}.${fileExtension}`;

        // Obtener URL presignada
        const presignRes = await fetch("/api/s3/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            key, 
            contentType: selectedFile.type || "image/jpeg" 
          }),
        });

        if (!presignRes.ok) {
          const errorData = await presignRes.json().catch(() => ({}));
          throw new Error(errorData.error || "Error obteniendo URL de subida");
        }

        const presignData = await presignRes.json();
        if (!presignData.url) {
          throw new Error("No se recibió la URL de subida");
        }

        const { url } = presignData;

        // Subir archivo a S3
        const putRes = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": selectedFile.type || "image/jpeg",
            "x-amz-server-side-encryption": "AES256",
          },
          body: selectedFile,
        });

        if (!putRes.ok) {
          const errorText = await putRes.text();
          console.error("Error S3:", errorText);
          throw new Error(`Error subiendo archivo a S3: ${putRes.status} ${putRes.statusText}`);
        }
        photoKey = key;
      }

      // Actualizar perfil
      const updateRes = await fetch("/api/syscreju/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({
          ...formData,
          photoKey,
        }),
      });

      if (!updateRes.ok) {
        const data = await updateRes.json();
        throw new Error(data.error || "Error actualizando perfil");
      }

      const { user: updatedUser } = await updateRes.json();

      // Actualizar localStorage
      localStorage.setItem("syscreju_user", JSON.stringify(updatedUser));

      setSuccess("Perfil actualizado correctamente.");
      
      // Disparar evento global para actualizar el header del dashboard
      window.dispatchEvent(new CustomEvent("syscreju-profile-updated", {
        detail: { user: updatedUser }
      }));
    } catch (err: any) {
      console.error("Error en handleSubmit:", err);
      setError(err.message || "Ocurrió un error inesperado. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur rounded-3xl border border-[#e8e0f0] shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Foto de perfil */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] flex items-center justify-center">
              {photoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoPreview}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl text-white font-bold">
                  {user.nombres.charAt(0)}{user.apellidos.charAt(0)}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-[#4a9a8a] text-white rounded-full p-2 hover:bg-[#3a8a7a] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <p className="text-sm text-[#777]">Haz clic en el ícono para cambiar tu foto</p>
        </div>

        {/* Información del usuario (solo lectura) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-2 rounded-lg border-2 border-[#e8e0f0] bg-[#f5f3f8] text-[#777] cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
              Nombre de Usuario
            </label>
            <input
              type="text"
              value={user.nombreUsuario}
              disabled
              className="w-full px-4 py-2 rounded-lg border-2 border-[#e8e0f0] bg-[#f5f3f8] text-[#777] cursor-not-allowed"
            />
          </div>
        </div>

        {/* Campos editables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
              Nombres *
            </label>
            <input
              type="text"
              value={formData.nombres}
              onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
              Apellidos *
            </label>
            <input
              type="text"
              value={formData.apellidos}
              onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
              Número de Celular *
            </label>
            <input
              type="tel"
              value={formData.numeroCelular}
              onChange={(e) => setFormData({ ...formData, numeroCelular: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
              Dirección
            </label>
            <input
              type="text"
              value={formData.direccion}
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Mensajes de error y éxito */}
        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
            {success}
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}

