'use client';

import { useState, useEffect } from "react";

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

interface PacienteListProps {
  pacientes: Paciente[];
  onView: (paciente: Paciente) => void;
  onEdit: (paciente: Paciente) => void;
  onDelete: (pacienteId: string) => void;
  onToggleActive: (paciente: Paciente) => void;
}

export default function PacienteList({
  pacientes,
  onView,
  onEdit,
  onDelete,
  onToggleActive,
}: PacienteListProps) {
  const [avatarUrls, setAvatarUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    // Cargar avatares de todos los pacientes
    const loadAvatars = async () => {
      const urls: Record<string, string> = {};
      for (const paciente of pacientes) {
        if (paciente.photoKey) {
          try {
            const res = await fetch("/api/s3/presign-get", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ key: paciente.photoKey }),
            });
            if (res.ok) {
              const { url } = await res.json();
              urls[paciente._id] = url;
            }
          } catch (error) {
            console.error(`Error cargando avatar para ${paciente._id}:`, error);
          }
        }
      }
      setAvatarUrls(urls);
    };

    loadAvatars();
  }, [pacientes]);

  const getInitials = (paciente: Paciente) => {
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
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Fecha inválida";
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur rounded-3xl border border-[#e8e0f0] shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#2d2d2d]">Lista de Pacientes</h2>
      </div>

      {pacientes.length === 0 ? (
        <div className="text-center py-12 text-[#777]">
          <p>No hay pacientes registrados</p>
          <p className="text-sm mt-2">Los pacientes se registran desde el sitio web del consultorio</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-[#777]">
              Total de pacientes: <span className="font-semibold text-[#2d2d2d]">{pacientes.length}</span>
            </div>
            <div className="text-sm text-[#777]">
              Activos: <span className="font-semibold text-green-600">{pacientes.filter(p => p.activo !== false).length}</span> | 
              Inactivos: <span className="font-semibold text-red-600">{pacientes.filter(p => p.activo === false).length}</span>
            </div>
          </div>
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-[#e8e0f0]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2d2d2d]">Paciente</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2d2d2d]">Email</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2d2d2d]">Teléfono</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2d2d2d]">Estado</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#2d2d2d]">Fecha Registro</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-[#2d2d2d]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#777]">
                    No hay pacientes para mostrar
                  </td>
                </tr>
              ) : (
                pacientes.map((paciente) => (
                  <tr key={paciente._id} className="border-b border-[#e8e0f0] hover:bg-[#f5f3f8] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] flex items-center justify-center text-white font-semibold">
                          {avatarUrls[paciente._id] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={avatarUrls[paciente._id]}
                              alt={`${paciente.nombre} ${paciente.apellidos}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span>{getInitials(paciente)}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-[#2d2d2d]">
                            {paciente.nombre} {paciente.apellidos}
                          </p>
                          <p className="text-sm text-[#777]">{paciente.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#2d2d2d]">{paciente.email}</td>
                    <td className="py-3 px-4 text-[#2d2d2d]">{paciente.telefono || "No especificado"}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          paciente.activo !== false
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {paciente.activo !== false ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#777] text-sm">{formatDate(paciente.createdAt)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onView(paciente)}
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Ver detalles"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onEdit(paciente)}
                          className="p-2 rounded-lg text-[#4a9a8a] hover:bg-[#f5f3f8] transition-colors"
                          title="Editar"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onToggleActive(paciente)}
                          className={`p-2 rounded-lg transition-colors ${
                            paciente.activo !== false
                              ? "text-orange-600 hover:bg-orange-50"
                              : "text-green-600 hover:bg-green-50"
                          }`}
                          title={paciente.activo !== false ? "Desactivar" : "Activar"}
                        >
                          {paciente.activo !== false ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => onDelete(paciente._id)}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          title="Desactivar"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

