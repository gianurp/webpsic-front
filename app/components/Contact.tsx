'use client';

import { useState } from "react";
import Reveal from "./Reveal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    const mailtoLink = `mailto:cdelcarpio94@gmail.com?subject=Consulta desde web&body=Nombre: ${formData.name}%0AEmail: ${formData.email}%0ATeléfono: ${formData.phone}%0AMensaje: ${formData.message}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contacto"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f5f3f8] to-white"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2d2d2d] mb-4">
              Contáctame
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] mx-auto mb-4"></div>
            <p className="text-lg text-[#555] max-w-2xl mx-auto">
              Estoy aquí para ayudarte. Agenda tu consulta o envíame un mensaje
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <Reveal className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#2d2d2d] mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2d2d2d] mb-1">Email</h4>
                    <a href="mailto:cdelcarpio94@gmail.com" className="text-[#4a9a8a] hover:underline">
                      cdelcarpio94@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c4a8d5] to-[#4a9a8a] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2d2d2d] mb-1">Teléfono</h4>
                    <a href="tel:+51994971261" className="text-[#4a9a8a] hover:underline">
                      +51 994 971 261
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4a9a8a] to-[#a8d5ba] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2d2d2d] mb-1">Horarios</h4>
                    <p className="text-[#555]">Lunes a Viernes: 9:00 AM - 8:00 PM</p>
                    <p className="text-[#555]">Sábados: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#2d2d2d] mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#2d2d2d] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#2d2d2d] mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
                  placeholder="+51 999 999 999"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#2d2d2d] mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors resize-none"
                  placeholder="Cuéntame cómo puedo ayudarte..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Enviar Mensaje
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

