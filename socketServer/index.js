import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import User from "./models/User.js";

dotenv.config();

const port = process.env.PORT || 500;
const mongodbUrl = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUrl);
        console.log("DB Connected.");
    } catch (error) {
        console.log("DB Error");
        console.log(error);
    }
};

const app = express();
app.use(express.json());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL
    }
});

app.post("/emit", async (req, res) => {
    const { event, userId, data } = req.body;
    try {
        if (!event || !userId) {
            return res.status(400).json({
                success: false,
                message: "Missing fields"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.socketId) {
            return res.status(400).json({
                success: false,
                message: "User offline"
            });
        }

        const socketExists = io.sockets.sockets.get(user.socketId);

        if (!socketExists) {
            await User.findByIdAndUpdate(userId, {
                socketId: null,
                isOnline: false
            });

            return res.status(400).json({
                success: false,
                message: "Stale socket"
            });
        }

        io.to(user.socketId).emit(event, data);
        return res.json({
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

io.on("connection", (socket) => {
    socket.on("identity", async (userId) => {
        try {
            if (!userId) return;
            socket.userId = userId;
            await User.findByIdAndUpdate(userId, {
                socketId: socket.id,
                isOnline: true
            });

        } catch (error) {
            console.log(error);
        }
    });

    socket.on("update-location", async ({ userId, latitude, longitude }) => {
        try {
            await User.findByIdAndUpdate(userId, {
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                }
            });
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("join-ride", (bookingId) => {
        console.log("join ride", bookingId)
        socket.join(`ride-${bookingId}`)
    })

    socket.on("driver-location-update", ({ bookingId, latitude, longitude, status }) => {
        io.to(`ride-${bookingId}`).emit("driver-location", {
            latitude,
            longitude
        })
    })

    socket.on("chat-message", (data) => {
        io.to(`ride-${data.bookingId}`).emit("chat-message", data)
    })

    socket.on("disconnect", async () => {
        try {
            if (!socket.userId) return;
            await User.findByIdAndUpdate(socket.userId, {
                socketId: null,
                isOnline: false
            });
        } catch (error) {
            console.log(error);
        }
    });
});

server.listen(port, () => {
    console.log("Server Started.");
    connectDB();
});