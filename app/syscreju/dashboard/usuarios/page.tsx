export default function UsuariosPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#2d2d2d]">Gestión de Usuarios del Sistema</h1>
        <p className="text-[#555] mt-1">Administra los usuarios del sistema (admin, psicólogos, etc.)</p>
      </header>

      <div className="bg-white/95 backdrop-blur rounded-3xl border border-[#e8e0f0] shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#2d2d2d]">Lista de Usuarios</h2>
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white hover:opacity-90 transition-opacity">
            + Nuevo Usuario
          </button>
        </div>

        <div className="text-center py-12 text-[#777]">
          <p>Funcionalidad en desarrollo</p>
          <p className="text-sm mt-2">Aquí se mostrará la lista de usuarios del sistema</p>
        </div>
      </div>
    </div>
  );
}

