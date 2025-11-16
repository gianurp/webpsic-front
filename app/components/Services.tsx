import Reveal from "./Reveal";

export default function Services() {
  const services = [
    {
      title: "Terapia Individual",
      description: "Sesiones personalizadas enfocadas en tus necesidades específicas. Trabajamos juntos en tus objetivos de bienestar emocional.",
      icon: "🧠",
      color: "from-[#a8d5ba] to-[#c4a8d5]",
    },
    {
      title: "Terapia de Pareja",
      description: "Acompañamiento para parejas que buscan mejorar su comunicación, resolver conflictos y fortalecer su relación.",
      icon: "💑",
      color: "from-[#c4a8d5] to-[#4a9a8a]",
    },
    {
      title: "Terapia Familiar",
      description: "Espacio para trabajar dinámicas familiares, mejorar la comunicación y fortalecer los vínculos familiares.",
      icon: "👨‍👩‍👧‍👦",
      color: "from-[#4a9a8a] to-[#a8d5ba]",
    },
    {
      title: "Terapia Online",
      description: "Sesiones virtuales desde la comodidad de tu hogar. Misma calidad profesional, mayor accesibilidad y flexibilidad.",
      icon: "💻",
      color: "from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a]",
    },
    {
      title: "Manejo de Ansiedad",
      description: "Estrategias y herramientas para gestionar la ansiedad, el estrés y mejorar tu calidad de vida.",
      icon: "🌱",
      color: "from-[#c4a8d5] to-[#a8d5ba]",
    },
    {
      title: "Desarrollo Personal",
      description: "Acompañamiento en tu proceso de autoconocimiento, crecimiento personal y desarrollo de habilidades emocionales.",
      icon: "✨",
      color: "from-[#4a9a8a] to-[#c4a8d5]",
    },
  ];

  return (
    <section
      id="servicios"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#f5f3f8]"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2d2d2d] mb-4">
              Mis <span className="text-[#4a9a8a]">Servicios</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] mx-auto mb-4"></div>
            <p className="text-lg text-[#555] max-w-2xl mx-auto">
              Ofrezco una variedad de servicios terapéuticos adaptados a tus necesidades
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Reveal
              key={index}
              delayMs={index * 100}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-[#e8e0f0]"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl mb-6`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-[#2d2d2d] mb-4">
                {service.title}
              </h3>
              <p className="text-[#555] leading-relaxed">
                {service.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

