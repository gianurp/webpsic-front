import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CalendarioPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?callbackUrl=/dashboard/calendario");
  }

  // Mock data - días con citas
  const citasCalendario: { [key: number]: { tipo: string; hora: string } } = {
    5: { tipo: "Terapia individual", hora: "10:00 AM" },
    12: { tipo: "Terapia de pareja", hora: "05:00 PM" },
    19: { tipo: "Terapia individual", hora: "11:00 AM" },
    26: { tipo: "Seguimiento", hora: "03:00 PM" },
  };

  const diasSemana = ["L", "M", "M", "J", "V", "S", "D"];
  const diasMes = Array.from({ length: 28 }, (_, i) => i + 1);
  const hoy = new Date().getDate();

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#2d2d2d]">Calendario</h1>
        <p className="text-[#555] mt-1">Visualiza tus citas en el calendario mensual</p>
      </header>

      <div className="bg-white/95 backdrop-blur rounded-3xl border border-[#e8e0f0] shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#2d2d2d]">Marzo 2024</h2>
            <p className="text-sm text-[#777] mt-1">Selecciona un día para ver más detalles</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-[#e8e0f0] hover:bg-[#f5f3f8] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-2 rounded-lg border border-[#e8e0f0] hover:bg-[#f5f3f8] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-4">
          <span className="px-3 py-1 text-xs rounded-full bg-[#a8d5ba]/20 text-[#2d2d2d]">Mock</span>
        </div>

        {/* Calendario Grid */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {diasSemana.map((dia, i) => (
            <div key={i} className="text-center text-sm font-semibold text-[#777] py-2">
              {dia}
            </div>
          ))}
          {diasMes.map((dia) => {
            const tieneCita = citasCalendario[dia];
            const esHoy = dia === hoy;
            return (
              <div
                key={dia}
                className={`rounded-xl border-2 p-3 min-h-[80px] flex flex-col ${
                  esHoy
                    ? "bg-gradient-to-br from-[#a8d5ba]/30 to-[#c4a8d5]/30 border-[#4a9a8a]"
                    : tieneCita
                    ? "bg-gradient-to-br from-[#a8d5ba]/15 to-[#c4a8d5]/15 border-[#e8e0f0] hover:border-[#4a9a8a]"
                    : "bg-[#faf9fd] border-[#e8e0f0] hover:border-[#c4a8d5]"
                } transition-all cursor-pointer`}
              >
                <div className={`text-sm font-semibold mb-1 ${esHoy ? "text-[#2d2d2d]" : "text-[#2d2d2d]"}`}>
                  {dia}
                </div>
                {tieneCita && (
                  <div className="mt-auto">
                    <div className="text-xs font-medium text-[#2d2d2d] truncate">{tieneCita.tipo}</div>
                    <div className="text-xs text-[#777]">{tieneCita.hora}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Leyenda */}
        <div className="flex flex-wrap gap-4 items-center pt-6 border-t border-[#e8e0f0]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-[#a8d5ba]/30 to-[#c4a8d5]/30 border-2 border-[#4a9a8a]"></div>
            <span className="text-sm text-[#777]">Hoy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-[#a8d5ba]/15 to-[#c4a8d5]/15 border border-[#e8e0f0]"></div>
            <span className="text-sm text-[#777]">Con cita</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#faf9fd] border border-[#e8e0f0]"></div>
            <span className="text-sm text-[#777]">Disponible</span>
          </div>
        </div>
      </div>
    </div>
  );
}

