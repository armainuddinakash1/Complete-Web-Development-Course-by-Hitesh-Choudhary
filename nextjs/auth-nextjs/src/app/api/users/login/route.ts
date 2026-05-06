import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // check if user exist
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "user does not exist" },
                { status: 400 },
            );
        }

        // check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { error: "invalid credentials" },
                { status: 400 },
            );
        }

        // create token data
        const tokenData = {
            _id: user._id,
            username: user.username,
            email: user.email,
        };

        // create token
        const tokenSecret = process.env.TOKEN_SECRET;
        if (!tokenSecret) {
            throw new Error("TOKEN_SECRET environment variable is required");
        }
        const token = jwt.sign(tokenData, tokenSecret, {
            expiresIn: "1h",
        });

        const response = NextResponse.json({
            message: "User fetched successfully",
            success: true,
        });

        response.cookies.set("Auth", token, { httpOnly: true });

        return response;
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

connect();
