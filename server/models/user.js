import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    // profilePic: { type: String }
}, { collection: 'dhavalll' }); // Specify the collection name here

const User = mongoose.model("User", userSchema);
export default User;
