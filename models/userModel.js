import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        FirstName: String,
        LastName: String,
        AccountNO: { type: Number, unique: true },
        UserPassword: String,
        ServiceCharge: Number,
        Balance: Number,
        Status: Boolean
    },
    {
        timestamps: true
    }
)

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;