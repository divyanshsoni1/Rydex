import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import BookingModel from "@/models/BookingModel";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const session = await auth();

        if (!session || !session.user?.email) {
            return NextResponse.json({ booking: null })
        }

        const user = await User.findOne({ email: session.user.email });

        const booking = await BookingModel.findOne({
            user: user?._id,
            bookingStatus: { $in: ["requested", "awaiting_payment", "confirmed", "started"] }
        });

        if (!booking) {
            return NextResponse.json({ booking: "idle" });
        }

        return NextResponse.json({ booking });
    } catch (error) {
        return NextResponse.json({ message: `Get active booking error` }, { status: 500 });
    }
}