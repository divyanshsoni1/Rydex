import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Vehicle from "@/models/vehicle.model";
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
        const vehicleId = (await context.params).id;
        const vehicle = await Vehicle.findById(vehicleId).populate("owner");

        if (!vehicle) {
            return NextResponse.json({ message: "vehicle not found" }, { status: 400 });
        }

        return NextResponse.json(vehicle, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Vehicle Review GET error ${error}` }, { status: 500 });
    }
}