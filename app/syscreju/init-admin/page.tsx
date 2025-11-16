'use client';

import { useState } from "react";

export default function InitAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [secret, setSecret] = useState("");

  const handleInit = async () => {
    if (!secret) {
      alert("Por favor ingresa la clave secreta");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/syscreju/init-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: secret || "" }),
      });

      const data = await res.json();
      setResult(data);
    } catch (error: any) {
      setResult({ error: "Error al crear el usuario admin" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8e0f0] via-[#f5f3f8] to-[#d4c4e8] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl border border-[#e8e0f0] p-8">
          <h1 className="text-2xl font-bold text-[#2d2d2d] mb-4 text-center">
            Inicializar Usuario Admin
          </h1>
          <p className="text-sm text-[#777] mb-6 text-center">
            Crea el usuario administrador por defecto del sistema
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="secret" className="block text-sm font-medium text-[#2d2d2d] mb-2">
                Clave Secreta (opcional en desarrollo)
              </label>
              <input
                type="password"
                id="secret"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#e8e0f0] focus:border-[#4a9a8a] focus:outline-none transition-colors"
                placeholder="Deja vacío si no tienes ADMIN_INIT_SECRET configurado"
              />
              <p className="text-xs text-[#777] mt-1">
                En desarrollo puedes dejar vacío. En producción configura ADMIN_INIT_SECRET en .env.local
              </p>
            </div>

            <button
              onClick={handleInit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creando..." : "Crear Usuario Admin"}
            </button>

            {result && (
              <div
                className={`p-4 rounded-lg ${
                  result.error
                    ? "bg-red-50 border border-red-200 text-red-700"
                    : "bg-green-50 border border-green-200 text-green-700"
                }`}
              >
                {result.error ? (
                  <p className="text-sm">{result.error}</p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">{result.message}</p>
                    {result.user && (
                      <div className="text-xs mt-2 space-y-1">
                        <p>
                          <strong>Email:</strong> {result.user.email}
                        </p>
                        <p>
                          <strong>Usuario:</strong> {result.user.nombreUsuario}
                        </p>
                        <p>
                          <strong>Contraseña por defecto:</strong> {result.defaultPassword}
                        </p>
                        <p className="mt-2 text-red-600 font-semibold">
                          ⚠️ Cambia la contraseña después del primer inicio de sesión
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

