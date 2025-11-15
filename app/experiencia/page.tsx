import Image from "next/image";
import Footer from "../components/Footer";

export default function Experiencia() {
  const experiences = [
    {
      title: "Formación Académica",
      items: [
        {
          year: "2020",
          description: "Licenciatura en Psicología - Universidad Nacional Mayor de San Marcos",
        },
        {
          year: "2022",
          description: "Especialización en Terapia Cognitivo-Conductual",
        },
        {
          year: "2023",
          description: "Certificación en Terapia Online y Psicología Digital",
        },
      ],
    },
    {
      title: "Experiencia Profesional",
      items: [
        {
          year: "2021 - Presente",
          description: "Psicóloga Clínica - Consultorio Virtual Creciendo Juntos. Especializada en terapia individual, de pareja y familiar.",
        },
        {
          year: "2020 - 2021",
          description: "Psicóloga en Centro de Salud Mental Comunitario. Trabajo con adolescentes y adultos en situaciones de crisis.",
        },
        {
          year: "2019 - 2020",
          description: "Practicante en Hospital Nacional. Experiencia en evaluación psicológica y apoyo emocional.",
        },
      ],
    },
    {
      title: "Áreas de Especialización",
      items: [
        {
          year: "",
          description: "Terapia Cognitivo-Conductual (TCC)",
        },
        {
          year: "",
          description: "Terapia de Pareja y Familiar",
        },
        {
          year: "",
          description: "Manejo de Ansiedad y Estrés",
        },
        {
          year: "",
          description: "Desarrollo Personal y Autoestima",
        },
        {
          year: "",
          description: "Psicología Online y Terapia Digital",
        },
      ],
    },
  ];

  const certifications = [
    {
      name: "Terapia Cognitivo-Conductual",
      institution: "Instituto de Psicología Aplicada",
      year: "2022",
    },
    {
      name: "Terapia Online y Psicología Digital",
      institution: "Asociación de Psicología Online",
      year: "2023",
    },
    {
      name: "Intervención en Crisis",
      institution: "Colegio de Psicólogos del Perú",
      year: "2021",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#e8e0f0] via-[#f5f3f8] to-[#d4c4e8] relative overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#a8d5ba] rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-[#c4a8d5] rounded-full opacity-20 blur-3xl"></div>
        
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2d2d2d] mb-6">
            Mi <span className="bg-gradient-to-r from-[#4a9a8a] via-[#a8d5ba] to-[#c4a8d5] bg-clip-text text-transparent">
              Experiencia
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[#555] max-w-2xl mx-auto">
            Conoce mi trayectoria profesional, formación académica y especializaciones 
            en el campo de la psicología clínica
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          {/* About Section */}
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative w-full max-w-sm mx-auto">
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
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-[#2d2d2d]">
                  Diana Campos Del Carpio
                </h2>
                <p className="text-lg text-[#555] leading-relaxed">
                  Con más de 4 años de experiencia en el campo de la psicología clínica, 
                  me especializo en brindar acompañamiento terapéutico de calidad a través 
                  de consultas virtuales. Mi enfoque se centra en crear un espacio seguro 
                  y empático donde cada persona pueda explorar sus emociones y trabajar 
                  hacia su bienestar.
                </p>
                <p className="text-lg text-[#555] leading-relaxed">
                  Creo firmemente en la importancia de la formación continua y en adaptar 
                  las técnicas terapéuticas a las necesidades individuales de cada persona. 
                  Mi práctica combina enfoques basados en evidencia con un toque humano y 
                  personalizado.
                </p>
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          {experiences.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-16">
              <h3 className="text-3xl font-bold text-[#2d2d2d] mb-8 text-center">
                {section.title}
              </h3>
              <div className="space-y-6">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="bg-gradient-to-br from-[#f5f3f8] to-white rounded-2xl p-6 shadow-lg border-2 border-[#e8e0f0] hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {item.year && (
                        <div className="flex-shrink-0">
                          <span className="inline-block bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white px-4 py-2 rounded-full font-semibold text-sm">
                            {item.year}
                          </span>
                        </div>
                      )}
                      <p className="text-[#555] text-lg leading-relaxed flex-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Certifications */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-[#2d2d2d] mb-8 text-center">
              Certificaciones y Cursos
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#a8d5ba] to-[#c4a8d5] rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1"
                >
                  <h4 className="font-bold text-xl mb-2">{cert.name}</h4>
                  <p className="text-sm opacity-90 mb-2">{cert.institution}</p>
                  <p className="text-sm opacity-75">{cert.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-[#e8e0f0] to-[#d4c4e8] rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-[#2d2d2d] mb-4">
                ¿Listo para comenzar tu proceso?
              </h3>
              <p className="text-lg text-[#555] mb-8 max-w-2xl mx-auto">
                Agenda una consulta y trabajemos juntos hacia tu bienestar emocional
              </p>
              <a
                href="/#contacto"
                className="inline-block bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Agendar Consulta
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

