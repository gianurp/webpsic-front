'use client';

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8e0f0] via-[#f5f3f8] to-[#d4c4e8]"></div>

      {/* Animated blobs for a calming feel */}
      <div className="pointer-events-none absolute -top-10 -right-10 w-72 h-72 bg-[#a8d5ba] opacity-30 blur-3xl animate-blob"></div>
      <div className="pointer-events-none absolute -bottom-10 -left-10 w-80 h-80 bg-[#c4a8d5] opacity-30 blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#4a9a8a] opacity-20 blur-3xl animate-blob" style={{ animationDelay: '8s' }}></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center md:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2d2d2d] leading-tight">
              Bienestar Emocional
              <span className="block bg-gradient-to-r from-[#4a9a8a] via-[#a8d5ba] to-[#c4a8d5] bg-clip-text text-transparent animate-pulse-soft">
                Creciendo Juntos
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-[#555] leading-relaxed">
              Consultorio virtual de psicología donde encontrarás un espacio seguro 
              para trabajar en tu bienestar emocional y mental. 
              <span className="font-semibold text-[#4a9a8a]"> Creciendo juntos</span> hacia una vida más plena.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={scrollToContact}
                className="bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Agendar Consulta
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('servicios');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-[#4a9a8a] text-[#4a9a8a] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#4a9a8a] hover:text-white transition-all"
              >
                Ver Servicios
              </button>
            </div>
          </div>

          {/* Right Column - Image/Illustration */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] rounded-3xl transform rotate-6 opacity-20"></div>
              <div className="relative glass-card rounded-3xl p-8 shadow-2xl animate-float-slow">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-[#a8d5ba]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#c4a8d5]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#4a9a8a]"></div>
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-[#2d2d2d]">Terapia Online</h3>
                    <p className="text-[#555]">Sesiones desde la comodidad de tu hogar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

