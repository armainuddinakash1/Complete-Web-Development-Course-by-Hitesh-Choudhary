import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // check if user already exists
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "User dosent exists" },
                { status: 400 },
            );
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 400 },
            );
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        const response = NextResponse.json({
            message: "User fetched successfully",
            success: true,
        });

        response.cookies.set("token", token, { httpOnly: true });

        return response
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
