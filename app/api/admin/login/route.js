import connectDB from "@/libs/mongodb";
import Admin from "@/models/adminModel";
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
            const { name, password } = await req.json();
            await connectDB();
            const admin = await Admin.findOne({ name, password });
            console.log(admin)
            if (!admin) {
                return NextResponse.json({ message: "Invalid username or password" }, { status: 401 })
            }
            return NextResponse.json({ message: "Login successful"}, {status: 200});
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}