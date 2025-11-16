Variables de entorno requeridas (crear archivo .env.local)

- AWS_REGION=us-east-1
- AWS_ACCESS_KEY_ID=... (usuario/role con permisos S3 Put/Get/DeleteObject y ListBucket)
- AWS_SECRET_ACCESS_KEY=...
- S3_BUCKET_NAME=cj-dev-data (en prod: cj-prod-data)
- MONGODB_URI=... (cadena de conexión de MongoDB Atlas)
- NEXTAUTH_SECRET=... (secreto para NextAuth - genera uno aleatorio)
- ADMIN_INIT_SECRET=... (clave secreta para inicializar el usuario admin del sistema)

Notas:
- No subas .env.local al repositorio.
- En Vercel, configúralas en Project Settings → Environment Variables.
- Para generar NEXTAUTH_SECRET: `openssl rand -base64 32`


