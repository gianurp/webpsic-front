import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { secret } = await req.json();
    
    // En desarrollo, permitir sin secret o con secret
    const isDevelopment = process.env.NODE_ENV === 'development';
    const adminInitSecret = process.env.ADMIN_INIT_SECRET;
    
    // Si hay secret configurado, validarlo
    if (adminInitSecret && secret !== adminInitSecret) {
      return NextResponse.json(
        { error: "No autorizado. La clave secreta no coincide." },
        { status: 401 }
      );
    }
    
    // Si no hay secret configurado, solo permitir en desarrollo
    if (!adminInitSecret && !isDevelopment) {
      return NextResponse.json(
        { error: "ADMIN_INIT_SECRET no está configurado. Configúralo en .env.local para producción." },
        { status: 500 }
      );
    }
    
    // En desarrollo sin secret configurado, permitir crear admin
    // En producción, siempre requerir secret

    const db = await getDb();

    // Verificar si ya existe un admin
    const existingAdmin = await db.collection("usersWork").findOne({
      rol: "admin",
    });

    if (existingAdmin) {
      return NextResponse.json(
        { message: "El usuario admin ya existe", user: existingAdmin },
        { status: 200 }
      );
    }

    // Crear usuario admin por defecto
    const passwordHash = await bcrypt.hash("admin123", 10); // Contraseña por defecto

    const adminUser = {
      nombres: "Administrador",
      apellidos: "Sistema",
      email: "admin@creciendojuntos.com",
      passwordHash,
      nombreUsuario: "admin",
      fechaNacimiento: new Date("1990-01-01"),
      tipoDocumento: "DNI",
      numeroDocumento: "00000000",
      sexo: "Otro",
      direccion: "",
      numeroCelular: "+51999999999",
      rol: "admin",
      photoKey: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("usersWork").insertOne(adminUser);

    const { passwordHash: _, ...userData } = adminUser;

    return NextResponse.json(
      {
        success: true,
        message: "Usuario admin creado exitosamente",
        user: {
          ...userData,
          _id: result.insertedId.toString(),
        },
        defaultPassword: "admin123",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creando admin:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

