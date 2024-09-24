import "dotenv/config";

export const PORT = process.env.PORT || 3000;
export const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://prathanakachchhi:prathu%401919@kp.fnbhl.mongodb.net/fullstackDatabase";
export const JWT_SECRET = process.env.JWT_SECRET || "4971abc";

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;
