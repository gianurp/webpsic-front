'use client';

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function SysCrejuDashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  // Sidebar visible por defecto
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

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

      // Cargar avatar si existe
      if (userData.photoKey) {
        loadAvatar(userData.photoKey);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/syscreju/login");
    }
  }, [router]);

  const loadAvatar = useCallback(async (photoKey: string) => {
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
      console.error("Error loading avatar:", error);
    }
  }, []);

  // Escuchar evento de actualización de perfil
  useEffect(() => {
    const handleProfileUpdate = async (event: CustomEvent) => {
      const updatedUser = event.detail?.user;
      if (updatedUser) {
        setUser(updatedUser);
        // Actualizar avatar si hay photoKey
        if (updatedUser.photoKey) {
          await loadAvatar(updatedUser.photoKey);
        } else {
          setAvatarUrl(null);
        }
      } else {
        // Si no viene en el evento, recargar desde localStorage
        const storedUser = localStorage.getItem("syscreju_user");
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            if (userData.photoKey) {
              await loadAvatar(userData.photoKey);
            } else {
              setAvatarUrl(null);
            }
          } catch (error) {
            console.error("Error parsing user data:", error);
          }
        }
      }
    };

    window.addEventListener("syscreju-profile-updated", handleProfileUpdate as EventListener);
    return () => {
      window.removeEventListener("syscreju-profile-updated", handleProfileUpdate as EventListener);
    };
  }, [loadAvatar]);

  const handleLogout = () => {
    localStorage.removeItem("syscreju_user");
    localStorage.removeItem("syscreju_token");
    router.push("/syscreju/login");
  };

  const menuItems = [
    {
      href: '/syscreju/dashboard',
      label: 'Resumen',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      href: '/syscreju/dashboard/usuarios',
      label: 'Usuarios del Sistema',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      href: '/syscreju/dashboard/pacientes',
      label: 'Pacientes',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      href: '/syscreju/dashboard/citas',
      label: 'Citas',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      href: '/syscreju/dashboard/servicios',
      label: 'Servicios',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      href: '/syscreju/dashboard/reportes',
      label: 'Reportes',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      href: '/syscreju/dashboard/perfil',
      label: 'Mi Perfil',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  const isActive = (href: string) => {
    if (href === '/syscreju/dashboard') {
      return pathname === '/syscreju/dashboard';
    }
    return pathname?.startsWith(href);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e8e0f0] via-[#f5f3f8] to-[#d4c4e8] flex items-center justify-center">
        <div className="text-[#2d2d2d]">Cargando...</div>
      </div>
    );
  }

  const initials = `${user.nombres?.charAt(0) || ''}${user.apellidos?.charAt(0) || ''}`.toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8e0f0] via-[#f5f3f8] to-[#d4c4e8]">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen z-40 bg-white/95 backdrop-blur-md border-r border-[#e8e0f0] shadow-lg transition-all duration-300 ease-in-out ${
          isSidebarOpen 
            ? 'translate-x-0 w-64' 
            : '-translate-x-full'
        } overflow-hidden`}
      >
        <div className="h-full flex flex-col w-64">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-[#e8e0f0]">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo-creciendo-juntos.png"
                alt="Creciendo Juntos"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold text-[#2d2d2d]">Sistema</h2>
                <p className="text-xs text-[#777]">Creciendo Juntos</p>
              </div>
            </div>
          </div>
          
          {/* Sidebar Menu */}
          <nav className="flex-1 overflow-y-auto p-6">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    // Solo cerrar el sidebar en móvil, no en desktop
                    if (window.innerWidth < 1024) {
                      setIsSidebarOpen(false);
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white shadow-md'
                      : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area (Header + Content) */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
      }`}>
        {/* Header del Sistema */}
        <header className="bg-white/95 backdrop-blur border-b border-[#e8e0f0] shadow-sm sticky top-0 z-30 w-full">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Botón Hamburguesa - Visible en todos los tamaños */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg text-[#2d2d2d] hover:bg-[#f5f3f8] transition-colors"
                  aria-label="Toggle sidebar"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                <div className="flex items-center gap-4">
                  <div className="hidden lg:flex items-center gap-3">
                    <Image
                      src="/logo-creciendo-juntos.png"
                      alt="Creciendo Juntos"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h1 className="text-xl font-bold text-[#2d2d2d]">
                        Sistema Creciendo Juntos
                      </h1>
                      <p className="text-sm text-[#777]">Panel de Administración</p>
                    </div>
                  </div>
                  <div className="lg:hidden">
                    <h1 className="text-lg font-bold text-[#2d2d2d]">
                      Sistema
                    </h1>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-[#2d2d2d]">
                      {user.nombres} {user.apellidos}
                    </p>
                    <p className="text-xs text-[#777] capitalize">{user.rol}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 sm:px-4 py-2 rounded-lg text-sm font-medium border border-[#e8e0f0] hover:bg-[#f5f3f8] transition-colors"
                >
                  <span className="hidden sm:inline">Salir</span>
                  <svg className="w-5 h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

