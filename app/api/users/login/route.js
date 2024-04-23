import connectDB from "@/libs/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 })
}
export async function PUT(req) {
    return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 })
}
export async function DELETE(req) {
    return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 })
}

export async function POST(req) {
    try {
        
        if (req.method === "POST") {
            const { AccountNO, UserPassword } = await req.json();
            await connectDB();
            const user = await User.findOne({ AccountNO, UserPassword });
            // console.log(user)
            if (!user) {
                return NextResponse.json({ message: "Invalid account number or password" }, { status: 401 })
            }
            return NextResponse.json({user});
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}