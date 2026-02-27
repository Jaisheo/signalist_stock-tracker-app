import "dotenv/config";
import mongoose from "mongoose";
import { connectToDatabase } from "../database/mongoose";

async function main() {
    try {
        console.log("🔄 Testing MongoDB connection...");

        const start = Date.now();

        await connectToDatabase();

        const elapsed = Date.now() - start;

        console.log(
            `✅ MongoDB connected successfully!`
        );

        console.log(
            `📦 Database: ${mongoose.connection.name}`
        );

        console.log(
            `🌐 Host: ${mongoose.connection.host}`
        );

        console.log(
            `⏱ Connection time: ${elapsed}ms`
        );

        await mongoose.connection.close();
        console.log("🔌 Connection closed.");

        process.exit(0);
    } catch (error) {
        console.error("❌ Database connection failed:");
        console.error(error);
        process.exit(1);
    }
}

main();