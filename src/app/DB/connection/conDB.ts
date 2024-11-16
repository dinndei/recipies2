import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

let isConnected = false;

export const connectToDB = async () => {
    if (isConnected || mongoose.connection.readyState >= 1) {
        console.log("Already connected to MongoDB");
        return;
    }
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 30000, 
            socketTimeoutMS: 45000
        });
        isConnected = true;
        console.log("MongoDB connected successfully ☺");
    } catch (err) {
        throw new Error("Error connecting to MongoDB: " + err);
    }
};

export const disconnectFromDB = async () => {
    try {
        await mongoose.disconnect();
        isConnected = false;
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Error disconnecting from MongoDB:', err);
    }
};