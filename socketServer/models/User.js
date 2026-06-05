import mongoose, { Schema, Document, Model } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "partner", "admin"]
        },
        image: {
            type: String,
            default: "",
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        partnerStatus: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        rejectionReason: {
            type: String,
            required: false
        },
        otp: {
            type: String
        },
        otpExpiresAt: {
            type: Date
        },
        partnerOnboardingSteps: {
            type: Number,
            min: 0,
            max: 8,
            default: 0
        },
        mobileNumber: {
            type: String
        },
        videoKycStatus: {
            type: String,
            enum: ["not_required", "pending", "in_progress", "approved", "rejected"],
            default: "not_required"
        },
        videoKycRoomId: {
            type: String
        },
        videoKycRejectionReason: {
            type: String
        },
        socketId: {
            type: String,
            default: null
        },
        location: {
            type: {
                type: String,
                enum: ["Point"]
            },
            coordinates: [Number]
        },
        isOnline: {
            type: Boolean,
            default: false,
            index: true
        }
    },
    {
        timestamps: true,
    }
);

UserSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", UserSchema);

export default User;