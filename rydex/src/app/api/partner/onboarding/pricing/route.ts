import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Vehicle from "@/models/vehicle.model";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
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

        const vehicle = await Vehicle.findOne({ owner: partner._id });

        if (!vehicle) {
            return Response.json({ message: "Partner not found" }, { status: 400 })
        }

        const formData = await req.formData();

        const image = formData.get("image") as File | null;
        const baseFare = formData.get("baseFare");
        const pricePerKm = formData.get("pricePerKm");
        const waitingCharge = formData.get("waitingCharge");

        let updated = false;

        if (image && image.size > 0) {
            const imageUrl = await uploadOnCloudinary(image);
            if (imageUrl !== null) {
                vehicle.imageUrl = imageUrl as string;
                updated = true;
            }
        }

        if (baseFare !== null) {
            vehicle.baseFare = Number(baseFare);
            updated = true
        }

        if (waitingCharge !== null) {
            vehicle.waitingCharge = Number(waitingCharge);
            updated = true
        }

        if (pricePerKm !== null) {
            vehicle.pricePerKm = Number(pricePerKm);
            updated = true
        }

        if (updated == false) {
            return Response.json({ message: "Nothing to update" }, { status: 400 })
        }

        vehicle.status = "pending";
        vehicle.rejectionReason = undefined;
        await vehicle.save();
        partner.partnerOnboardingSteps = 6;
        await partner.save();

        return Response.json({ message: "Pricing Submitted" }, { status: 200 })

    } catch (error) {
        return Response.json({ message: `Pricing error ${error}` }, { status: 500 })
    }
}


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

        const vehicle = await Vehicle.findOne({ owner: partner._id });

        if (!vehicle) {
            return Response.json({ message: "Partner not found" }, { status: 400 })
        }

         return Response.json(vehicle, { status: 200 })
    } catch (error) {
         return Response.json({ message: `GET Pricing error ${error}` }, { status: 500 })
    }
}