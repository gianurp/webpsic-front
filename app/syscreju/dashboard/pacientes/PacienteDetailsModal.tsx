'use client';

import { useState, useEffect } from "react";
import Modal from "../../components/Modal";

interface Paciente {
  _id: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  photoKey: string | null;
  activo?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PacienteDetailsModalProps {
  paciente: Paciente;
  onClose: () => void;
}

export default function PacienteDetailsModal({ paciente, onClose }: PacienteDetailsModalProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (paciente.photoKey) {
      loadAvatar(paciente.photoKey);
    }
  }, [paciente.photoKey]);

  const loadAvatar = async (photoKey: string) => {
    try {
      const res = await fetch("/api/s3/presign-get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: photoKey }),
      });
      if (res.ok) {
        const { url } = await res.json();
        setAvatarUrl(url);
      }
    } catch (error) {
      console.error("Error cargando avatar:", error);
    }
  };

  const getInitials = () => {
    return `${paciente.nombre.charAt(0)}${paciente.apellidos.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Fecha inválida";
      }
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "Fecha inválida";
    }
  };

  return (
    <Modal
      isOpen={!!paciente}
      onClose={onClose}
      title="Detalles del Paciente"
      size="lg"
      footer={
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Cerrar
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Foto de perfil y nombre */}
        <div className="flex flex-col items-center gap-4 pb-6 border-b border-[#e8e0f0]">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] flex items-center justify-center">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={`${paciente.nombre} ${paciente.apellidos}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-5xl text-white font-bold">{getInitials()}</span>
            )}
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#2d2d2d]">
              {paciente.nombre} {paciente.apellidos}
            </h3>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                paciente.activo !== false
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}>
                {paciente.activo !== false ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>
        </div>

        {/* Información personal */}
        <div>
          <h4 className="text-lg font-semibold text-[#2d2d2d] mb-4">Información Personal</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#777] mb-1">Nombre</label>
              <p className="text-[#2d2d2d]">{paciente.nombre}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#777] mb-1">Apellidos</label>
              <p className="text-[#2d2d2d]">{paciente.apellidos}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#777] mb-1">Email</label>
              <p className="text-[#2d2d2d]">{paciente.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#777] mb-1">Teléfono</label>
              <p className="text-[#2d2d2d]">{paciente.telefono || "No especificado"}</p>
            </div>
          </div>
        </div>

        {/* Información del sistema */}
        <div>
          <h4 className="text-lg font-semibold text-[#2d2d2d] mb-4">Información del Sistema</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#777] mb-1">Estado</label>
              <p className="text-[#2d2d2d]">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  paciente.activo !== false
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {paciente.activo !== false ? "Activo" : "Inactivo"}
                </span>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#777] mb-1">Fecha de Registro</label>
              <p className="text-[#2d2d2d]">{formatDate(paciente.createdAt)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#777] mb-1">Última Actualización</label>
              <p className="text-[#2d2d2d]">{formatDate(paciente.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

