import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

// Listar todos los usuarios del sistema
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
        { error: "No autorizado. Solo administradores pueden ver usuarios." },
        { status: 403 }
      );
    }

    const users = await db.collection("usersWork")
      .find({})
      .project({ passwordHash: 0 }) // Excluir passwordHash
      .sort({ createdAt: -1 })
      .toArray();

    const usersWithStringId = users.map((user) => ({
      ...user,
      _id: user._id.toString(),
    }));

    return NextResponse.json({ users: usersWithStringId });
  } catch (error: any) {
    console.error("Error listando usuarios:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Crear nuevo usuario del sistema
export async function POST(req: Request) {
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
        { error: "No autorizado. Solo administradores pueden crear usuarios." },
        { status: 403 }
      );
    }

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
    } = await req.json();

    // Validaciones
    if (
      !nombres ||
      !apellidos ||
      !email ||
      !password ||
      !nombreUsuario ||
      !fechaNacimiento ||
      !tipoDocumento ||
      !numeroDocumento ||
      !sexo ||
      !numeroCelular ||
      !rol
    ) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe
    const existingEmail = await db.collection("usersWork").findOne({
      email: email.toLowerCase(),
    });
    if (existingEmail) {
      return NextResponse.json(
        { error: "El correo electrónico ya está registrado" },
        { status: 400 }
      );
    }

    // Verificar si el nombre de usuario ya existe
    const existingUsername = await db.collection("usersWork").findOne({
      nombreUsuario: nombreUsuario.toLowerCase(),
    });
    if (existingUsername) {
      return NextResponse.json(
        { error: "El nombre de usuario ya está en uso" },
        { status: 400 }
      );
    }

    // Verificar si el número de documento ya existe
    const existingDoc = await db.collection("usersWork").findOne({
      numeroDocumento: numeroDocumento,
    });
    if (existingDoc) {
      return NextResponse.json(
        { error: "El número de documento ya está registrado" },
        { status: 400 }
      );
    }

    // Hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = {
      nombres,
      apellidos,
      email: email.toLowerCase(),
      passwordHash,
      nombreUsuario: nombreUsuario.toLowerCase(),
      fechaNacimiento: new Date(fechaNacimiento),
      tipoDocumento,
      numeroDocumento,
      sexo,
      direccion: direccion || "",
      numeroCelular,
      rol,
      photoKey: photoKey || null,
      activo: true, // Campo para desactivar usuarios
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("usersWork").insertOne(newUser);

    const { passwordHash: _, ...userData } = newUser;
    return NextResponse.json(
      {
        success: true,
        user: {
          ...userData,
          _id: result.insertedId.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creando usuario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

