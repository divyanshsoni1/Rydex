import connectDB from "@/lib/mongodb";
import { sendEmail } from "@/lib/sendMail";
import BookingModel from "@/models/BookingModel";
import { IUser } from "@/models/User";
import { IVehicle } from "@/models/vehicle.model";
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
        booking.pickUpOtp = otp
        booking.pickUpOtpExpire = new Date(Date.now() + 5 * 60 * 1000)
        await booking.save();

        const driver = booking.driver as IUser;
        const vehicle = booking.vehicle as IVehicle;

        if (booking.user.email) {
            await sendEmail(
                booking.user.email,
                "Your Pickup OTP - RYDEX",
                `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Pickup OTP - RYDEX</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:30px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="center" style="background:#111827;padding:24px;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:bold;">
                RYDEX
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px 35px;color:#374151;">

              <h2 style="margin-top:0;color:#111827;">
                Verify Your Ride
              </h2>

              <p style="font-size:16px;line-height:1.6;">
                Your driver has arrived at the pickup location and is ready to begin your trip.
              </p>

              <p style="font-size:16px;line-height:1.6;">
                Please share the following OTP with your driver to verify your identity and start the ride:
              </p>

              <div style="text-align:center;margin:35px 0;">
                <div style="
                  display:inline-block;
                  background:#f3f4f6;
                  border:2px dashed #d1d5db;
                  border-radius:10px;
                  padding:18px 32px;
                  font-size:36px;
                  font-weight:bold;
                  letter-spacing:10px;
                  color:#111827;
                ">
                  ${otp}
                </div>
              </div>

              <!-- Ride Details -->
              <div style="
                background:#f9fafb;
                border:1px solid #e5e7eb;
                border-radius:10px;
                padding:20px;
                margin:25px 0;
              ">
                <h3 style="
                  margin:0 0 15px 0;
                  color:#111827;
                  font-size:16px;
                ">
                  Ride Details
                </h3>

                <p style="margin:8px 0;">
                  <strong>Booking ID:</strong> ${booking._id}
                </p>

                <p style="margin:8px 0;">
                  <strong>Pickup Location:</strong> ${booking.pickUpAddress}
                </p>

                ${booking.dropAddress
                    ? `
                <p style="margin:8px 0;">
                  <strong>Drop Location:</strong> ${booking.dropAddress}
                </p>
                `
                    : ""
                }

                ${booking.fare
                    ? `
                <p style="margin:8px 0;">
                  <strong>Estimated Fare:</strong> ₹${booking.fare}
                </p>
                `
                    : ""
                }

                ${vehicle?.type
                    ? `
                <p style="margin:8px 0;">
                  <strong>Vehicle Type:</strong> ${vehicle.type}
                </p>
                `
                    : ""
                }

                ${vehicle?.vehicleModel
                    ? `
                <p style="margin:8px 0;">
                  <strong>Vehicle Model:</strong> ${vehicle.vehicleModel}
                </p>
                `
                    : ""
                }

                ${vehicle?.number
                    ? `
                <p style="margin:8px 0;">
                  <strong>Vehicle Number:</strong> ${vehicle.number}
                </p>
                `
                    : ""
                }

                ${driver?.name
                    ? `
                <p style="margin:8px 0;">
                  <strong>Driver:</strong> ${driver.name}
                </p>
                `
                    : ""
                }
              </div>

              <p style="font-size:15px;color:#6b7280;">
                ⏳ This OTP is valid for <strong>5 minutes</strong>.
              </p>

              <p style="font-size:15px;color:#6b7280;">
                For your safety, never share this OTP with anyone except the driver assigned to your booking.
              </p>

              <p style="font-size:15px;color:#6b7280;">
                Once verified, your driver will be able to start the trip.
              </p>

              <hr style="border:none;border-top:1px solid #e5e7eb;margin:30px 0;" />

              <p style="margin-bottom:5px;">
                Regards,
              </p>

              <p style="margin-top:0;">
                <strong>${driver?.name || "Your Driver"}</strong><br/>
                Driver Partner, RYDEX
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background:#f9fafb;padding:20px;color:#6b7280;font-size:13px;">
              <p style="margin:0;">
                This is an automated message from RYDEX.
              </p>

              <p style="margin:8px 0 0;">
                If you did not request this ride, please contact support immediately.
              </p>

              <p style="margin:12px 0 0;">
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
            { message: "pick up otp sent" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "pick up otp error" },
            { status: 500 }
        )
    }
}