'use client';

import { usePathname } from "next/navigation";
import Header from "./Header";
import ScrollHandler from "./ScrollHandler";
import FloatingButtons from "./FloatingButtons";
import CalmWaves from "./CalmWaves";
import CalmBackdrop from "./CalmBackdrop";
import RouteTransition from "./RouteTransition";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSysCreju = pathname?.startsWith('/syscreju');

  // Si es una ruta de syscreju, no renderizar componentes del landing
  if (isSysCreju) {
    return <>{children}</>;
  }

  // Para rutas del landing page, renderizar todos los componentes
  return (
    <>
      <Header />
      <ScrollHandler />
      <CalmBackdrop />
      <main className="pt-20 relative z-10">
        <RouteTransition>
          {children}
        </RouteTransition>
      </main>
      <CalmWaves />
      <FloatingButtons />
    </>
  );
}

