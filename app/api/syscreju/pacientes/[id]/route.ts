import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Obtener detalles de un paciente
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const pacienteId = params.id;
    const paciente = await db.collection("users").findOne(
      { _id: new ObjectId(pacienteId) },
      { projection: { passwordHash: 0 } }
    );

    if (!paciente) {
      return NextResponse.json(
        { error: "Paciente no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      paciente: {
        ...paciente,
        _id: paciente._id.toString(),
      },
    });
  } catch (error: any) {
    console.error("Error obteniendo paciente:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Actualizar paciente
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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
        { error: "No autorizado. Solo administradores pueden actualizar pacientes." },
        { status: 403 }
      );
    }

    const pacienteId = params.id;
    const body = await req.json();
    const {
      nombre,
      apellidos,
      email,
      telefono,
      photoKey,
      activo,
    } = body;

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (nombre !== undefined) updateData.nombre = nombre;
    if (apellidos !== undefined) updateData.apellidos = apellidos;
    if (telefono !== undefined) updateData.telefono = telefono;
    if (photoKey !== undefined) updateData.photoKey = photoKey;
    if (activo !== undefined) updateData.activo = activo;

    if (email !== undefined) {
      // Verificar si el email ya existe en otro paciente
      const existingEmail = await db.collection("users").findOne({
        email: email.toLowerCase(),
        _id: { $ne: new ObjectId(pacienteId) },
      });
      if (existingEmail) {
        return NextResponse.json(
          { error: "El correo electrónico ya está registrado" },
          { status: 400 }
        );
      }
      updateData.email = email.toLowerCase();
    }

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(pacienteId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Paciente no encontrado" },
        { status: 404 }
      );
    }

    const updatedPaciente = await db.collection("users").findOne(
      { _id: new ObjectId(pacienteId) },
      { projection: { passwordHash: 0 } }
    );

    return NextResponse.json({
      success: true,
      paciente: {
        ...updatedPaciente,
        _id: updatedPaciente!._id.toString(),
      },
    });
  } catch (error: any) {
    console.error("Error actualizando paciente:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Desactivar paciente
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
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
        { error: "No autorizado. Solo administradores pueden desactivar pacientes." },
        { status: 403 }
      );
    }

    const pacienteId = params.id;

    // En lugar de eliminar, desactivar el paciente
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(pacienteId) },
      { 
        $set: { 
          activo: false,
          updatedAt: new Date(),
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Paciente no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Paciente desactivado correctamente",
    });
  } catch (error: any) {
    console.error("Error desactivando paciente:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

