import mongoose from "mongoose";

const mongoDbUrl = process.env.MONGODB_URL;
if (!mongoDbUrl) {
    throw new Error("MongoDB Url not found");
}

let cached = global.mongooseConn;
if (!cached) {
    cached = global.mongooseConn = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(mongoDbUrl).then((c) => c.connection);
    }

    try {
        const conn = await cached.promise;
        return conn;
    } catch (error) {
        console.log("Db error", error)
    }
}

export default connectDB;