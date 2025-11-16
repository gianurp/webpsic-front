'use client';

import { useState, useEffect } from "react";

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
  createdAt: string;
  updatedAt: string;
}

interface UserDetailsModalProps {
  user: User;
  onClose: () => void;
}

export default function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user.photoKey) {
      loadAvatar(user.photoKey);
    }
  }, [user.photoKey]);

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
    return `${user.nombres.charAt(0)}${user.apellidos.charAt(0)}`.toUpperCase();
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

  const calculateAge = (dateString: string) => {
    try {
      const birthDate = new Date(dateString);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    } catch (error) {
      return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white/95 backdrop-blur rounded-3xl border border-[#e8e0f0] shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-[#e8e0f0] px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#2d2d2d]">Detalles del Usuario</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#777] hover:bg-[#f5f3f8] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Foto de perfil y nombre */}
          <div className="flex flex-col items-center gap-4 pb-6 border-b border-[#e8e0f0]">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] flex items-center justify-center">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt={`${user.nombres} ${user.apellidos}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl text-white font-bold">{getInitials()}</span>
              )}
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#2d2d2d]">
                {user.nombres} {user.apellidos}
              </h3>
              <p className="text-[#777]">@{user.nombreUsuario}</p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  user.activo !== false
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {user.activo !== false ? "Activo" : "Inactivo"}
                </span>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#f5f3f8] text-[#2d2d2d] capitalize">
                  {user.rol}
                </span>
              </div>
            </div>
          </div>

          {/* Información personal */}
          <div>
            <h4 className="text-lg font-semibold text-[#2d2d2d] mb-4">Información Personal</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#777] mb-1">Nombres</label>
                <p className="text-[#2d2d2d]">{user.nombres}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#777] mb-1">Apellidos</label>
                <p className="text-[#2d2d2d]">{user.apellidos}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#777] mb-1">Email</label>
                <p className="text-[#2d2d2d]">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#777] mb-1">Nombre de Usuario</label>
                <p className="text-[#2d2d2d]">@{user.nombreUsuario}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#777] mb-1">Fecha de Nacimiento</label>
                <p className="text-[#2d2d2d]">
                  {formatDate(user.fechaNacimiento)}
                  {calculateAge(user.fechaNacimiento) && (
                    <span className="text-[#777] ml-2">({calculateAge(user.fechaNacimiento)} años)</span>
                  )}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#777] mb-1">Sexo</label>
                <p className="text-[#2d2d2d]">{user.sexo}</p>
              </div>
            </div>
          </div>

          {/* Información de documento */}
          <div>
            <h4 className="text-lg font-semibold text-[#2d2d2d] mb-4">Documento de Identidad</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#777] mb-1">Tipo de Documento</label>
                <p className="text-[#2d2d2d]">{user.tipoDocumento}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#777] mb-1">Número de Documento</label>
                <p className="text-[#2d2d2d]">{user.numeroDocumento}</p>
              </div>
            </div>
          </div>

          {/* Información de contacto */}
          <div>
            <h4 className="text-lg font-semibold text-[#2d2d2d] mb-4">Información de Contacto</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#777] mb-1">Número de Celular</label>
                <p className="text-[#2d2d2d]">{user.numeroCelular}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#777] mb-1">Dirección</label>
                <p className="text-[#2d2d2d]">{user.direccion || "No especificada"}</p>
              </div>
            </div>
          </div>

          {/* Información del sistema */}
          <div>
            <h4 className="text-lg font-semibold text-[#2d2d2d] mb-4">Información del Sistema</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#777] mb-1">Rol</label>
                <p className="text-[#2d2d2d] capitalize">{user.rol}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#777] mb-1">Estado</label>
                <p className="text-[#2d2d2d]">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    user.activo !== false
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {user.activo !== false ? "Activo" : "Inactivo"}
                  </span>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#777] mb-1">Fecha de Creación</label>
                <p className="text-[#2d2d2d]">{formatDate(user.createdAt)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#777] mb-1">Última Actualización</label>
                <p className="text-[#2d2d2d]">{formatDate(user.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-[#e8e0f0] px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

