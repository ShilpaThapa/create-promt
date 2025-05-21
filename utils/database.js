import mongoose from "mongoose";

let isConnected = false; //track the connnection status

export const connectToDB = async () => {
    mongoose.set('strictQuery',true);

    if (isConnected) {
        console.log('mongoDB database connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        isConnected = true;

        console.log('mongodb connected');
    } catch (error) {
        console.log(error);
    }
}