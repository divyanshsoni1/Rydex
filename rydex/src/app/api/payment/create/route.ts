import connectDB from "@/lib/mongodb";
import razorpay from "@/lib/razorpay";
import BookingModel from "@/models/BookingModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { bookingId } = await req.json();
        const booking = await BookingModel.findById(bookingId);
        if (!booking) {
            return NextResponse.json({ message: "Booking not Found" }, { status: 400 });
        }

        const order = await razorpay.orders.create({
            amount: booking.fare * 100,
            currency: "INR",
            receipt: booking._id.toString()
        });

        booking.bookingStatus = "awaiting_payment";
        await booking.save();

        return NextResponse.json(
            {
                orderId: order.id,
                amount: order.amount
            },
            { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: `Payment create error ${error}` }, { status: 500 });
    }
}