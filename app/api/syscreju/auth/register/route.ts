import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const {
      nombres,
      apellidos,
      correo,
      contraseña,
      nombreUsuario,
      fechaNacimiento,
      tipoDocumento,
      numeroDocumento,
      sexo,
      direccion,
      numeroCelular,
      rol,
      photoKey, // photoKey ya debe venir del cliente después de subir a S3
    } = await req.json();

    // Validaciones básicas
    if (
      !nombres ||
      !apellidos ||
      !correo ||
      !contraseña ||
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

    const db = await getDb();

    // Verificar si el email ya existe
    const existingEmail = await db.collection("usersWork").findOne({
      email: correo.toLowerCase(),
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
    const passwordHash = await bcrypt.hash(contraseña, 10);

    // Crear usuario
    const newUser = {
      nombres,
      apellidos,
      email: correo.toLowerCase(),
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
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("usersWork").insertOne(newUser);

    // Retornar usuario creado (sin passwordHash)
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
    console.error("Error en registro:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

