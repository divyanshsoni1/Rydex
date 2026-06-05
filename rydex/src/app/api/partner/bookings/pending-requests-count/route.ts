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
            return NextResponse.json({ message: "Unauthorized User" }, { status: 400 })
        }

        const partner = await User.findOne({ email: session.user.email });
        if (!partner) {
            return NextResponse.json({ message: "Partner not found" }, { status: 400 })
        }

        const count = await BookingModel.countDocuments({
            driver: partner._id,
            bookingStatus: "requested"
        })

        return NextResponse.json(count, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Fetch pending request count error ${error}` }, { status: 500 });
    }
}