import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json(
                { error: "user already exists" },
                { status: 400 },
            );
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        // create token data
        const tokenData = {
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
        };

        // create token
        const tokenSecret = process.env.TOKEN_SECRET;

        const response = NextResponse.json({
            message: "User created successfully",
            success: true,
            user: {
                username: savedUser.username,
                email: savedUser.email,
            },
        });
        if (tokenSecret) {
            const token = jwt.sign(tokenData, tokenSecret, {
                expiresIn: "1h",
            });
            response.cookies.set("Auth", token, { httpOnly: true });
        }
        // send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return response;
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

connect();
