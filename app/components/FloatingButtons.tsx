'use client';

import Link from "next/link";

export default function FloatingButtons() {
  return (
    <div className="floating-buttons fixed bottom-6 right-6 z-[40] md:z-[60] flex flex-col gap-3 transition-opacity duration-200">
      {/* WhatsApp */}
      <Link
        href="https://wa.me/51994971261"
        target="_blank"
        aria-label="Chatear por WhatsApp"
        className="group relative"
      >
        <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 blur-xl group-hover:opacity-80 transition-opacity"></div>
        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-7 h-7">
            <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32 106.1 32 9.1 129 9.1 246.8c0 38.1 9.9 75.4 28.8 108.2L0 480l127.5-37.3c31.6 17.2 67.3 26.3 103.9 26.3h.1c117.8 0 214.8-97 214.8-214.8 0-59.3-23.1-115.1-65.4-157.1zM223.6 438.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-75.6 22.1 22.5-73.6-4.4-6.9c-18.2-28.6-27.9-61.8-27.9-95.8 0-98.9 80.4-179.3 179.3-179.3 48 0 93.1 18.7 127 52.7 33.9 33.9 52.6 79 52.6 126.9 0 98.9-80.4 179.4-179.3 179.4zm101.6-138.2c-5.6-2.8-33.1-16.4-38.2-18.3-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18.3-17.5 22.1-6.5 4.2-12.1 1.4-23.6-8.7-45-27.8c-16.6-14.8-27.8-33.1-31-38.7s-.3-8.6 2.5-11.4c2.6-2.6 5.1-6.8 7.7-10.2 2.6-3.4 3.4-5.9 5.1-9.6 1.7-3.7.9-7-0.5-9.8s-12.5-30.1-17.1-41.3c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.8 1.4-14.9 7c-5.1 5.6-19.5 19-19.5 46.3s20 53.7 22.8 57.4c2.8 3.7 39.4 60.2 95.4 84.5 13.3 5.7 23.7 9.1 31.8 11.6 13.4 4.3 25.6 3.7 35.3 2.3 10.8-1.6 33.1-13.5 37.8-26.6 4.7-13.1 4.7-24.4 3.3-26.6-1.4-2.1-5.2-3.4-10.8-6.2z"/>
          </svg>
        </div>
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden sm:flex">
          <span className="px-3 py-1 rounded-full bg-[#1fa955] text-white text-xs shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            WhatsApp
          </span>
        </div>
      </Link>

      {/* Email */}
      <a
        href="mailto:cdelcarpio94@gmail.com?subject=Consulta%20desde%20web"
        aria-label="Enviar correo"
        className="group relative"
      >
        <div className="absolute inset-0 rounded-full bg-[#4a9a8a] opacity-50 blur-xl group-hover:opacity-70 transition-opacity"></div>
        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#4a9a8a] text-white shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden sm:flex">
          <span className="px-3 py-1 rounded-full bg-[#4a9a8a] text-white text-xs shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            Email
          </span>
        </div>
      </a>
    </div>
  );
}


