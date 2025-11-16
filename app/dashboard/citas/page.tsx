import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CitasPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?callbackUrl=/dashboard/citas");
  }

  // Mock data
  const citas = [
    {
      id: 1,
      fecha: "Mar 22, 2024",
      hora: "10:00 AM",
      tipo: "Terapia individual",
      estado: "Confirmada",
      psicologo: "Diana Campos Del Carpio",
    },
    {
      id: 2,
      fecha: "Mar 29, 2024",
      hora: "05:00 PM",
      tipo: "Terapia de pareja",
      estado: "Pendiente",
      psicologo: "Diana Campos Del Carpio",
    },
    {
      id: 3,
      fecha: "Abr 5, 2024",
      hora: "11:00 AM",
      tipo: "Terapia individual",
      estado: "Confirmada",
      psicologo: "Diana Campos Del Carpio",
    },
  ];

  const estados = {
    Confirmada: "bg-[#a8d5ba]/20 text-[#2d2d2d]",
    Pendiente: "bg-[#c4a8d5]/20 text-[#2d2d2d]",
    Cancelada: "bg-red-100 text-red-700",
  };

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#2d2d2d]">Mis Citas</h1>
        <p className="text-[#555] mt-1">Gestiona y visualiza todas tus citas programadas</p>
      </header>

      <div className="bg-white/95 backdrop-blur rounded-3xl border border-[#e8e0f0] shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#2d2d2d]">Próximas Citas</h2>
          <span className="px-3 py-1 text-xs rounded-full bg-[#a8d5ba]/20 text-[#2d2d2d]">Mock</span>
        </div>

        {citas.length === 0 ? (
          <div className="text-center py-12 text-[#777]">
            <p>No tienes citas programadas</p>
          </div>
        ) : (
          <div className="space-y-4">
            {citas.map((cita) => (
              <div
                key={cita.id}
                className="rounded-xl border border-[#f0eaf6] p-6 bg-[#faf9fd] hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-[#2d2d2d]">{cita.tipo}</h3>
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${estados[cita.estado as keyof typeof estados]}`}>
                        {cita.estado}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-[#777]">
                      <p className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {cita.fecha} a las {cita.hora}
                      </p>
                      <p className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {cita.psicologo}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-full text-sm font-medium border border-[#e8e0f0] hover:bg-[#f5f3f8] transition-colors">
                      Ver detalles
                    </button>
                    {cita.estado === "Pendiente" && (
                      <button className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white hover:opacity-90 transition-opacity">
                        Confirmar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-[#e8e0f0]">
          <button className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white hover:opacity-90 transition-opacity">
            Agendar Nueva Cita
          </button>
        </div>
      </div>
    </div>
  );
}

