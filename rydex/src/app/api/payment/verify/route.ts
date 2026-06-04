import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import BookingModel from "@/models/BookingModel";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { bookingId, razorpay_payment_id, razorpay_signature, razorpay_order_id } = await req.json();

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({ success: false, message: "Invalid Signature" });
        }

        const booking = await BookingModel.findById(bookingId);
        if (!booking) {
            return NextResponse.json({ success: false, message: "Booking not Found" });
        }

        const adminCommision = booking.fare * 0.10;
        const partnerAmount = booking.fare - adminCommision;
        booking.adminCommission = adminCommision;
        booking.partnerAmount = partnerAmount;
        booking.paymentStatus = "paid";
        booking.bookingStatus = "confirmed";

        await booking.save();

        return NextResponse.json({ success: true, adminCommision, partnerAmount }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: `Payment verify error ${error}` }, { status: 500 });
    }
}