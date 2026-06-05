import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
    try {
        await connectDB();

        const session = await auth();
        if (!session || !session.user?.email) {
            return Response.json({ message: "Unauthorized User" }, { status: 400 })
        }

        const partner = await User.findOne({ email: session.user.email });
        if (!partner) {
            return Response.json({ message: "Partner not found" }, { status: 400 })
        }

        if (partner.videoKycStatus !== "rejected") {
            return Response.json({ message: "You cannot send KYC request at this time" }, { status: 400 })
        }

        partner.videoKycStatus = "pending";
        partner.videoKycRejectionReason = undefined;
        partner.videoKycRoomId = undefined;
        await partner.save();

        return Response.json({ success: true }, { status: 200 })
    } catch (error) {
        return Response.json({ message: `KYC Request Error ${error}` }, { status: 500 })
    }
}