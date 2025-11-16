/**
 * Script para crear el usuario admin por defecto
 * Ejecutar con: node scripts/create-admin.js
 */

const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI no está configurado en .env.local');
  process.exit(1);
}

async function createAdmin() {
  let client;
  
  try {
    console.log('🔌 Conectando a MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME || undefined);
    const usersWork = db.collection('usersWork');
    
    // Verificar si ya existe un admin
    const existingAdmin = await usersWork.findOne({ rol: 'admin' });
    
    if (existingAdmin) {
      console.log('✅ El usuario admin ya existe:');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Usuario: ${existingAdmin.nombreUsuario}`);
      console.log(`   Contraseña: admin123 (cambiar después del primer login)`);
      return;
    }
    
    // Crear usuario admin
    console.log('👤 Creando usuario admin...');
    const passwordHash = await bcrypt.hash('admin123', 10);
    
    const adminUser = {
      nombres: 'Administrador',
      apellidos: 'Sistema',
      email: 'admin@creciendojuntos.com',
      passwordHash,
      nombreUsuario: 'admin',
      fechaNacimiento: new Date('1990-01-01'),
      tipoDocumento: 'DNI',
      numeroDocumento: '00000000',
      sexo: 'Otro',
      direccion: '',
      numeroCelular: '+51999999999',
      rol: 'admin',
      photoKey: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await usersWork.insertOne(adminUser);
    
    console.log('✅ Usuario admin creado exitosamente!');
    console.log(`   ID: ${result.insertedId}`);
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Usuario: ${adminUser.nombreUsuario}`);
    console.log(`   Contraseña: admin123`);
    console.log('\n⚠️  IMPORTANTE: Cambia la contraseña después del primer inicio de sesión.');
    
  } catch (error) {
    console.error('❌ Error creando admin:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 Conexión cerrada.');
    }
  }
}

createAdmin();

