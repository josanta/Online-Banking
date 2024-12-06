import connectDB from "@/libs/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { MongoError } from "mongodb";

export async function POST(request) {
    try {
        const { FirstName, LastName, AccountNO, UserPassword, ServiceCharge, Balance, Status, profilePhoto } = await request.json();
        // var data = await request.json();
        // console.log("========> DAta");
        // console.log(data);
        await connectDB(); // Ensure connection to the database
        // console.log(`profile photo: ${profilePhoto}`)
        await User.create({ FirstName, LastName, AccountNO, UserPassword, ServiceCharge, Balance, Status, profilePhoto});

        return NextResponse.json({ message: "User Added!" }, { status: 201 });
    } catch (error) {
        if (error instanceof MongoError && error.code === 0) {
            // Duplicate key error (AccountNO already exists)
            return NextResponse.error("Account number already exists.", { status: 400 });
        } else {
            // Other errors
            console.error("Error:", error);
            return NextResponse.error("An error occurred while adding the user.", { status: 500 });
        }
    }
}

export async function GET(request) {
    await connectDB();
    const users = await User.find()
    return NextResponse.json({users})
}
