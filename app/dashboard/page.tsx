import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }
  const name = session.user?.name || "Usuario";

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#2d2d2d]">Resumen</h1>
        <p className="text-[#555] mt-1">
          Bienvenido, <span className="font-semibold">{name}</span>.
        </p>
      </header>

        {/* Tarjetas principales (mockups) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Mis Citas */}
          <div className="rounded-3xl bg-white/95 backdrop-blur border border-[#e8e0f0] shadow-lg p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#2d2d2d]">Mis Citas</h3>
              <span className="px-2 py-1 text-xs rounded-full bg-[#a8d5ba]/20 text-[#2d2d2d]">Mock</span>
            </div>
            <div className="space-y-3 flex-1">
              <div className="rounded-xl border border-[#f0eaf6] p-4 bg-[#faf9fd]">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-[#2d2d2d]">Terapia individual</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-[#a8d5ba]/20 text-[#2d2d2d]">Confirmada</span>
                </div>
                <p className="text-sm text-[#777] mt-1">Mar 22, 10:00 AM</p>
              </div>
              <div className="rounded-xl border border-[#f0eaf6] p-4 bg-[#faf9fd]">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-[#2d2d2d]">Terapia de pareja</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-[#c4a8d5]/20 text-[#2d2d2d]">Pendiente</span>
                </div>
                <p className="text-sm text-[#777] mt-1">Mar 29, 05:00 PM</p>
              </div>
              <div className="rounded-xl bg-[#f5f3f8] text-[#777] text-sm p-3">
                Próximamente podrás ver y gestionar todas tus citas aquí.
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Link
                href="/dashboard/citas"
                className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white hover:opacity-90 transition-opacity"
              >
                Ver todas
              </Link>
            </div>
          </div>

          {/* Servicios actuales */}
          <div className="rounded-3xl bg-white/95 backdrop-blur border border-[#e8e0f0] shadow-lg p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#2d2d2d]">Servicios actuales</h3>
              <span className="px-2 py-1 text-xs rounded-full bg-[#a8d5ba]/20 text-[#2d2d2d]">Mock</span>
            </div>
            <ul className="space-y-3 text-sm text-[#2d2d2d] flex-1">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#4a9a8a] mt-1.5" />
                <div>
                  <p className="font-medium">Plan Terapia Individual</p>
                  <p className="text-[#777]">2 sesiones restantes este mes</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#c4a8d5] mt-1.5" />
                <div>
                  <p className="font-medium">Soporte de Chat</p>
                  <p className="text-[#777]">Disponible 9:00 AM – 6:00 PM</p>
                </div>
              </li>
            </ul>
            <div className="mt-4 flex justify-end">
              <Link
                href="/dashboard/servicios"
                className="px-4 py-2 rounded-full text-sm font-medium border border-[#e8e0f0] hover:bg-[#f5f3f8] transition-colors"
              >
                Ver detalles
              </Link>
            </div>
          </div>

          {/* Chat */}
          <div className="rounded-3xl bg-white/95 backdrop-blur border border-[#e8e0f0] shadow-lg p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#2d2d2d]">Chat</h3>
              <span className="px-2 py-1 text-xs rounded-full bg-[#a8d5ba]/20 text-[#2d2d2d]">Mock</span>
            </div>
            <div className="rounded-2xl border border-[#f0eaf6] bg-[#faf9fd] p-4 text-[#777] flex-1">
              <p className="text-sm">Aquí verás tus conversaciones con tu psicólogo.</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="p-2 rounded-xl bg-white border border-[#e8e0f0]">Hola, ¿cómo te sientes hoy?</div>
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#a8d5ba]/15 to-[#c4a8d5]/15 border border-[#e8e0f0] self-end">
                  Un poco ansioso, me gustaría conversar.
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Link
                href="/dashboard/chat"
                className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white hover:opacity-90 transition-opacity"
              >
                Abrir chat
              </Link>
            </div>
          </div>

          {/* Calendario */}
          <div className="rounded-3xl bg-white/95 backdrop-blur border border-[#e8e0f0] shadow-lg p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#2d2d2d]">Calendario</h3>
              <span className="px-2 py-1 text-xs rounded-full bg-[#a8d5ba]/20 text-[#2d2d2d]">Mock</span>
            </div>
            <div className="flex-1 grid grid-cols-7 gap-2 text-sm">
              {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                <div key={i} className="text-center text-[#777]">{d}</div>
              ))}
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-xl border border-[#f0eaf6] py-3 text-center ${
                    i === 12 ? "bg-gradient-to-br from-[#a8d5ba]/20 to-[#c4a8d5]/20 font-semibold text-[#2d2d2d]" : "bg-[#faf9fd] text-[#2d2d2d]"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Link
                href="/dashboard/calendario"
                className="px-4 py-2 rounded-full text-sm font-medium border border-[#e8e0f0] hover:bg-[#f5f3f8] transition-colors"
              >
                Abrir calendario
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
}


