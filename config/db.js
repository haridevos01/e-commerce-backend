import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb atlas connected");
    } catch (error){

        console.error(err);
        process.exit(1);
    }
}