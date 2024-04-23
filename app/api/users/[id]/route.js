import connectDB from "@/libs/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
export async function GET(req, {params}) {
    const { id } = params;
    await connectDB();
    const user = await User.findById(id);
    if (!user) {
        return NextResponse.json({ message: "User with listed id not found" }, { status: 404 });
    }
    return NextResponse.json({user});
}