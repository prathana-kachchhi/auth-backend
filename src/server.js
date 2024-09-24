import express from "express";
import { PORT } from "./config/db.config.js";
import userRoutes from "./routes/useRoutes.js";
import connectDB from "./config/db.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDB();
