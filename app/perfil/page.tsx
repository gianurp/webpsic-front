import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PerfilPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?callbackUrl=/perfil");
  }

  const name = session.user?.name || "Usuario";
  const email = session.user?.email || "";
  const photoKey = (session as any).photoKey as string | null;

  return (
    <section className="min-h-[70vh] px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-[#f5f3f8] to-white">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-[#2d2d2d] mb-6">Mi Perfil</h1>

        <EditProfileForm initialName={name} initialEmail={email} initialPhotoKey={photoKey} />
      </div>
    </section>
  );
}

import EditProfileForm from "./EditProfileForm";


