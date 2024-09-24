import express from "express";
import signup from "../controllers/user/signupController.js";
import login from "../controllers/user/loginController.js";
import validate from "../middlewares/validation.js";

const userRoutes = express.Router();

userRoutes.get("/", (req, res) => {
    res.status(200).json({ message: "welcome to the user API" });
});

userRoutes.post("/signup", validate(signup.validate), signup.handler)
userRoutes.post("/login", validate(login.validate), login.handler)

export default userRoutes;