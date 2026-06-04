import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Vehicle from "@/models/vehicle.model";
import { NextRequest } from "next/server";

const vehicleRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{0,2}[0-9]{4}$/;

export async function POST(req: Request) {
    try {
        await connectDB();

        const session = await auth();
        if (!session || !session.user?.email) {
            console.log("sessionn")
            return Response.json({ message: "Unauthorized User" }, { status: 400 })
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            console.log("user not found")
            return Response.json({ message: "User not found" }, { status: 400 })
        }

        console.log("Before role update:", user.location);

        const { type, number, vehicleModel } = await req.json();

        if (!type || !number || !vehicleModel) {
            return Response.json({ message: "Missing Required details" }, { status: 400 })
        }

        if (!vehicleRegex.test(number)) {
            return Response.json({ message: "Invalid Vehicle Number Format" }, { status: 400 })
        }

        const vehicleNumber = number.toUpperCase();

        let vehicle = await Vehicle.findOne({ owner: user._id });

        if (vehicle) {
            vehicle.type = type;
            vehicle.number = vehicleNumber;
            vehicle.vehicleModel = vehicleModel;
            vehicle.status = "pending";
            await vehicle.save();

            if (user.partnerOnboardingSteps < 2) {
                user.partnerOnboardingSteps = 2;
                user.partnerStatus = "pending";
                await user.save();
                const updatedUser = await User.findById(user._id);
                console.log("After role update:", updatedUser?.location);
            } else {
                user.partnerOnboardingSteps = 3;
                user.partnerStatus = "pending";
                await user.save();
                const updatedUser = await User.findById(user._id);
                console.log("After role update:", updatedUser?.location);
            }

            return Response.json(vehicle, { status: 200 });
        }

        const duplicate = await Vehicle.findOne({ number: vehicleNumber });

        if (duplicate) {
            return Response.json({ message: "Vehicle already Registered" }, { status: 400 })
        }

        vehicle = await Vehicle.create({
            owner: user._id,
            type,
            number: vehicleNumber,
            vehicleModel,
        })

        if (user.partnerOnboardingSteps < 1) {
            user.partnerOnboardingSteps = 1;
        }

        user.partnerStatus = "pending";

        user.role = "partner";
        await user.save();
        const updatedUser = await User.findById(user._id);
        console.log("After role update:", updatedUser?.location);

        return Response.json(vehicle, { status: 201 });

    } catch (error) {
        console.log("error", error)
        return Response.json({ message: `vehicle error ${error}` }, { status: 500 });
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

        let vehicle = await Vehicle.findOne({ owner: user._id });
        if (vehicle) {
            return Response.json(vehicle, { status: 201 });
        } else {
             return Response.json({ message: "Vehicle not found" }, { status: 400 });
        }

    } catch (error) {
        return Response.json({ message: `vehicle error ${error}` }, { status: 500 });
    }
}