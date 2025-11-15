import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo-creciendo-juntos.png"
                alt="Creciendo Juntos Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="text-xl font-bold">Creciendo Juntos</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Consultorio virtual de psicología dedicado a tu bienestar emocional y mental. 
              Creciendo juntos hacia una vida más plena.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-gray-300 hover:text-[#a8d5ba] transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#sobre-mi" className="text-gray-300 hover:text-[#a8d5ba] transition-colors">
                  Sobre Mí
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-gray-300 hover:text-[#a8d5ba] transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#testimonios" className="text-gray-300 hover:text-[#a8d5ba] transition-colors">
                  Testimonios
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-gray-300 hover:text-[#a8d5ba] transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:cdelcarpio94@gmail.com" className="hover:text-[#a8d5ba] transition-colors">
                  cdelcarpio94@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+51994971261" className="hover:text-[#a8d5ba] transition-colors">
                  +51 994 971 261
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Creciendo Juntos - Diana Campos Del Carpio. Todos los derechos reservados.
            </p>
            <p className="text-gray-400 text-sm">
              Hecho con ❤️ para tu bienestar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

