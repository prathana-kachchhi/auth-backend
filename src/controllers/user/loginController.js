import { JWT_SECRET } from "../../config/db.config.js";
import User from "../../models/user.model.js";
import joi from "joi";
import bcrypt from "bcrypt";


// LoginController
export default {
    validate: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required().messages({
            "string.empty": "Password is required"
        })
    }),
    handler: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid password" });
            }
            const token = generateToken(user);
            res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}


//generate token
const generateToken = (user) => {
    const payload = {
        id: user._id,
        iat: Date.now(),
    }
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}
