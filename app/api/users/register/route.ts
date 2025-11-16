import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      nombre,
      apellidos,
      email,
      telefono,
      password,
      photoKey
    } = body as {
      nombre?: string;
      apellidos?: string;
      email?: string;
      telefono?: string;
      password?: string;
      photoKey?: string | null;
    };

    if (!nombre || !apellidos || !email || !telefono || !password) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const db = await getDb();
    const users = db.collection("users");

    // Ensure unique email index
    await users.createIndex({ email: 1 }, { unique: true });

    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "El correo ya está registrado" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const now = new Date();

    const doc = {
      nombre,
      apellidos,
      email: email.toLowerCase(),
      telefono,
      passwordHash,
      photoKey: photoKey || null,
      createdAt: now,
      updatedAt: now,
      // espacio para más campos a futuro (roles, estado, etc.)
    };

    const result = await users.insertOne(doc);

    return NextResponse.json({ ok: true, userId: result.insertedId }, { status: 201 });
  } catch (err: any) {
    if (err?.code === 11000) {
      return NextResponse.json({ error: "El correo ya está registrado" }, { status: 409 });
    }
    return NextResponse.json({ error: err?.message || "Error del servidor" }, { status: 500 });
  }
}


