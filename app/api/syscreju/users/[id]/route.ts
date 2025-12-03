import { NextResponse, NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

// Actualizar usuario
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
        { error: "No autorizado. Solo administradores pueden actualizar usuarios." },
        { status: 403 }
      );
    }

    const { id: userId } = await params;
    const body = await req.json();
    const {
      nombres,
      apellidos,
      email,
      password,
      nombreUsuario,
      fechaNacimiento,
      tipoDocumento,
      numeroDocumento,
      sexo,
      direccion,
      numeroCelular,
      rol,
      photoKey,
      activo,
    } = body;

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (nombres !== undefined) updateData.nombres = nombres;
    if (apellidos !== undefined) updateData.apellidos = apellidos;
    if (email !== undefined) {
      // Verificar si el email ya existe en otro usuario
      const existingEmail = await db.collection("usersWork").findOne({
        email: email.toLowerCase(),
        _id: { $ne: new ObjectId(userId) },
      });
      if (existingEmail) {
        return NextResponse.json(
          { error: "El correo electrónico ya está registrado" },
          { status: 400 }
        );
      }
      updateData.email = email.toLowerCase();
    }
    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }
    if (nombreUsuario !== undefined) {
      // Verificar si el nombre de usuario ya existe en otro usuario
      const existingUsername = await db.collection("usersWork").findOne({
        nombreUsuario: nombreUsuario.toLowerCase(),
        _id: { $ne: new ObjectId(userId) },
      });
      if (existingUsername) {
        return NextResponse.json(
          { error: "El nombre de usuario ya está en uso" },
          { status: 400 }
        );
      }
      updateData.nombreUsuario = nombreUsuario.toLowerCase();
    }
    if (fechaNacimiento !== undefined) updateData.fechaNacimiento = new Date(fechaNacimiento);
    if (tipoDocumento !== undefined) updateData.tipoDocumento = tipoDocumento;
    if (numeroDocumento !== undefined) {
      // Verificar si el número de documento ya existe en otro usuario
      const existingDoc = await db.collection("usersWork").findOne({
        numeroDocumento: numeroDocumento,
        _id: { $ne: new ObjectId(userId) },
      });
      if (existingDoc) {
        return NextResponse.json(
          { error: "El número de documento ya está registrado" },
          { status: 400 }
        );
      }
      updateData.numeroDocumento = numeroDocumento;
    }
    if (sexo !== undefined) updateData.sexo = sexo;
    if (direccion !== undefined) updateData.direccion = direccion;
    if (numeroCelular !== undefined) updateData.numeroCelular = numeroCelular;
    if (rol !== undefined) updateData.rol = rol;
    if (photoKey !== undefined) updateData.photoKey = photoKey;
    if (activo !== undefined) updateData.activo = activo;

    const result = await db.collection("usersWork").updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const updatedUser = await db.collection("usersWork").findOne({
      _id: new ObjectId(userId),
    });

    const { passwordHash, ...userData } = updatedUser!;
    return NextResponse.json({
      success: true,
      user: {
        ...userData,
        _id: userData._id.toString(),
      },
    });
  } catch (error: any) {
    console.error("Error actualizando usuario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Eliminar o desactivar usuario
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
        { error: "No autorizado. Solo administradores pueden eliminar usuarios." },
        { status: 403 }
      );
    }

    const { id: userId } = await params;

    // No permitir que un admin se elimine a sí mismo
    if (adminId === userId) {
      return NextResponse.json(
        { error: "No puedes eliminar tu propio usuario" },
        { status: 400 }
      );
    }

    // En lugar de eliminar, desactivar el usuario
    const result = await db.collection("usersWork").updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          activo: false,
          updatedAt: new Date(),
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Usuario desactivado correctamente",
    });
  } catch (error: any) {
    console.error("Error eliminando usuario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

