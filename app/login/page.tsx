'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";
import { signIn } from "next-auth/react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false
    });
    setIsLoading(false);
    if (res?.error) {
      alert(res.error || "Credenciales inválidas");
    } else {
      // redirigir a inicio
      window.location.href = "/";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-[#e8e0f0] via-[#f5f3f8] to-[#d4c4e8]">
        <div className="container mx-auto max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo-creciendo-juntos.png"
                alt="Creciendo Juntos Logo"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#2d2d2d] mb-2">
              Iniciar Sesión
            </h1>
            <p className="text-[#555]">
              Accede a tu consultorio virtual
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-[#e8e0f0]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#2d2d2d] mb-2">
                  Correo Electrónico
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
                <label htmlFor="password" className="block text-sm font-medium text-[#2d2d2d] mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#4a9a8a] transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0A9.97 9.97 0 015 12c0 1.657.34 3.23.95 4.657M8.29 8.29L12 12m-3.71-3.71L5.05 5.343M12 12l3.71 3.71M12 12l-3.71-3.71m7.42 7.42L18.95 18.657A9.97 9.97 0 0019 12a9.97 9.97 0 00-.95-4.657M12 12l3.71 3.71" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#4a9a8a] border-[#e8e0f0] rounded focus:ring-[#4a9a8a]"
                  />
                  <span className="ml-2 text-[#555]">Recordarme</span>
                </label>
                <a href="#" className="text-[#4a9a8a] hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <Link
                href="/syscreju/login"
                className="text-sm text-[#4a9a8a] hover:text-[#2d2d2d] transition-colors font-medium"
              >
                ¿Eres administrador? Accede al sistema aquí
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-[#555]">
                ¿No tienes una cuenta?{' '}
                <Link href="/registro" className="text-[#4a9a8a] font-semibold hover:underline">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#555]">
              ¿Necesitas ayuda?{' '}
              <a href="/#contacto" className="text-[#4a9a8a] hover:underline">
                Contáctanos
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

