import mongoose from "mongoose";

const connectMongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectMongodb;