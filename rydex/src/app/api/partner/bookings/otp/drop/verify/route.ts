import connectDB from "@/lib/mongodb";
import BookingModel from "@/models/BookingModel";
import { IUser } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const { bookingId, otp } = await req.json();

        const booking = await BookingModel.findById(bookingId)
            .populate<{ user: IUser }>("user");

        if (!booking) {
            return NextResponse.json(
                { message: "booking not found" },
                { status: 400 }
            )
        }

        if (!booking.dropOtp) {
            return NextResponse.json(
                { message: "Drop otp not generated" },
                { status: 400 }
            )
        }

        if (booking.dropOtp !== otp) {
            return NextResponse.json(
                { message: "Incorrect Drop Otp" },
                { status: 400 }
            )
        }

        if (booking.dropOtpExpire! < new Date()) {
            return NextResponse.json(
                { message: "OTP Expired" },
                { status: 400 }
            )
        }

        if (booking.paymentStatus === "cash") {
            const adminCommision = booking.fare * 0.10;
            const partnerAmount = booking.fare - adminCommision;
            booking.adminCommission = adminCommision;
            booking.partnerAmount = partnerAmount;
        }

        booking.paymentStatus = "paid";
        booking.bookingStatus = "completed"
        booking.dropOtp = "";
        booking.dropOtpExpire = undefined;
        await booking.save()

        return NextResponse.json(
            { message: "Drop otp Verified" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Drop otp verify error" },
            { status: 500 }
        )
    }
}