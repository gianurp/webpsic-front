'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PacienteList from "./PacienteList";
import PacienteDetailsModal from "./PacienteDetailsModal";
import PacienteEditModal from "./PacienteEditModal";

interface Paciente {
  _id: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  photoKey: string | null;
  activo?: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PacientesPage() {
  const router = useRouter();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewingPaciente, setViewingPaciente] = useState<Paciente | null>(null);
  const [editingPaciente, setEditingPaciente] = useState<Paciente | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("syscreju_user");
    if (!storedUser) {
      router.push("/syscreju/login");
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      setCurrentUserId(userData._id);
      loadPacientes(userData._id);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/syscreju/login");
    }
  }, [router]);

  const loadPacientes = async (userId: string) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/syscreju/pacientes", {
        headers: {
          "x-user-id": userId,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Pacientes cargados:", data.pacientes?.length || 0);
        const pacientesArray = Array.isArray(data.pacientes) ? data.pacientes : [];
        setPacientes(pacientesArray);
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error("Error cargando pacientes:", errorData.error || "Error desconocido");
        alert(errorData.error || "Error al cargar pacientes");
        setPacientes([]);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión al cargar pacientes");
      setPacientes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (paciente: Paciente) => {
    setViewingPaciente(paciente);
  };

  const handleEdit = (paciente: Paciente) => {
    setEditingPaciente(paciente);
  };

  const handleCloseView = () => {
    setViewingPaciente(null);
  };

  const handleCloseEdit = () => {
    setEditingPaciente(null);
    if (currentUserId) {
      loadPacientes(currentUserId);
    }
  };

  const handleDelete = async (pacienteId: string) => {
    if (!confirm("¿Estás seguro de que deseas desactivar este paciente?")) {
      return;
    }

    if (!currentUserId) return;

    try {
      const res = await fetch(`/api/syscreju/pacientes/${pacienteId}`, {
        method: "DELETE",
        headers: {
          "x-user-id": currentUserId,
        },
      });

      if (res.ok) {
        loadPacientes(currentUserId);
      } else {
        const data = await res.json();
        alert(data.error || "Error al desactivar paciente");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al desactivar paciente");
    }
  };

  const handleToggleActive = async (paciente: Paciente) => {
    if (!currentUserId) return;

    try {
      const res = await fetch(`/api/syscreju/pacientes/${paciente._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": currentUserId,
        },
        body: JSON.stringify({
          ...paciente,
          activo: !paciente.activo,
        }),
      });

      if (res.ok) {
        loadPacientes(currentUserId);
      } else {
        const data = await res.json();
        alert(data.error || "Error al actualizar paciente");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar paciente");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-[#2d2d2d]">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#2d2d2d]">Gestión de Pacientes</h1>
        <p className="text-[#555] mt-1">Administra los pacientes registrados en el sistema</p>
      </header>

      <PacienteList
        pacientes={pacientes}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleActive={handleToggleActive}
      />
      
      {viewingPaciente && (
        <PacienteDetailsModal paciente={viewingPaciente} onClose={handleCloseView} />
      )}
      
      {editingPaciente && (
        <PacienteEditModal
          paciente={editingPaciente}
          onClose={handleCloseEdit}
          currentUserId={currentUserId || ""}
        />
      )}
    </div>
  );
}
