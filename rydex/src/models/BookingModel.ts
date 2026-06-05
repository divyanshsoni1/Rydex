import mongoose, { Document, Model } from "mongoose";
import { IUser } from "./User";
import { IVehicle } from "./vehicle.model";

export type BookingStatus = "idle" | "requested" | "awaiting_payment" | "confirmed" | "started" | "completed" | "cancelled" | "rejected" | "expired";

export type PaymentStatus = "pending" | "paid" | "cash" | "failed";

export interface IBooking extends Document {
    _id:mongoose.Types.ObjectId,
    user: mongoose.Types.ObjectId | IUser,
    driver: mongoose.Types.ObjectId | IUser,
    vehicle: mongoose.Types.ObjectId | IVehicle,

    pickUpAddress: string,
    dropAddress: string,

    pickUpLocation: {
        type: "point",
        coordinates: [number, number]
    },
    dropLocation: {
        type: "point",
        coordinates: [number, number]
    },

    fare: number,
    userMobileNumber: string,
    driverMobileNumber: string,

    bookingStatus: BookingStatus,
    paymentStatus: PaymentStatus,
    paymentDeadline : Date,

    adminCommission: number,
    partnerAmount: number,

    pickUpOtp: string,
    pickUpOtpExpire: Date | undefined,
    dropOtp: string,
    dropOtpExpire: Date | undefined,

    createdAt?: Date,
    updatedAt?: Date
}

const BookingModelSchema = new mongoose.Schema<IBooking>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    },
    pickUpAddress: {
        type: String,
        required: true
    },
    dropAddress: {
        type: String,
        required: true
    },
    pickUpLocation: {
        type: {
            type: String,
            enum: ["Point"]
        },
        coordinates: [Number]
    },
    dropLocation: {
        type: {
            type: String,
            enum: ["Point"]
        },
        coordinates: [Number]
    },
    fare: {
        type: Number,
        required: true
    },
    userMobileNumber: {
        type: String,
        required: true
    },
    driverMobileNumber: {
        type: String,
        required: true
    },
    bookingStatus: {
        type: String,
        enum: ["idle", "requested", "awaiting_payment", "confirmed", "started", "completed", "cancelled", "rejected", "expired"],
        default: "idle"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "cash", "failed"],
        default: "pending"
    },
    paymentDeadline:{
        type:Date
    },
    adminCommission: {
        type: Number,
        default: 0
    },
    partnerAmount: {
        type: Number,
        default: 0
    },
    pickUpOtp: {
        type: String
    },
    dropOtp: {
        type: String
    },
    pickUpOtpExpire: {
        type: Date
    },
    dropOtpExpire: {
        type: Date
    }
}, { timestamps: true });

const BookingModel: Model<IBooking> = mongoose.models.BookingModel || mongoose.model<IBooking>("BookingModel", BookingModelSchema);

export default BookingModel;