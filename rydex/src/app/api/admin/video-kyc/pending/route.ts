import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
    try {
        await connectDB();

        const session = await auth();
        if (!session || !session.user?.email || session.user.role !== "admin") {
            return Response.json({ message: "Unauthorized User" }, { status: 400 })
        }

        const partner = await User.find({
            role: 'partner',
            partnerOnboardingSteps: 4,
            videoKycStatus: { $in: ['pending', 'in_progress'] }
        })

        return Response.json(partner, { status: 200 });

    } catch (error) {
        return Response.json({ message: `Partner Kyc get error ${error}` }, { status: 500 });
    }
}