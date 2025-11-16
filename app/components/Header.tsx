'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo-creciendo-juntos.png"
              alt="Creciendo Juntos Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-[#2d2d2d] hidden sm:block">
              Creciendo Juntos
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`transition-colors font-medium ${
                isActive('/')
                  ? 'text-[#4a9a8a]'
                  : 'text-[#2d2d2d] hover:text-[#4a9a8a]'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/sobre-mi"
              className={`transition-colors font-medium ${
                isActive('/sobre-mi') ? 'text-[#4a9a8a]' : 'text-[#2d2d2d] hover:text-[#4a9a8a]'
              }`}
            >
              Sobre Mí
            </Link>
            <Link
              href="/servicios"
              className={`transition-colors font-medium ${
                isActive('/servicios') ? 'text-[#4a9a8a]' : 'text-[#2d2d2d] hover:text-[#4a9a8a]'
              }`}
            >
              Servicios
            </Link>
            <Link
              href="/agenda"
              className={`transition-colors font-medium ${
                isActive('/agenda') ? 'text-[#4a9a8a]' : 'text-[#2d2d2d] hover:text-[#4a9a8a]'
              }`}
            >
              Agenda
            </Link>
            <Link
              href="/experiencia"
              className={`transition-colors font-medium ${
                isActive('/experiencia')
                  ? 'text-[#4a9a8a]'
                  : 'text-[#2d2d2d] hover:text-[#4a9a8a]'
              }`}
            >
              Experiencia
            </Link>
            <Link
              href="/testimonios"
              className={`transition-colors font-medium ${
                isActive('/testimonios') ? 'text-[#4a9a8a]' : 'text-[#2d2d2d] hover:text-[#4a9a8a]'
              }`}
            >
              Testimonios
            </Link>
            <Link
              href="/contacto"
              className="bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Contacto
            </Link>
            <Link
              href="/login"
              className={`transition-colors font-medium ${
                isActive('/login')
                  ? 'text-[#4a9a8a]'
                  : 'text-[#2d2d2d] hover:text-[#4a9a8a]'
              }`}
            >
              Iniciar Sesión
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#2d2d2d]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Overlay y Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-[90] px-3 sm:px-6">
            {/* overlay */}
            <div className="absolute inset-0 bg-black/10" onClick={() => setIsMobileMenuOpen(false)}></div>
            {/* panel */}
            <div className="relative mt-24 mx-auto w-full max-w-lg py-4 pb-6 space-y-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#e8e0f0]">
            <Link
              href="/"
              onClick={handleLinkClick}
              className={`block w-full text-left px-4 py-2 transition-colors ${
                isActive('/')
                  ? 'text-[#4a9a8a]'
                  : 'text-[#2d2d2d] hover:text-[#4a9a8a]'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/sobre-mi"
              onClick={handleLinkClick}
              className={`block w-full text-left px-4 py-2 transition-colors ${
                isActive('/sobre-mi') ? 'text-[#4a9a8a]' : 'text-[#2d2d2d] hover:text-[#4a9a8a]'
              }`}
            >
              Sobre Mí
            </Link>
            <Link
              href="/servicios"
              onClick={handleLinkClick}
              className={`block w-full text-left px-4 py-2 transition-colors ${
                isActive('/servicios') ? 'text-[#4a9a8a]' : 'text-[#2d2d2d] hover:text-[#4a9a8a]'
              }`}
            >
              Servicios
            </Link>
            <Link
              href="/agenda"
              onClick={handleLinkClick}
              className={`block w-full text-left px-4 py-2 transition-colors ${
                isActive('/agenda') ? 'text-[#4a9a8a]' : 'text-[#2d2d2d] hover:text-[#4a9a8a]'
              }`}
            >
              Agenda
            </Link>
            <Link
              href="/experiencia"
              onClick={handleLinkClick}
              className={`block w-full text-left px-4 py-2 transition-colors ${
                isActive('/experiencia')
                  ? 'text-[#4a9a8a]'
                  : 'text-[#2d2d2d] hover:text-[#4a9a8a]'
              }`}
            >
              Experiencia
            </Link>
            <Link
              href="/testimonios"
              onClick={handleLinkClick}
              className={`block w-full text-left px-4 py-2 transition-colors ${
                isActive('/testimonios') ? 'text-[#4a9a8a]' : 'text-[#2d2d2d] hover:text-[#4a9a8a]'
              }`}
            >
              Testimonios
            </Link>
            <Link
              href="/contacto"
              onClick={handleLinkClick}
              className="block w-full text-left px-4 py-2 bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white rounded-lg font-medium"
            >
              Contacto
            </Link>
            <Link
              href="/login"
              onClick={handleLinkClick}
              className={`block w-full text-left px-4 py-2 transition-colors ${
                isActive('/login')
                  ? 'text-[#4a9a8a]'
                  : 'text-[#2d2d2d] hover:text-[#4a9a8a]'
              }`}
            >
              Iniciar Sesión
            </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

