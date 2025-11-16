export default function ReportesPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#2d2d2d]">Reportes y Estadísticas</h1>
        <p className="text-[#555] mt-1">Visualiza reportes y estadísticas del consultorio</p>
      </header>

      <div className="bg-white/95 backdrop-blur rounded-3xl border border-[#e8e0f0] shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#2d2d2d]">Reportes Disponibles</h2>
        </div>

        <div className="text-center py-12 text-[#777]">
          <p>Funcionalidad en desarrollo</p>
          <p className="text-sm mt-2">Aquí se mostrarán los reportes y estadísticas</p>
        </div>
      </div>
    </div>
  );
}

