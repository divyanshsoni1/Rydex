import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import PartnerBank from "@/models/PartnerBank";
import User from "@/models/User";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const session = await auth();
        if (!session || !session.user?.email) {
            return Response.json({ message: "Unauthorized User" }, { status: 400 })
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return Response.json({ message: "User not found" }, { status: 400 })
        }

        const { accountHolder, accountNumber, ifsc, upi, mobileNumber } = await req.json();

        if (!accountHolder || !accountNumber || !ifsc || !mobileNumber) {
            return Response.json({ message: "All details are required" }, { status: 400 })
        }

        const partnerBank = await PartnerBank.findOneAndUpdate(
            { owner: user._id },
            { accountHolder, accountNumber, ifsc, upi, status: "added" },
            { upsert: true, new: true });

        user.mobileNumber = mobileNumber;
        user.partnerOnboardingSteps = 3;
        user.partnerStatus = "pending";
        await user.save();

        return Response.json(partnerBank, { status: 201 })

    } catch (error) {
        return Response.json({ message: `Get partner bank error ${error}` }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const session = await auth();
        if (!session || !session.user?.email) {
            return Response.json({ message: "Unauthorized User" }, { status: 400 })
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return Response.json({ message: "User not found" }, { status: 400 })
        }

        const partnerBank = await PartnerBank.findOne({ owner: user._id });
        if (partnerBank) {
            return Response.json({ partnerBank, mobileNumber: user.mobileNumber }, { status: 200 });
        } else {
             return Response.json({ message: "Bank details not found" }, { status: 400 });
        }
    } catch (error) {
        return Response.json({ message: `Get partner bank error ${error}` }, { status: 500 })
    }
}