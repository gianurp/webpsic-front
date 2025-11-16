import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Obtener perfil del usuario actual
export async function GET(req: Request) {
  try {
    const userId = req.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const db = await getDb();
    const user = await db.collection("usersWork").findOne({
      _id: new ObjectId(userId),
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const { passwordHash, ...userData } = user;
    return NextResponse.json({
      user: {
        ...userData,
        _id: userData._id.toString(),
      },
    });
  } catch (error: any) {
    console.error("Error obteniendo perfil:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Actualizar perfil del usuario actual
export async function PUT(req: Request) {
  try {
    const userId = req.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      nombres,
      apellidos,
      numeroCelular,
      direccion,
      photoKey,
    } = body;

    const db = await getDb();
    
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (nombres !== undefined) updateData.nombres = nombres;
    if (apellidos !== undefined) updateData.apellidos = apellidos;
    if (numeroCelular !== undefined) updateData.numeroCelular = numeroCelular;
    if (direccion !== undefined) updateData.direccion = direccion;
    if (photoKey !== undefined) updateData.photoKey = photoKey;

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
    console.error("Error actualizando perfil:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

