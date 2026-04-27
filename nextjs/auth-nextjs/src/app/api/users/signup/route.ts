import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 },
            );
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const savedUser = await User.create({
            username,
            email,
            password: hashedPassword,
        })
      

        return NextResponse.json({message: "User created successfully", success: true, status: 201, savedUser});
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
