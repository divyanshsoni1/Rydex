import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import PartnerBank from "@/models/PartnerBank";
import PartnerDocs from "@/models/PartnerDocs";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();

        if (!session || !session.user?.email || session.user.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized Admin Acsess" }, { status: 400 });
        }

        await connectDB();
        const { rejectionReason } = await req.json();
        const partnerId = (await context.params).id;
        const partner = await User.findById(partnerId);

        if (!partner || partner.role !== "partner") {
            return NextResponse.json({ message: "Partner not found" }, { status: 400 });
        }

        partner.partnerStatus = "rejected";

        partner.rejectionReason = rejectionReason;

        await partner.save();

        return NextResponse.json({ message: "Partner Rejected Successfully!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Rejected Partner error ${error}` }, { status: 500 });
    }
}