import Image from "next/image";

export default function About() {
  return (
    <section
      id="sobre-mi"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2d2d2d] mb-4">
            Sobre <span className="text-[#4a9a8a]">Mí</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] rounded-3xl transform -rotate-6 opacity-30"></div>
              <div className="relative bg-gradient-to-br from-[#e8e0f0] to-[#d4c4e8] rounded-3xl p-8 shadow-xl">
                <div className="aspect-square bg-white rounded-2xl flex items-center justify-center">
                  <Image
                    src="/logo-creciendo-juntos.png"
                    alt="Diana Campos Del Carpio"
                    width={200}
                    height={200}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-[#2d2d2d]">
              Diana Campos Del Carpio
            </h3>
            <p className="text-lg text-[#555] leading-relaxed">
              Soy psicóloga especializada en brindar acompañamiento emocional y terapéutico 
              a través de consultas virtuales. Mi enfoque se centra en crear un espacio seguro, 
              empático y profesional donde puedas explorar tus emociones, pensamientos y experiencias.
            </p>
            <p className="text-lg text-[#555] leading-relaxed">
              Creo firmemente en el poder del crecimiento personal y en que cada persona tiene 
              la capacidad de transformar su vida. Por eso, mi consultorio se llama 
              <span className="font-semibold text-[#4a9a8a]"> "Creciendo Juntos"</span> - 
              porque el proceso terapéutico es un viaje que hacemos juntos hacia tu bienestar.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] p-6 rounded-2xl text-white">
                <h4 className="font-bold text-xl mb-2">Enfoque Humanista</h4>
                <p className="text-sm opacity-90">
                  Terapia centrada en la persona con un enfoque integral
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#c4a8d5] to-[#4a9a8a] p-6 rounded-2xl text-white">
                <h4 className="font-bold text-xl mb-2">Espacio Seguro</h4>
                <p className="text-sm opacity-90">
                  Ambiente de confianza y respeto para tu proceso
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

