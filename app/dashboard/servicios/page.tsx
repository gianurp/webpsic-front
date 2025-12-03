import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ServiciosPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?callbackUrl=/dashboard/servicios");
  }

  // Mock data
  const servicios = [
    {
      id: 1,
      nombre: "Plan Terapia Individual",
      descripcion: "Sesiones individuales de terapia psicológica",
      sesionesRestantes: 2,
      sesionesTotales: 8,
      estado: "Activo",
      fechaInicio: "Ene 15, 2024",
      fechaFin: "Abr 15, 2024",
    },
    {
      id: 2,
      nombre: "Soporte de Chat",
      descripcion: "Chat disponible de 9:00 AM a 6:00 PM",
      sesionesRestantes: "Ilimitado",
      sesionesTotales: "Ilimitado",
      estado: "Activo",
      fechaInicio: "Ene 10, 2024",
      fechaFin: "Indefinido",
    },
    {
      id: 3,
      nombre: "Terapia de Pareja",
      descripcion: "Sesiones de terapia para parejas",
      sesionesRestantes: 0,
      sesionesTotales: 4,
      estado: "Finalizado",
      fechaInicio: "Nov 1, 2023",
      fechaFin: "Dic 15, 2023",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#2d2d2d]">Mis Servicios</h1>
        <p className="text-[#555] mt-1">Gestiona tus planes y servicios activos</p>
      </header>

      <div className="space-y-6">
        {servicios.map((servicio) => (
          <div
            key={servicio.id}
            className="bg-white/95 backdrop-blur rounded-3xl border border-[#e8e0f0] shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-[#2d2d2d]">{servicio.nombre}</h3>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      servicio.estado === "Activo"
                        ? "bg-[#a8d5ba]/20 text-[#2d2d2d]"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {servicio.estado}
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-[#a8d5ba]/20 text-[#2d2d2d]">Mock</span>
                </div>
                <p className="text-[#777] mb-4">{servicio.descripcion}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[#777] mb-1">Sesiones restantes</p>
                    <p className="font-semibold text-[#2d2d2d]">
                      {servicio.sesionesRestantes} {typeof servicio.sesionesRestantes === "number" && `de ${servicio.sesionesTotales}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#777] mb-1">Período</p>
                    <p className="font-semibold text-[#2d2d2d]">
                      {servicio.fechaInicio} - {servicio.fechaFin}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {servicio.estado === "Activo" && (
                  <button className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white hover:opacity-90 transition-opacity">
                    Agendar Sesión
                  </button>
                )}
                <button className="px-4 py-2 rounded-full text-sm font-medium border border-[#e8e0f0] hover:bg-[#f5f3f8] transition-colors">
                  Ver detalles
                </button>
              </div>
            </div>

            {/* Barra de progreso para servicios con sesiones limitadas */}
            {typeof servicio.sesionesRestantes === "number" && typeof servicio.sesionesTotales === "number" && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-[#777] mb-1">
                  <span>Progreso</span>
                  <span>
                    {servicio.sesionesTotales - servicio.sesionesRestantes} / {servicio.sesionesTotales} sesiones
                  </span>
                </div>
                <div className="w-full bg-[#e8e0f0] rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] h-2 rounded-full transition-all"
                    style={{
                      width: `${((servicio.sesionesTotales - servicio.sesionesRestantes) / servicio.sesionesTotales) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white/95 backdrop-blur rounded-3xl border border-[#e8e0f0] shadow-lg p-6">
        <h3 className="text-lg font-semibold text-[#2d2d2d] mb-4">Contratar Nuevo Servicio</h3>
        <p className="text-[#777] mb-4">Explora nuestros planes y servicios disponibles</p>
        <button className="px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white hover:opacity-90 transition-opacity">
          Ver Servicios Disponibles
        </button>
      </div>
    </div>
  );
}

