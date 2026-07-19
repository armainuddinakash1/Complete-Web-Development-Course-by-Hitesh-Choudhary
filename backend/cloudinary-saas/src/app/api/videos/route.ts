import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { NextRequest, NextResponse } from "next/server";

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is required for PrismaClient");
}

const prisma = globalThis.prisma ?? new PrismaClient({
    adapter: new PrismaPg(connectionString),
});
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export async function GET(req: NextRequest) {
    try {
        const videos = await prisma.video.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(videos);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    error: error.message,
                },
                {
                    status: 500,
                },
            );
        }

        return NextResponse.json(
            {
                error: "Unknown error occurred while getting videos",
            },
            {
                status: 500,
            },
        );
    }
}
