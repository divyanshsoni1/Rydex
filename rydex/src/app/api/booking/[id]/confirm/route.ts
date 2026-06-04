import connectDB from "@/lib/mongodb";
import BookingModel from "@/models/BookingModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const bookingId = (await context.params).id;

        const booking = await BookingModel.findById(bookingId);
        if (!booking) {
            return NextResponse.json({ success: false, message: "Booking not Found" });
        }

        booking.paymentStatus = "cash";
        booking.bookingStatus = "confirmed";

        await booking.save();

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: `Cash Confirm error ${error}` }, { status: 500 });
    }
}