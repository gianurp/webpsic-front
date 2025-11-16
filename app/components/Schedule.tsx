'use client';

import { useState } from "react";
import Reveal from "./Reveal";

export default function Schedule() {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [name, setName] = useState<string>('');

  const buildWhatsAppUrl = () => {
    const base = 'https://wa.me/51994971261';
    const text = `Hola, soy ${name || '____'}. Quisiera agendar una cita para el ${date || '____'} a las ${time || '____'}.`;
    return `${base}?text=${encodeURIComponent(text)}`;
  };

  const buildMailtoUrl = () => {
    const subject = 'Solicitud de cita';
    const body = `Nombre: ${name || '____'}%0AFecha: ${date || '____'}%0AHora: ${time || '____'}%0A%0AGracias.`;
    return `mailto:cdelcarpio94@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <section id="agenda" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="pointer-events-none absolute -top-16 -left-16 w-72 h-72 bg-[#a8d5ba] opacity-20 blur-3xl animate-blob"></div>
      <div className="pointer-events-none absolute -bottom-16 -right-16 w-80 h-80 bg-[#c4a8d5] opacity-20 blur-3xl animate-blob" style={{ animationDelay: '6s' }}></div>

      <div className="container mx-auto max-w-5xl relative">
        <div className="text-center mb-12">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2d2d2d] mb-4">
              Agenda tu <span className="text-[#4a9a8a]">Cita</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] mx-auto"></div>
            <p className="text-lg text-[#555] mt-4 max-w-2xl mx-auto">
              Elige una fecha y hora tentativas. Te contactaremos para confirmar la disponibilidad.
            </p>
          </Reveal>
        </div>

        <Reveal className="grid md:grid-cols-2 gap-8">
          {/* Selector de fecha/hora */}
          <div className="glass-card rounded-3xl p-6 shadow-xl">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#2d2d2d] mb-2">Tu nombre</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
                  placeholder="Nombre y apellido"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2d2d2d] mb-2">Fecha</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2d2d2d] mb-2">Hora</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            <p className="text-xs text-[#777] mt-4">
              Horario de atención: Lunes a Viernes 9:00 - 20:00, Sábados 10:00 - 14:00.
            </p>
          </div>

          {/* CTA */}
          <div className="rounded-3xl p-6 shadow-xl bg-gradient-to-br from-[#e8e0f0] to-[#f5f3f8]">
            <h3 className="text-2xl font-bold text-[#2d2d2d] mb-4">Confirmación por el canal que prefieras</h3>
            <p className="text-[#555] mb-6">Puedes enviarnos tu solicitud por WhatsApp o por correo electrónico.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                className="flex-1 inline-flex items-center justify-center bg-[#25D366] text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                WhatsApp
              </a>
              <a
                href={buildMailtoUrl()}
                className="flex-1 inline-flex items-center justify-center bg-[#4a9a8a] text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Enviar Email
              </a>
            </div>
            <p className="text-xs text-[#777] mt-4">Te responderemos a la brevedad para confirmar.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


