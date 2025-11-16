'use client';

import { useState, useRef, useEffect } from "react";
import Modal from "../../components/Modal";

interface Paciente {
  _id: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  photoKey: string | null;
  activo?: boolean;
}

interface PacienteEditModalProps {
  paciente: Paciente;
  onClose: () => void;
  currentUserId: string;
}

export default function PacienteEditModal({ paciente, onClose, currentUserId }: PacienteEditModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    nombre: paciente.nombre,
    apellidos: paciente.apellidos,
    email: paciente.email,
    telefono: paciente.telefono,
  });

  useEffect(() => {
    if (paciente.photoKey) {
      loadPhoto(paciente.photoKey);
    }
  }, [paciente.photoKey]);

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
      if (!file.type.startsWith('image/')) {
        setError("El archivo debe ser una imagen");
        return;
      }
      setSelectedFile(file);
      setError(null);
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
      let photoKey = paciente.photoKey;

      // Subir nueva foto si hay una seleccionada
      if (selectedFile) {
        const fileExtension = selectedFile.name.split(".").pop();
        const key = `users/${paciente._id}/photos/${crypto.randomUUID()}.${fileExtension}`;

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

      // Actualizar paciente
      const res = await fetch(`/api/syscreju/pacientes/${paciente._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": currentUserId,
        },
        body: JSON.stringify({
          ...formData,
          photoKey,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error actualizando paciente");
      }

      onClose();
    } catch (err: any) {
      console.error("Error en handleSubmit:", err);
      setError(err.message || "Ocurrió un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={!!paciente}
      onClose={onClose}
      title="Editar Paciente"
      size="lg"
      footer={
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg border-2 border-[#e8e0f0] text-[#2d2d2d] font-semibold hover:bg-[#f5f3f8] transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="paciente-edit-form"
            disabled={isLoading}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Guardando..." : "Actualizar"}
          </button>
        </div>
      }
    >
      <form id="paciente-edit-form" onSubmit={handleSubmit} className="space-y-6">
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
                  {formData.nombre.charAt(0) || "P"}
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
              Nombre *
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
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
              Teléfono *
            </label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}
      </form>
    </Modal>
  );
}

