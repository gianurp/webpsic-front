'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserList from "./UserList";
import UserForm from "./UserForm";
import UserDetailsModal from "./UserDetailsModal";

interface User {
  _id: string;
  nombres: string;
  apellidos: string;
  email: string;
  nombreUsuario: string;
  fechaNacimiento: string;
  tipoDocumento: string;
  numeroDocumento: string;
  sexo: string;
  direccion: string;
  numeroCelular: string;
  rol: string;
  photoKey: string | null;
  activo?: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function UsuariosPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
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
      loadUsers(userData._id);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/syscreju/login");
    }
  }, [router]);

  const loadUsers = async (userId: string) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/syscreju/users", {
        headers: {
          "x-user-id": userId,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Usuarios cargados:", data.users?.length || 0, data.users);
        // Asegurarse de que siempre sea un array
        const usersArray = Array.isArray(data.users) ? data.users : [];
        setUsers(usersArray);
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error("Error cargando usuarios:", errorData.error || "Error desconocido");
        alert(errorData.error || "Error al cargar usuarios");
        setUsers([]); // Establecer array vacío en caso de error
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión al cargar usuarios");
      setUsers([]); // Establecer array vacío en caso de error
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleView = (user: User) => {
    setViewingUser(user);
  };

  const handleCloseView = () => {
    setViewingUser(null);
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("¿Estás seguro de que deseas desactivar este usuario?")) {
      return;
    }

    if (!currentUserId) return;

    try {
      const res = await fetch(`/api/syscreju/users/${userId}`, {
        method: "DELETE",
        headers: {
          "x-user-id": currentUserId,
        },
      });

      if (res.ok) {
        loadUsers(currentUserId);
      } else {
        const data = await res.json();
        alert(data.error || "Error al desactivar usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al desactivar usuario");
    }
  };

  const handleToggleActive = async (user: User) => {
    if (!currentUserId) return;

    try {
      const res = await fetch(`/api/syscreju/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": currentUserId,
        },
        body: JSON.stringify({
          ...user,
          activo: !user.activo,
        }),
      });

      if (res.ok) {
        loadUsers(currentUserId);
      } else {
        const data = await res.json();
        alert(data.error || "Error al actualizar usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar usuario");
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingUser(null);
    if (currentUserId) {
      loadUsers(currentUserId);
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
        <h1 className="text-3xl font-bold text-[#2d2d2d]">Gestión de Usuarios del Sistema</h1>
        <p className="text-[#555] mt-1">Administra los usuarios del sistema (admin, psicólogos, etc.)</p>
      </header>

      <UserList
        users={users}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleActive={handleToggleActive}
        onView={handleView}
      />
      
      {showForm && (
        <UserForm
          user={editingUser}
          onClose={handleFormClose}
          currentUserId={currentUserId || ""}
        />
      )}
      
      {viewingUser && (
        <UserDetailsModal user={viewingUser} onClose={handleCloseView} />
      )}
    </div>
  );
}
