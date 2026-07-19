import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is required for PrismaClient");
}

const prisma =
    globalThis.prisma ??
    new PrismaClient({
        adapter: new PrismaPg(connectionString),
    });
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
    public_id: string;
    bytes: number;
    duration?: number;
    [key: string]: any;
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === "string") {
        return error;
    }

    if (typeof error === "object" && error !== null) {
        const maybeError = error as Record<string, unknown>;

        if (maybeError.name === "TimeoutError" || maybeError.message === "Request Timeout") {
            return "The video upload timed out. Please try again with a smaller file or a slower connection.";
        }

        if (typeof maybeError.message === "string") {
            return maybeError.message;
        }

        if (typeof maybeError.error === "string") {
            return maybeError.error;
        }

        if (typeof maybeError.msg === "string") {
            return maybeError.msg;
        }
    }

    return "Unknown error occurred while uploading video";
}

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        if (
            !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
            !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ||
            !process.env.CLOUDINARY_API_SECRET
        ) {
            return NextResponse.json(
                { error: "Cloudinary credentials not found" },
                { status: 500 },
            );
        }
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const originalSize = formData.get("originalSize") as string;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 },
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "video",
                        folder: "video-uploads",
                        transformation: [
                            { quality: "auto", fetch_format: "mp4" },
                        ],
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    },
                );
                uploadStream.end(buffer);
            },
        );

        // return NextResponse.json(
        //     { success: true, userId, publicId: uploadResult.public_id },
        //     { status: 200 },
        // );

        const video = await prisma.video.create({
            data: {
                title: String(title ?? ""),
                description: description ? String(description) : null,
                publicId: uploadResult.public_id,
                originalSize: String(originalSize ?? ""),
                compressedSize: String(uploadResult.bytes),
                duration: Number(uploadResult.duration ?? 0),
            },
        });

        const serializableVideo = {
            ...video,
            duration: Number(video.duration ?? 0),
            createdAt: video.createdAt.toISOString(),
            updatedAt: video.updatedAt.toISOString(),
        };

        return NextResponse.json(
            { success: true, video: serializableVideo },
            { status: 200 },
        );
    } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        console.error("Video upload failed:", error);

        return NextResponse.json(
            {
                error: errorMessage,
            },
            {
                status: 500,
            },
        );
    }
}
