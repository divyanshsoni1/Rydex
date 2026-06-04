import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import BookingModel from "@/models/BookingModel";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const session = await auth();

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { message: "Unauthorized User" },
                { status: 401 }
            );
        }

        const user = await User.findOne({
            email: session.user.email,
        }).lean();

        if (!user) {
            return NextResponse.json(
                { message: "Driver not found" },
                { status: 404 }
            );
        }

        const booking = await BookingModel.findOne({
            driver: user._id,
            bookingStatus: {
                $in: ["confirmed", "started"],
            },
        })
        .populate("user vehicle driver")
        .lean();

        if (!booking) {
            return NextResponse.json(
                { message: "No active booking found" },
                { status: 200 }
            );
        }

        return NextResponse.json(booking, { status: 200 });

    } catch (error) {
        console.error("Get active ride error:", error);
    
        const errorMessage = error instanceof Error ? error.message : String(error);

        return NextResponse.json(
            { message: `Get active ride error: ${errorMessage}` },
            { status: 500 }
        );
    }
}