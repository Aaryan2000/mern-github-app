import mongoose from "mongoose";

export default async function connectMongoDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected");
        
    } catch (error) {
        console.log("Error Connecting to MongoDB:",error.message);
    }
}