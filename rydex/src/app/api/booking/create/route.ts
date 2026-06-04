import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import BookingModel from "@/models/BookingModel";
import User from "@/models/User";
import axios from "axios";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ message: "unauthorized access" }, { status: 400 });
        }

        const { driverId, vehicleId, pickUpAddress, dropAddress, pickUpLocation, dropLocation, fare, mobileNumber } = await req.json();

        if (!driverId || !vehicleId || !pickUpLocation.coordinates || !dropLocation.coordinates) {
            return NextResponse.json({ message: "Missing required details" }, { status: 400 });
        }

        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        const driver = await User.findById(driverId);
        if (!driver) {
            return NextResponse.json({ message: "Driver not found" }, { status: 400 });
        }

        const existing = await BookingModel.findOne({
            user: user?.id,
            bookingStatus: {
                $in: ["requested", "awaiting_payment", "confirmed", "started"]
            }
        });

        if (existing) {
            return NextResponse.json(existing, { status: 200 });
        }

        const booking = await BookingModel.create({
            user: user?._id,
            driver: driverId,
            vehicle: vehicleId,
            pickUpAddress,
            dropAddress,
            pickUpLocation,
            dropLocation,
            fare,
            userMobileNumber: mobileNumber,
            driverMobileNumber: driver.mobileNumber,
            bookingStatus: "requested"
        });

        await axios.post(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_SECRET}/emit`, {
            event: "new-booking",
            userId: driverId,
            data: booking
        })

        return NextResponse.json(booking, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: `create booking error ${error}` }, { status: 500 })
    }
}