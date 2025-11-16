'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  _id: string;
  nombres: string;
  apellidos: string;
  email: string;
  nombreUsuario: string;
  rol: string;
  photoKey: string | null;
}

export default function SysCrejuDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay sesión
    const storedUser = localStorage.getItem("syscreju_user");
    if (!storedUser) {
      router.push("/syscreju/login");
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/syscreju/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-[#2d2d2d]">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#2d2d2d] mb-2">
            Bienvenido, {user.nombres}
          </h2>
          <p className="text-[#777]">
            Gestiona el consultorio virtual desde este panel de administración
          </p>
        </div>

        {/* Cards de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#e8e0f0] shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#777] mb-1">Usuarios del Sistema</p>
                <p className="text-2xl font-bold text-[#2d2d2d]">-</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a8d5ba]/20 to-[#c4a8d5]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#4a9a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#e8e0f0] shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#777] mb-1">Pacientes</p>
                <p className="text-2xl font-bold text-[#2d2d2d]">-</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a8d5ba]/20 to-[#c4a8d5]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#4a9a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#e8e0f0] shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#777] mb-1">Citas Programadas</p>
                <p className="text-2xl font-bold text-[#2d2d2d]">-</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a8d5ba]/20 to-[#c4a8d5]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#4a9a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#e8e0f0] shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#777] mb-1">Servicios Activos</p>
                <p className="text-2xl font-bold text-[#2d2d2d]">-</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a8d5ba]/20 to-[#c4a8d5]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#4a9a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Secciones principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#e8e0f0] shadow-lg p-6">
            <h3 className="text-xl font-semibold text-[#2d2d2d] mb-4">
              Gestión de Usuarios
            </h3>
            <p className="text-[#777] mb-4">
              Administra los usuarios del sistema (admin, psicólogos, etc.)
            </p>
            <Link
              href="/syscreju/dashboard/usuarios"
              className="inline-block px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white hover:opacity-90 transition-opacity"
            >
              Gestionar Usuarios
            </Link>
          </div>

          <div className="bg-white/95 backdrop-blur rounded-2xl border border-[#e8e0f0] shadow-lg p-6">
            <h3 className="text-xl font-semibold text-[#2d2d2d] mb-4">
              Gestión de Pacientes
            </h3>
            <p className="text-[#777] mb-4">
              Administra los pacientes registrados en el sistema
            </p>
            <Link
              href="/syscreju/dashboard/pacientes"
              className="inline-block px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white hover:opacity-90 transition-opacity"
            >
              Gestionar Pacientes
            </Link>
          </div>
        </div>
    </div>
  );
}

