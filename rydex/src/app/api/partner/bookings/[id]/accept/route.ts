import connectDB from "@/lib/mongodb";
import BookingModel from "@/models/BookingModel";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const id = (await context.params).id;
        await connectDB();

        const booking = await BookingModel.findById(id);

        if (!booking || booking.bookingStatus !== "requested") {
            return NextResponse.json({ message: 'Invalid Booking' }, { status: 400 });
        }

        booking.bookingStatus = "awaiting_payment";
        booking.paymentDeadline = new Date(Date.now() + 5 * 60 * 1000);
        await booking.save();

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_SOCKET_SERVER_SECRET}/emit`,
                {
                    event: "accept-booking",
                    userId: booking.user,
                    data: booking.bookingStatus
                }
            );
        } catch (socketError) {
            console.error("Socket emission failed, but booking was saved:", socketError);
        }
        return NextResponse.json({ success: "true" }, { status: 200 }); 
    } catch (error) {
        return NextResponse.json({ message: `Accept booking error ${error}` }, { status: 500 });
    }
}