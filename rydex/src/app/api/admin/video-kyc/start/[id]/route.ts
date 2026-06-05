import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session || !session.user?.email || session.user.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized Admin Acsess" }, { status: 400 });
        }

        await connectDB();
        const partnerId = (await context.params).id;
        const partner = await User.findById(partnerId);

        if (!partner || partner.role !== "partner") {
            return NextResponse.json({ message: "Partner not found" }, { status: 400 });
        }

        const roomId = `kyc-${partner._id}-${Date.now()}`;
        partner.videoKycRoomId = roomId;
        partner.videoKycStatus = "in_progress";
        partner.partnerOnboardingSteps = 4;
        await partner.save();

        return NextResponse.json(roomId, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: `Video kyc start error ${error}` }, { status: 500 });
    }
}