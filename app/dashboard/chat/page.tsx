import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?callbackUrl=/dashboard/chat");
  }

  // Mock data - mensajes
  const mensajes = [
    {
      id: 1,
      remitente: "psicologo",
      texto: "Hola, ¿cómo te sientes hoy?",
      fecha: "Hoy, 9:30 AM",
    },
    {
      id: 2,
      remitente: "usuario",
      texto: "Un poco ansioso, me gustaría conversar.",
      fecha: "Hoy, 9:32 AM",
    },
    {
      id: 3,
      remitente: "psicologo",
      texto: "Entiendo. ¿Quieres contarme qué te está generando ansiedad?",
      fecha: "Hoy, 9:35 AM",
    },
    {
      id: 4,
      remitente: "usuario",
      texto: "Principalmente el trabajo y algunas situaciones familiares.",
      fecha: "Hoy, 9:40 AM",
    },
    {
      id: 5,
      remitente: "psicologo",
      texto: "Gracias por compartirlo. Vamos a trabajar juntos en esto. ¿Te parece bien si agendamos una sesión para profundizar?",
      fecha: "Hoy, 9:42 AM",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#2d2d2d]">Chat</h1>
        <p className="text-[#555] mt-1">Conversa con tu psicólogo en tiempo real</p>
      </header>

      <div className="bg-white/95 backdrop-blur rounded-3xl border border-[#e8e0f0] shadow-lg overflow-hidden flex flex-col" style={{ height: "calc(100vh - 250px)", minHeight: "600px" }}>
        {/* Header del chat */}
        <div className="p-6 border-b border-[#e8e0f0] bg-gradient-to-r from-[#a8d5ba]/10 to-[#c4a8d5]/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] flex items-center justify-center text-white font-semibold text-lg">
                DC
              </div>
              <div>
                <h3 className="font-semibold text-[#2d2d2d]">Diana Campos Del Carpio</h3>
                <p className="text-sm text-[#777]">Psicóloga • En línea</p>
              </div>
            </div>
            <span className="px-3 py-1 text-xs rounded-full bg-[#a8d5ba]/20 text-[#2d2d2d]">Mock</span>
          </div>
        </div>

        {/* Área de mensajes */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-[#faf9fd] to-white">
          {mensajes.map((mensaje) => (
            <div
              key={mensaje.id}
              className={`flex ${mensaje.remitente === "usuario" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  mensaje.remitente === "usuario"
                    ? "bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] text-white"
                    : "bg-white border border-[#e8e0f0] text-[#2d2d2d]"
                }`}
              >
                <p className="text-sm leading-relaxed">{mensaje.texto}</p>
                <p
                  className={`text-xs mt-2 ${
                    mensaje.remitente === "usuario" ? "text-white/70" : "text-[#777]"
                  }`}
                >
                  {mensaje.fecha}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input de mensaje */}
        <div className="p-6 border-t border-[#e8e0f0] bg-white">
          <div className="flex gap-3">
            <input
              disabled
              type="text"
              placeholder="Escribe un mensaje (mock - funcionalidad próximamente)"
              className="flex-1 px-4 py-3 rounded-full border border-[#e8e0f0] bg-[#faf9fd] text-[#777] focus:outline-none focus:border-[#4a9a8a] transition-colors disabled:cursor-not-allowed"
            />
            <button
              disabled
              className="px-6 py-3 rounded-full font-medium bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Enviar
            </button>
          </div>
          <p className="text-xs text-[#777] mt-2 text-center">
            El chat estará disponible próximamente. Por ahora, puedes contactar por WhatsApp o email.
          </p>
        </div>
      </div>
    </div>
  );
}

