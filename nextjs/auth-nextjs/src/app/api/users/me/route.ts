import { connect } from "@/dbConfig/dbConfig";
import { getIdFromToken } from "@/helpers/getIdFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    connect()
    const userId = await getIdFromToken(request)
    const user = await User.findById(userId).select("-password")
    return NextResponse.json({
      message: "User fetched successfully",
      user
    })

  } catch (error: any) {
    return NextResponse.json({error: error.message},{status: 400})
  }
}
