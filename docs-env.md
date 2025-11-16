Variables de entorno requeridas (crear archivo .env.local)

- AWS_REGION=us-east-1
- AWS_ACCESS_KEY_ID=... (usuario/role con permisos S3 Put/Get/DeleteObject y ListBucket)
- AWS_SECRET_ACCESS_KEY=...
- S3_BUCKET_NAME=cj-dev-data (en prod: cj-prod-data)

Notas:
- No subas .env.local al repositorio.
- En Vercel, configúralas en Project Settings → Environment Variables.


