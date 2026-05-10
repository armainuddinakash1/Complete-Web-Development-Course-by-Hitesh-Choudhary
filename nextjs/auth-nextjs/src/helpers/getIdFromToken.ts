import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getIdFromToken = async (request: NextRequest) => {
    try {
        const encodedToken = request.cookies.get("Auth")?.value || "";
        if (!encodedToken) {
            throw new Error("Auth token not found");
        }

        const tokenSecret = process.env.TOKEN_SECRET || "";
        if (!tokenSecret) {
            throw new Error("TOKEN_SECRET environment variable is required");
        }
        const decodedToken: any = jwt.verify(encodedToken, tokenSecret);
        return decodedToken._id;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
