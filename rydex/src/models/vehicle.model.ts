import mongoose, { Document, Model } from "mongoose";

export type vehicleType = 'bike' | 'car' | 'truck' | 'loading' | 'auto';

export type statusType = 'approved' | 'pending' | 'rejected';

export interface IVehicle extends Document {
    owner: mongoose.Types.ObjectId,
    type: vehicleType,
    vehicleModel: string,
    number: string,
    imageUrl?: string | null,
    baseFare?: number,
    pricePerKm?: number,
    waitingCharge?: number,
    status: statusType,
    rejectionReason?: string,
    isActive: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

const VehicleSchema = new mongoose.Schema<IVehicle>({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ['bike', 'car', 'truck', 'loading', 'auto'],
        required: true
    },
    number: {
        type: String,
        required: true,
        unique: true
    },
    vehicleModel: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    baseFare: {
        type: Number,
        required: true,
        min:0
    },
    pricePerKm: {
        type: Number,
        required: true,
        min:0
    },
    waitingCharge: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        enum: ['approved', 'pending', 'rejected'],
        default: 'pending'
    },
    rejectionReason: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


const Vehicle: Model<IVehicle> =
    mongoose.models.Vehicle || mongoose.model<IVehicle>("Vehicle", VehicleSchema);

export default Vehicle;