import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import BookingModel from "@/models/BookingModel";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "Unauthorized User" }, { status: 400 })
        }

        const partner = await User.findOne({ email: session.user.email });
        if (!partner) {
            return NextResponse.json({ message: "Partner not found" }, { status: 400 })
        }

        console.log("Fetching bookings for Partner ID:", partner._id);

        const bookings = await BookingModel.find({
            driver: partner._id,
            bookingStatus: "requested"
        });

        console.log("Bookings found in database:", bookings.length);

        return NextResponse.json(bookings, { status: 200 });
    } catch (error) {
        console.error("Backend Error:", error);
        return NextResponse.json({ message: `Fetch pending request error ${error}` }, { status: 500 });
    }
}