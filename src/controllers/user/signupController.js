import User from "../../models/user.model.js";
import joi from "joi";
import bcrypt from "bcrypt";



// SignupController

export default {
    validate: joi.object({
        username: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")).required().messages({
            "string.pattern.base": "Create a strong password",
            "string.empty": "Password is required"
        }),
    }),
    handler: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, password: hashedPassword });
            res.status(200).json({ message: "User created successfully", user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}




