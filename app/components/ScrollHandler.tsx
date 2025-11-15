'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Si estamos en la página principal y hay un hash en la URL
    if (pathname === '/') {
      const hash = window.location.hash;
      if (hash) {
        // Esperar a que el contenido se cargue
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const headerOffset = 80; // Altura del header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }, 100);
      }
    }
  }, [pathname]);

  return null;
}

