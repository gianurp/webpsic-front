'use client';

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTabletMoreOpen, setIsTabletMoreOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

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
    setIsTabletMoreOpen(false);
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

  useEffect(() => {
    setIsTabletMoreOpen(false);
  }, [pathname]);

  return (
    <header className="fixed left-0 right-0 z-[80] top-3 sm:top-4">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between h-16 rounded-2xl px-4 transition-all duration-300 ${
            isScrolled ? 'bg-white/80 backdrop-blur-xl' : 'bg-white/60 backdrop-blur-xl'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo-creciendo-juntos.png"
              alt="Creciendo Juntos Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="text-lg font-bold text-[#2d2d2d] hidden lg:block">
              Creciendo Juntos
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              href="/"
              className={`font-medium rounded-full px-3 py-2 transition-colors ${
                isActive('/')
                  ? 'bg-[#f5f3f8] text-[#2d2d2d]'
                  : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/sobre-mi"
              className={`font-medium rounded-full px-3 py-2 transition-colors ${
                isActive('/sobre-mi') ? 'bg-[#f5f3f8] text-[#2d2d2d]' : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
              }`}
            >
              Sobre Mí
            </Link>
            <Link
              href="/servicios"
              className={`font-medium rounded-full px-3 py-2 transition-colors ${
                isActive('/servicios') ? 'bg-[#f5f3f8] text-[#2d2d2d]' : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
              }`}
            >
              Servicios
            </Link>
            <Link
              href="/agenda"
              className={`font-medium rounded-full px-3 py-2 transition-colors ${
                isActive('/agenda') ? 'bg-[#f5f3f8] text-[#2d2d2d]' : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
              }`}
            >
              Agenda
            </Link>
            <Link
              href="/experiencia"
              className={`font-medium rounded-full px-3 py-2 transition-colors ${
                isActive('/experiencia')
                  ? 'bg-[#f5f3f8] text-[#2d2d2d]'
                  : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
              }`}
            >
              Experiencia
            </Link>
            <Link
              href="/testimonios"
              className={`font-medium rounded-full px-3 py-2 transition-colors ${
                isActive('/testimonios') ? 'bg-[#f5f3f8] text-[#2d2d2d]' : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
              }`}
            >
              Testimonios
            </Link>
            <Link
              href="/contacto"
              className="bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Contacto
            </Link>
            {session ? (
              <UserMenu name={session.user?.name} photoKey={(session as any).photoKey ?? null} />
            ) : (
              <Link
                href="/login"
                className={`font-medium rounded-full px-3 py-2 transition-colors ${
                  isActive('/login')
                    ? 'bg-[#f5f3f8] text-[#2d2d2d]'
                    : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
                }`}
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Tablet Navigation (reducido) */}
          <div className="hidden md:flex lg:hidden items-center gap-3">
            <Link
              href="/"
              className={`font-medium rounded-full px-3 py-2 transition-colors ${
                isActive('/') ? 'bg-[#f5f3f8] text-[#2d2d2d]' : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/servicios"
              className={`font-medium rounded-full px-3 py-2 transition-colors ${
                isActive('/servicios') ? 'bg-[#f5f3f8] text-[#2d2d2d]' : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
              }`}
            >
              Servicios
            </Link>
            <Link
              href="/contacto"
              className="bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white px-3 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Contacto
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsTabletMoreOpen(!isTabletMoreOpen)}
                className="font-medium rounded-full px-3 py-2 text-[#2d2d2d] hover:bg-[#f5f3f8] transition-colors"
                aria-expanded={isTabletMoreOpen}
                aria-haspopup="true"
              >
                Más
              </button>
              {isTabletMoreOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-[#e8e0f0] p-2 z-[90]">
                  <Link
                    href="/sobre-mi"
                    onClick={handleLinkClick}
                    className={`block w-full text-left px-3 py-2 rounded-xl transition-colors ${
                      isActive('/sobre-mi') ? 'bg-[#f5f3f8] text-[#2d2d2d]' : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
                    }`}
                  >
                    Sobre Mí
                  </Link>
                  <Link
                    href="/agenda"
                    onClick={handleLinkClick}
                    className={`block w-full text-left px-3 py-2 rounded-xl transition-colors ${
                      isActive('/agenda') ? 'bg-[#f5f3f8] text-[#2d2d2d]' : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
                    }`}
                  >
                    Agenda
                  </Link>
                  <Link
                    href="/experiencia"
                    onClick={handleLinkClick}
                    className={`block w-full text-left px-3 py-2 rounded-xl transition-colors ${
                      isActive('/experiencia') ? 'bg-[#f5f3f8] text-[#2d2d2d]' : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
                    }`}
                  >
                    Experiencia
                  </Link>
                  <Link
                    href="/testimonios"
                    onClick={handleLinkClick}
                    className={`block w-full text-left px-3 py-2 rounded-xl transition-colors ${
                      isActive('/testimonios') ? 'bg-[#f5f3f8] text-[#2d2d2d]' : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
                    }`}
                  >
                    Testimonios
                  </Link>
                  {session ? (
                    <div className="px-2 pt-2">
                      <UserMenu name={session.user?.name} photoKey={(session as any).photoKey ?? null} />
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      onClick={handleLinkClick}
                      className={`block w-full text-left px-3 py-2 rounded-xl transition-colors ${
                        isActive('/login') ? 'bg-[#f5f3f8] text-[#2d2d2d]' : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
                      }`}
                    >
                      Iniciar Sesión
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <button
            className="lg:hidden text-[#2d2d2d]"
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
            <div className="relative mt-24 mx-auto w-full max-w-lg py-4 pb-6 space-y-2 bg-white/90 backdrop-blur-xl rounded-2xl">
            <Link
              href="/"
              onClick={handleLinkClick}
              className={`block w-full text-left px-4 py-2 rounded-xl transition-colors ${
                isActive('/')
                  ? 'bg-[#f5f3f8] text-[#2d2d2d]'
                  : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/sobre-mi"
              onClick={handleLinkClick}
              className={`block w-full text-left px-4 py-2 rounded-xl transition-colors ${
                isActive('/sobre-mi') ? 'bg-[#f5f3f8] text-[#2d2d2d]' : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
              }`}
            >
              Sobre Mí
            </Link>
            <Link
              href="/servicios"
              onClick={handleLinkClick}
              className={`block w-full text-left px-4 py-2 rounded-xl transition-colors ${
                isActive('/servicios') ? 'bg-[#f5f3f8] text-[#2d2d2d]' : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
              }`}
            >
              Servicios
            </Link>
            <Link
              href="/agenda"
              onClick={handleLinkClick}
              className={`block w-full text-left px-4 py-2 rounded-xl transition-colors ${
                isActive('/agenda') ? 'bg-[#f5f3f8] text-[#2d2d2d]' : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
              }`}
            >
              Agenda
            </Link>
            <Link
              href="/experiencia"
              onClick={handleLinkClick}
              className={`block w-full text-left px-4 py-2 rounded-xl transition-colors ${
                isActive('/experiencia')
                  ? 'bg-[#f5f3f8] text-[#2d2d2d]'
                  : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
              }`}
            >
              Experiencia
            </Link>
            <Link
              href="/testimonios"
              onClick={handleLinkClick}
              className={`block w-full text-left px-4 py-2 rounded-xl transition-colors ${
                isActive('/testimonios') ? 'bg-[#f5f3f8] text-[#2d2d2d]' : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
              }`}
            >
              Testimonios
            </Link>
            <Link
              href="/contacto"
              onClick={handleLinkClick}
              className="block w-full text-left px-4 py-3 bg-gradient-to-r from-[#a8d5ba] via-[#c4a8d5] to-[#4a9a8a] text-white rounded-xl font-medium"
            >
              Contacto
            </Link>
            {session ? (
              <div className="px-4">
                <UserMenu name={session.user?.name} photoKey={(session as any).photoKey ?? null} />
              </div>
            ) : (
              <Link
                href="/login"
                onClick={handleLinkClick}
                className={`block w-full text-left px-4 py-2 rounded-xl transition-colors ${
                  isActive('/login')
                    ? 'bg-[#f5f3f8] text-[#2d2d2d]'
                    : 'text-[#2d2d2d] hover:bg-[#f5f3f8]'
                }`}
              >
                Iniciar Sesión
              </Link>
            )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

