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

        if (!booking.pickUpOtp) {
            return NextResponse.json(
                { message: "pick up otp not generated" },
                { status: 400 }
            )
        }

        if (booking.pickUpOtp !== otp) {
            return NextResponse.json(
                { message: "Incorrect Pickup Otp" },
                { status: 400 }
            )
        }

        if (booking.pickUpOtpExpire! < new Date()) {
            return NextResponse.json(
                { message: "OTP Expired" },
                { status: 400 }
            )
        }

        booking.bookingStatus = "started"
        booking.pickUpOtp = "";
        booking.pickUpOtpExpire = undefined;
        await booking.save()

        return NextResponse.json(
            { message: "pick up otp Verified" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "pick up otp verify error" },
            { status: 500 }
        )
    }
}