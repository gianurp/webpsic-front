import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session as any).userId as string | undefined;
  if (!userId) return NextResponse.json({ error: "No userId" }, { status: 400 });
  const db = await getDb();
  const user = await db.collection("users").findOne(
    { _id: new ObjectId(userId) },
    { projection: { passwordHash: 0 } }
  );
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ user });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session as any).userId as string | undefined;
  if (!userId) return NextResponse.json({ error: "No userId" }, { status: 400 });

  const { nombre, apellidos, telefono, photoKey } = await req.json();
  const db = await getDb();
  const update: any = {
    updatedAt: new Date(),
  };
  if (typeof nombre === "string") update.nombre = nombre;
  if (typeof apellidos === "string") update.apellidos = apellidos;
  if (typeof telefono === "string") update.telefono = telefono;
  if (typeof photoKey === "string" || photoKey === null) update.photoKey = photoKey;

  await db.collection("users").updateOne(
    { _id: new ObjectId(userId) },
    { $set: update }
  );

  const user = await db.collection("users").findOne(
    { _id: new ObjectId(userId) },
    { projection: { passwordHash: 0 } }
  );
  return NextResponse.json({ ok: true, user });
}
