import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const session = await auth();
        if (!session || !session.user?.email || session.user.role !== "admin") {
            return Response.json({ message: "Unauthorized User" }, { status: 400 })
        }

        const { roomid, action, reason } = await req.json();
        if (!roomid) {
            return Response.json({ message: "Room Id is required" }, { status: 400 })
        }

        if (!["approved", "rejected"].includes(action)) {
            return Response.json({ message: "Invalid action" }, { status: 400 })
        }

        const partner = await User.findOne({
            videoKycRoomId: roomid,
            role: 'partner'
        });

        if (!partner) {
            return Response.json({ message: "Partner not found" }, { status: 400 })
        }

        if (action === 'approved') {
            partner.videoKycStatus = "approved";
            partner.videoKycRejectionReason = undefined,
            partner.partnerOnboardingSteps = 5
        }

        if (action === 'rejected') {
            if (!reason) {
                return Response.json({ message: "Rejection reason is required" }, { status: 400 })
            }
            partner.videoKycStatus = "rejected"
            partner.videoKycRejectionReason = reason.trim()
        }

        await partner.save();

        return Response.json({ status: partner.videoKycStatus }, { status: 200 });
    } catch (error) {
        return Response.json({ message: `KYC Complete error ${error}` }, { status: 500 })
    }
}