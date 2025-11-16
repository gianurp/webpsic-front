'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditProfileForm from "./EditProfileForm";

interface User {
  _id: string;
  nombres: string;
  apellidos: string;
  email: string;
  nombreUsuario: string;
  numeroCelular: string;
  direccion: string;
  photoKey: string | null;
}

export default function SysCrejuPerfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem("syscreju_user");
      if (!storedUser) {
        router.push("/syscreju/login");
        return;
      }

      try {
        const userData = JSON.parse(storedUser);
        const userId = userData._id;

        const res = await fetch("/api/syscreju/users/me", {
          headers: {
            "x-user-id": userId,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          console.error("Error cargando perfil");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [router]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-[#2d2d2d]">Cargando...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#2d2d2d]">Mi Perfil</h1>
        <p className="text-[#555] mt-1">Gestiona tu información personal</p>
      </header>

      <EditProfileForm user={user} />
    </div>
  );
}

