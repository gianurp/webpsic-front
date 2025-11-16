import Reveal from "./Reveal";

export default function Testimonials() {
  const testimonials = [
    {
      name: "María G.",
      text: "Las sesiones con Diana han sido transformadoras. Me siento escuchada y comprendida. El espacio virtual es tan acogedor como presencial.",
      rating: 5,
    },
    {
      name: "Carlos R.",
      text: "Gracias a la terapia de pareja, hemos mejorado nuestra comunicación significativamente. Diana tiene un enfoque muy profesional y empático.",
      rating: 5,
    },
    {
      name: "Ana L.",
      text: "El proceso de crecimiento personal ha sido increíble. Diana me ha ayudado a entender mejor mis emociones y a desarrollar herramientas valiosas.",
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonios"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2d2d2d] mb-4">
              Testimonios
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] mx-auto mb-4"></div>
            <p className="text-lg text-[#555] max-w-2xl mx-auto">
              Lo que dicen las personas que han trabajado conmigo
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={index}
              delayMs={index * 120}
              className="bg-gradient-to-br from-[#f5f3f8] to-white rounded-2xl p-8 shadow-lg border-2 border-[#e8e0f0]"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[#555] leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <span className="font-semibold text-[#2d2d2d]">
                  {testimonial.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

