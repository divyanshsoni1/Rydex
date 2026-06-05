import mongoose, { Schema, Document, Model } from "mongoose";

type videoKycStatus = "not_required" | "pending" | "in_progress" | "approved" | "rejected";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    image?: string;
    role: "user" | "partner" | "admin";
    isEmailVerified?: boolean;
    otp?: string;
    otpExpiresAt?: Date;
    partnerOnboardingSteps: number;
    mobileNumber?: string;
    partnerStatus: "pending" | "approved" | "rejected";
    rejectionReason?: string;
    videoKycStatus?: videoKycStatus;
    videoKycRoomId?: string;
    videoKycRejectionReason?: string;
    socketId: string | null;
    location?: {
        type: "Point",
        coordinates: [number, number]
    };
    isOnline: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
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
                enum: ["Point"],

            },
            coordinates: {
                type: [Number], // [lng, lat]
            },
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

const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;