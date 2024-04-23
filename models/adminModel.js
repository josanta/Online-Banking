import mongoose, { Schema } from "mongoose"

const AdminSchema = new Schema(
    {
        name: String,
        password: String
    }
)

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)

export default Admin;