import connectDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import { MongoError } from "mongodb";
import Admin from "@/models/adminModel";

export async function POST(request) {
    try {
        const { name, password } = await request.json();
        console.log("Data:", { name, password });

        await connectDB(); // Ensure connection to the database

        await Admin.create({ name, password });

        return NextResponse.json({ message: "Admin Added!" }, { status: 201 });
    } catch (error) {
        if (error instanceof MongoError && error.code === 0) {
            // Duplicate key error (AccountNO already exists)
            return NextResponse.error("Account number already exists.", { status: 400 });
        } else {
            // Other errors
            console.error("Error:", error);
            return NextResponse.error("An error occurred while adding admin user.", { status: 500 });
        }
    }
}