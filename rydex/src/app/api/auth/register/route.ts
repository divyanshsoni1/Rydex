import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import { sendEmail } from "@/lib/sendMail";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    await connectDB();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    let user = await User.findOne({ email });

    if (user && user.isEmailVerified) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 409 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (user && !user.isEmailVerified) {
      user.name = name,
        user.email = email,
        user.password = hashedPassword,
        user.otp = otp,
        user.otpExpiresAt = otpExpiresAt,
        user.isEmailVerified = true
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpiresAt
      });
    }

    await sendEmail(
      email, "🔐 Your Rydex OTP Code - Verify Email & Ride Safely 🚖",
      `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rydex OTP Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f4f7fb;
      font-family: Arial, Helvetica, sans-serif;
    }

    .wrapper {
      width: 100%;
      table-layout: fixed;
      background: #f4f7fb;
      padding: 30px 0;
    }

    .main {
      max-width: 620px;
      width: 100%;
      margin: auto;
      background: #ffffff;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    }

    .header {
      background: linear-gradient(135deg, #111827, #1e3a8a);
      color: white;
      text-align: center;
      padding: 35px 25px;
    }

    .header h1 {
      margin: 0;
      font-size: 30px;
      letter-spacing: 1px;
    }

    .header p {
      margin-top: 10px;
      opacity: 0.9;
      font-size: 15px;
    }

    .content {
      padding: 40px 30px;
      text-align: center;
      color: #374151;
    }

    .content h2 {
      margin-top: 0;
      font-size: 28px;
      color: #111827;
    }

    .quote-box {
      margin: 20px 0;
      padding: 16px;
      background: #f9fafb;
      border-left: 4px solid #2563eb;
      border-radius: 10px;
      font-style: italic;
      color: #4b5563;
      line-height: 1.7;
    }

    .otp-container {
      background: #eff6ff;
      border: 2px dashed #2563eb;
      border-radius: 14px;
      padding: 22px;
      margin: 30px auto;
      width: 85%;
    }

    .otp-number {
      margin: 0;
      font-size: 42px;
      font-weight: 800;
      letter-spacing: 10px;
      color: #2563eb;
    }

    .security-note {
      margin-top: 20px;
      font-size: 14px;
      color: #6b7280;
      line-height: 1.8;
    }

    .ride-line {
      margin-top: 25px;
      font-size: 16px;
      color: #1f2937;
      font-weight: 600;
    }

    .footer {
      background: #f9fafb;
      padding: 25px;
      text-align: center;
      font-size: 13px;
      color: #6b7280;
      line-height: 1.8;
    }
  </style>
</head>
<body>
  <center class="wrapper">
    <table class="main" width="100%">
      <tr>
        <td class="header">
          <h1>🚖 RYDEX</h1>
          <p>Safe Rides • Verified Partners • Trusted Journeys 🛡️</p>
        </td>
      </tr>

      <tr>
        <td class="content">
          <h2>🔐 OTP Verification Code</h2>

          <p>
            Welcome to <strong>Rydex</strong> 💙<br/>
            Your next safe and seamless ride is just one quick verification away.
          </p>

          <div class="quote-box">
            ✨ “Every journey begins with trust, and every trust begins with verification.”<br/>
            🚘 Let’s get you moving safely.
          </div>

          <div class="otp-container">
            <h1 class="otp-number">${otp}</h1>
          </div>

          <p class="security-note">
            ⏳ This OTP is valid for <strong>5 minutes</strong> only.<br/>
            🔒 For your safety, never share this code with anyone — not even a Rydex driver or support executive.
          </p>

          <p class="ride-line">
            🌍 Your destination matters. Your safety matters more.
          </p>
        </td>
      </tr>

      <tr>
        <td class="footer">
          🚖 You received this email because a verification request was made on Rydex.<br/>
          If this wasn’t you, please ignore this email safely.<br/><br/>
          © ${new Date().getFullYear()} Rydex — Trust engineered into every ride 💙
        </td>
      </tr>
    </table>
  </center>
</body>
</html>
`)

    return NextResponse.json(
      {
        user,
        success: true,
        message: "User registered successfully",
      },
      { status: 201 }
    );


  } catch (error) {
    console.error("Register Error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}