import connectDB from "@/lib/mongodb";
import ChatMessage from "@/models/chatMessage.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { bookingId} = await req.json();
        const msgs = await ChatMessage.find({
            bookingId
        });

        return NextResponse.json(msgs, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: `Get all Chat Error ${error}` }, { status: 500 });
    }
}