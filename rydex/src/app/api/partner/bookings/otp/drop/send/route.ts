import connectDB from "@/lib/mongodb";
import { sendEmail } from "@/lib/sendMail";
import BookingModel from "@/models/BookingModel";
import { IUser } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const { bookingId } = await req.json();

        const booking = await BookingModel.findById(bookingId)
            .populate<{ user: IUser }>("user");

        if (!booking) {
            return NextResponse.json(
                { message: "booking not found" },
                { status: 400 }
            )
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        booking.dropOtp = otp
        booking.dropOtpExpire = new Date(Date.now() + 5 * 60 * 1000)
        await booking.save()

        const driver = booking.driver as IUser;
        const driverName = driver.name || "Your Driver";

        if (booking.user.email) {
            await sendEmail(
                booking.user.email,
                "Your Ride Completion OTP - RYDEX",
                `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Ride Completion OTP</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
          
          <tr>
            <td align="center" style="background:#111827;padding:24px;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;">
                RYDEX
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 35px;color:#374151;">
              <h2 style="margin-top:0;color:#111827;">
                Complete Your Ride
              </h2>

              <p style="font-size:16px;line-height:1.6;">
                Your driver has reached the destination and requested ride completion verification.
              </p>

              <p style="font-size:16px;line-height:1.6;">
                Please share the following OTP with your driver to successfully complete the ride:
              </p>

              <div style="text-align:center;margin:30px 0;">
                <div
                  style="
                    display:inline-block;
                    background:#f3f4f6;
                    border:2px dashed #d1d5db;
                    padding:18px 32px;
                    border-radius:10px;
                    font-size:36px;
                    font-weight:bold;
                    letter-spacing:10px;
                    color:#111827;
                  "
                >
                  ${otp}
                </div>
              </div>

              <p style="font-size:15px;color:#6b7280;">
                This OTP is valid for <strong>5 minutes</strong>.
              </p>

              <p style="font-size:15px;color:#6b7280;">
                For your safety, never share this OTP with anyone other than the driver assigned to your ride.
              </p>

              <hr style="border:none;border-top:1px solid #e5e7eb;margin:30px 0;" />

              <p style="margin-bottom:5px;">
                Regards,
              </p>

              <p style="margin-top:0;">
                <strong>${driverName}</strong><br/>
                    On behalf of the RYDEX Team
              </p>
            </td>
          </tr>

          <tr>
            <td
              align="center"
              style="background:#f9fafb;padding:20px;color:#6b7280;font-size:13px;"
            >
              <p style="margin:0;">
                This is an automated message from RYDEX.
              </p>

              <p style="margin:8px 0 0;">
                © 2026 RYDEX. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
            );
        }


        return NextResponse.json(
            { message: "Drop otp sent" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Drop otp error" },
            { status: 500 }
        )
    }
}