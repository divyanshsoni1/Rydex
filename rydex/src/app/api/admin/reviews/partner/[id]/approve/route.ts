import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import PartnerBank from "@/models/PartnerBank";
import PartnerDocs from "@/models/PartnerDocs";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
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

        if (partner.partnerStatus === "approved") {
            return NextResponse.json({ message: "Partner already Approved" }, { status: 400 });
        }

        const partnerDocs = await PartnerDocs.findOne({ owner: partner._id });
        const partnerBank = await PartnerBank.findOne({ owner: partner._id });

        partner.partnerStatus = "approved";
        partner.partnerOnboardingSteps = 4;
        partner.videoKycStatus = "pending";

        await partner.save();

        if (!partnerDocs || !partnerBank) {
            return NextResponse.json({ message: "Partner did not complete the onboarding steps" }, { status: 400 });
        }

        partnerDocs.status = "approved";
        await partnerDocs?.save();

        partnerBank.status = "verified"
        await partnerBank.save();

        return NextResponse.json({ message: "Partner Approved Successfully!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Approve Partner error ${error}` }, { status: 500 });
    }
}