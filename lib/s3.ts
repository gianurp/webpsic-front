import { S3Client } from "@aws-sdk/client-s3";

if (!process.env.AWS_REGION) {
  // Use a default to avoid crashes in dev; user must set it in .env
  process.env.AWS_REGION = "us-east-1";
}

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  } : undefined,
});

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || "";


