import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Listar todos los pacientes
export async function GET(req: Request) {
  try {
    const adminId = req.headers.get("x-user-id");
    
    if (!adminId) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const db = await getDb();
    
    // Verificar que el usuario es admin
    const admin = await db.collection("usersWork").findOne({
      _id: new ObjectId(adminId),
    });

    if (!admin || admin.rol !== "admin") {
      return NextResponse.json(
        { error: "No autorizado. Solo administradores pueden ver pacientes." },
        { status: 403 }
      );
    }

    const pacientes = await db.collection("users")
      .find({})
      .project({ passwordHash: 0 }) // Excluir passwordHash
      .sort({ createdAt: -1 })
      .toArray();

    const pacientesWithStringId = pacientes.map((paciente) => ({
      ...paciente,
      _id: paciente._id.toString(),
    }));

    return NextResponse.json({ pacientes: pacientesWithStringId });
  } catch (error: any) {
    console.error("Error listando pacientes:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

