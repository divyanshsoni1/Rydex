import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/mongodb";
import PartnerDocs from "@/models/PartnerDocs";
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

        const formData = await req.formData();
        const aadhar = formData.get("aadhar") as Blob | null;
        const license = formData.get("license") as Blob | null;
        const rc = formData.get("rc") as Blob | null;

        if (!aadhar || !license || !rc) {
            return Response.json({ message: "All Documents are required" }, { status: 400 })
        }

        const updatePayload: any = {
            status: "pending"
        }

        if (aadhar) {
            const url = await uploadOnCloudinary(aadhar);
            if (!url) {
                return Response.json({ message: "Aadhar Upload Failed" }, { status: 500 })
            }
            updatePayload.aadharUrl = url;
        }

        if (license) {
            const url = await uploadOnCloudinary(license);
            if (!url) {
                return Response.json({ message: "License Upload Failed" }, { status: 500 })
            }
            updatePayload.licenseUrl = url;
        }

        if (rc) {
            const url = await uploadOnCloudinary(rc);
            if (!url) {
                return Response.json({ message: "RC Upload Failed" }, { status: 500 })
            }
            updatePayload.rcUrl = url;
        }

        const partnerDoc = await PartnerDocs.findOneAndUpdate({ owner: user._id }, { $set: updatePayload }, { upsert: true, new: true });

        if (user.partnerOnboardingSteps < 2) {
            user.partnerOnboardingSteps = 2;
        }else {
            user.partnerOnboardingSteps = 3
        }
        user.partnerStatus = "pending";
        await user.save();

        return Response.json(partnerDoc, { status: 201 })
    } catch (error) {
        return Response.json({ message: `PartnerDocs error ${error}` }, { status: 500 })
    }
}