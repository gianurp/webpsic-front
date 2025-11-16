'use client';

import { useState, useRef, useEffect } from "react";

interface User {
  _id: string;
  nombres: string;
  apellidos: string;
  email: string;
  nombreUsuario: string;
  fechaNacimiento: string;
  tipoDocumento: string;
  numeroDocumento: string;
  sexo: string;
  direccion: string;
  numeroCelular: string;
  rol: string;
  photoKey: string | null;
  activo?: boolean;
}

interface UserFormProps {
  user: User | null;
  onClose: () => void;
  currentUserId: string;
}

export default function UserForm({ user, onClose, currentUserId }: UserFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const isEditing = !!user;

  const [formData, setFormData] = useState({
    nombres: user?.nombres || "",
    apellidos: user?.apellidos || "",
    email: user?.email || "",
    password: "",
    nombreUsuario: user?.nombreUsuario || "",
    fechaNacimiento: user?.fechaNacimiento ? new Date(user.fechaNacimiento).toISOString().split("T")[0] : "",
    tipoDocumento: user?.tipoDocumento || "DNI",
    numeroDocumento: user?.numeroDocumento || "",
    sexo: user?.sexo || "Otro",
    direccion: user?.direccion || "",
    numeroCelular: user?.numeroCelular || "",
    rol: user?.rol || "psicologo",
  });

  useEffect(() => {
    if (user?.photoKey) {
      loadPhoto(user.photoKey);
    }
  }, [user?.photoKey]);

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
      setSelectedFile(file);
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

    try {
      // Validaciones
      if (!formData.nombres || !formData.apellidos || !formData.email || !formData.nombreUsuario) {
        throw new Error("Todos los campos requeridos deben estar completos");
      }

      if (!isEditing && !formData.password) {
        throw new Error("La contraseña es requerida para nuevos usuarios");
      }

      let photoKey = user?.photoKey || null;

      // Subir nueva foto si hay una seleccionada
      if (selectedFile) {
        const userId = user?._id || crypto.randomUUID();
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

      const payload: any = {
        ...formData,
        photoKey,
      };

      if (!isEditing || formData.password) {
        payload.password = formData.password;
      }

      const url = isEditing
        ? `/api/syscreju/users/${user._id}`
        : "/api/syscreju/users";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-user-id": currentUserId,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error guardando usuario");
      }

      onClose();
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur rounded-3xl border border-[#e8e0f0] shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#2d2d2d]">
          {isEditing ? "Editar Usuario" : "Nuevo Usuario"}
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-[#777] hover:bg-[#f5f3f8] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Foto de perfil */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] flex items-center justify-center">
              {photoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoPreview}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl text-white font-bold">
                  {formData.nombres.charAt(0) || "U"}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-[#4a9a8a] text-white rounded-full p-2 hover:bg-[#3a8a7a] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        </div>

        {/* Información básica */}
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
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
              Nombre de Usuario *
            </label>
            <input
              type="text"
              value={formData.nombreUsuario}
              onChange={(e) => setFormData({ ...formData, nombreUsuario: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
            Contraseña {isEditing ? "(dejar vacío para no cambiar)" : "*"}
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required={!isEditing}
            className="w-full px-4 py-2 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
          />
        </div>

        {/* Información adicional */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
              Fecha de Nacimiento *
            </label>
            <input
              type="date"
              value={formData.fechaNacimiento}
              onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
              Tipo de Documento *
            </label>
            <select
              value={formData.tipoDocumento}
              onChange={(e) => setFormData({ ...formData, tipoDocumento: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
            >
              <option value="DNI">DNI</option>
              <option value="CE">CE</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
              Número de Documento *
            </label>
            <input
              type="text"
              value={formData.numeroDocumento}
              onChange={(e) => setFormData({ ...formData, numeroDocumento: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2d2d2d] mb-2">
              Sexo *
            </label>
            <select
              value={formData.sexo}
              onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
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
              Rol *
            </label>
            <select
              value={formData.rol}
              onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
            >
              <option value="admin">Admin</option>
              <option value="psicologo">Psicólogo</option>
              <option value="secretaria">Secretaria</option>
            </select>
          </div>
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

        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-lg border-2 border-[#e8e0f0] text-[#2d2d2d] font-semibold hover:bg-[#f5f3f8] transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Guardando..." : isEditing ? "Actualizar" : "Crear Usuario"}
          </button>
        </div>
      </form>
    </div>
  );
}

