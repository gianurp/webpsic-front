import { NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, S3_BUCKET_NAME } from "@/lib/s3";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key, contentType } = body as { key?: string; contentType?: string };

    if (!key || !contentType) {
      return NextResponse.json({ error: "key and contentType are required" }, { status: 400 });
    }
    if (!S3_BUCKET_NAME) {
      return NextResponse.json({ error: "S3_BUCKET_NAME not configured" }, { status: 500 });
    }

    const command = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
      // Server-side encryption default (matches bucket policy recommendation)
      ServerSideEncryption: "AES256",
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 5 });
    return NextResponse.json({ url, key });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unexpected error" }, { status: 500 });
  }
}


