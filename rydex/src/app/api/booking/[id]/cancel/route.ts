import connectDB from "@/lib/mongodb";
import BookingModel from "@/models/BookingModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const id = (await context.params).id;
        await connectDB();

        const booking = await BookingModel.findById(id);

        if (!booking || booking.bookingStatus !== "requested") {
            return NextResponse.json({ message: 'Invalid Booking' }, { status: 400 });
        }

        booking.bookingStatus = "cancelled";

        await booking.save();
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: `Cancel booking error ${error}` }, { status: 500 });
    }
}