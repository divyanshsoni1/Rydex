import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import BookingModel from "@/models/BookingModel";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const session = await auth();

        const driver = await User.findOne({ email: session?.user?.email });

        if (!driver) {
            return NextResponse.json(
                { message: "Driver Not Found" },
                { status: 400 }
            )
        }

        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

        const bookings = await BookingModel.find({
            driver: driver._id,
            paymentStatus: "paid",
            createdAt: { $gte: sevenDaysAgo }
        }).select("partnerAmount createdAt")

        let earningMap: Record<string, number> = {}

        bookings.forEach(b => {
            if (!b.createdAt) return;
            const date = new Date(b.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short"
            })

            if (!earningMap[date]) {
                earningMap[date] = 0
            }

            earningMap[date] = (earningMap[date] ?? 0) + (b.partnerAmount ?? 0);
        });


        const earnings = Object.entries(earningMap).map(([date, earnings]) => (
            {
                date, earnings
            }
        ))

        return NextResponse.json(
            earnings,
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: "Partner earning error" },
            { status: 500 }
        )
    }
}