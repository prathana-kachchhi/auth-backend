import User from "../models/user.model.js";
import joi from "joi";




// SignupController
const signupSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")).required().messages({
        "string.pattern.base": "Create a strong password",
        "string.empty": "Password is required"
    }),
});

export const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const { error } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error });
        }

        const user = await User.create({ username, email, password });
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// LoginController
const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().messages({
        "string.empty": "Password is required"
    }),
});

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


