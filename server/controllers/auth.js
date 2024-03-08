import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt"; // Import bcrypt for password comparison

export const loginUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ _id: user._id }, "miow", { expiresIn: "15m" });

        // Log "moye moye" if login is successful
        console.log("moye moye");
        console.log(token);

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};
