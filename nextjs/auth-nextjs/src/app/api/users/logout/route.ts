import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const authCookie = request.cookies.get("Auth");

        if (!authCookie) {
            return NextResponse.json({
                message: "No active session found",
                status: 401,
            });
        }

        const response = NextResponse.json({
            message: "User logged out successfully",
            success: true,
        });

        response.cookies.set("Auth", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message, status: 500 });
    }
}
