import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import BookingModel from "@/models/BookingModel";
import User from "@/models/User";
import vehicle from "@/models/vehicle.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const session = await auth();

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { message: "Unauthorized User" },
                { status: 401 }
            );
        }

        const driver = await User.findOne({
            email: session.user.email,
        });

        if (!driver) {
            return NextResponse.json(
                { message: "Driver not found" },
                { status: 404 }
            );
        }

        const bookings = await BookingModel.find({
            driver: driver._id,
        })
            .populate([
                { path: "user" },
                { path: "driver" },
                { path: "vehicle" },
            ])
            .sort({ createdAt: -1 });

        return NextResponse.json(bookings, { status: 200 });

    } catch (error) {
        console.error("Get bookings error:", error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}