# Sistema Creciendo Juntos (SysCreju)

## Descripción
Sistema de administración para gestionar el consultorio virtual Creciendo Juntos.

## Estructura

### Colecciones MongoDB
- **users**: Pacientes del consultorio
- **usersWork**: Usuarios del sistema (admin, psicólogos, etc.)

### Rutas del Sistema
- `/syscreju/login` - Página de login del sistema
- `/syscreju/dashboard` - Dashboard principal del sistema
- `/syscreju/init-admin` - Página para inicializar el usuario admin

### APIs
- `POST /api/syscreju/auth/login` - Login de usuarios del sistema
- `POST /api/syscreju/auth/register` - Registro de usuarios del sistema
- `POST /api/syscreju/init-admin` - Crear usuario admin por defecto

## Inicialización

### 1. Configurar Variables de Entorno

Agrega a tu archivo `.env.local`:

```env
# Clave secreta para inicializar el admin (cambia por una clave segura)
ADMIN_INIT_SECRET=tu_clave_secreta_aqui
```

### 2. Crear Usuario Admin por Defecto

Tienes dos opciones:

#### Opción A: Usando la página web (Recomendado para desarrollo)

1. Ve a `http://localhost:3000/syscreju/init-admin`
2. Si tienes `ADMIN_INIT_SECRET` configurado, ingrésalo (opcional en desarrollo)
3. Haz clic en "Crear Usuario Admin"

#### Opción B: Usando el script de Node.js

Ejecuta en la terminal:
```bash
npm run create-admin
```

**Credenciales por defecto del admin:**
- Email: `admin@creciendojuntos.com`
- Usuario: `admin`
- Contraseña: `admin123`

⚠️ **IMPORTANTE**: Cambia la contraseña después del primer inicio de sesión.

### 3. Iniciar Sesión

1. Ve a `http://localhost:3000/syscreju/login`
2. Ingresa las credenciales del admin
3. Serás redirigido al dashboard

## Estructura de Datos - usersWork

```typescript
{
  _id: ObjectId,
  nombres: string,
  apellidos: string,
  email: string, // único
  passwordHash: string,
  nombreUsuario: string, // único
  fechaNacimiento: Date,
  tipoDocumento: string, // "DNI", "CE", etc.
  numeroDocumento: string, // único
  sexo: string, // "Masculino", "Femenino", "Otro"
  direccion: string,
  numeroCelular: string,
  rol: string, // "admin", "psicologo", etc.
  photoKey: string | null, // Key en S3 (carpeta: usersWork/)
  createdAt: Date,
  updatedAt: Date
}
```

## Almacenamiento de Fotos

Las fotos de los usuarios del sistema se almacenan en S3 en la carpeta:
```
usersWork/{userId}/photos/{filename}
```

Para subir una foto:
1. Obtener URL presignada: `POST /api/s3/presign` con `key: "usersWork/{userId}/photos/{filename}"`
2. Subir archivo a S3 usando la URL presignada
3. Guardar el `photoKey` en la base de datos

## Roles

- **admin**: Administrador del sistema (acceso completo)
- **psicologo**: Psicólogo del consultorio
- Otros roles pueden agregarse según necesidad

## Próximos Pasos

- [ ] Integrar NextAuth para sesiones del sistema
- [ ] Implementar gestión de usuarios del sistema
- [ ] Implementar gestión de pacientes
- [ ] Implementar gestión de citas
- [ ] Implementar reportes y estadísticas

