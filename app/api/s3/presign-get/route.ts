import { NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, S3_BUCKET_NAME } from "@/lib/s3";

export async function POST(req: Request) {
  try {
    const { key } = await req.json();
    if (!key) return NextResponse.json({ error: "key is required" }, { status: 400 });
    if (!S3_BUCKET_NAME) return NextResponse.json({ error: "S3_BUCKET_NAME not configured" }, { status: 500 });

    const command = new GetObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
      ResponseContentDisposition: "inline",
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 5 });
    return NextResponse.json({ url });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unexpected error" }, { status: 500 });
  }
}


