import createTokenAndSaveCookie from "../jwt/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;
    try {


        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, });

        await newUser.save();
        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res)
            res.status(201).json({
                message: "User registered successfully", user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                },
            });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        createTokenAndSaveCookie(user._id, res);

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const getUserProfile = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filiteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password")
        res.status(200).json({ filiteredUsers });
    } catch (error) {
        console.log("Error in allUsers Controller : " + error);
        res.status(500).json({ message: "Server error" });
    }
}