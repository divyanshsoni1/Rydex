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

        // 1. Save the rejected status to the database
        booking.bookingStatus = "rejected";
        await booking.save();

        // 2. Isolate the Socket emission so it doesn't crash the route
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_SOCKET_SERVER_SECRET}/emit`,
                {
                    event: "reject-booking",
                    userId: booking.user,
                    data: booking.bookingStatus
                }
            );
        } catch (socketError) {
            console.error("Socket emission failed, but booking was rejected:", socketError);
        }

        // 3. Safely return success to the frontend
        return NextResponse.json({ success: "true" }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ message: `Reject booking error ${error}` }, { status: 500 });
    }
}