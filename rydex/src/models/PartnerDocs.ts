import mongoose, { Document, Model } from "mongoose";

type statusType = 'approved' | 'pending' | 'rejected';

export interface IPartnerDocs extends Document {
    owner: mongoose.Types.ObjectId,
    aadharUrl: string,
    rcUrl: string,
    licenseUrl: string,
    status: statusType,
    rejectionReason?: string,
    createdAt?: Date,
    updatedAt?: Date
}

const PartnerDocsSchema = new mongoose.Schema<IPartnerDocs>({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    aadharUrl: {
        type: String,
    },
    rcUrl: {
        type: String,
    },
    licenseUrl: {
        type: String,
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

}, { timestamps: true });


const PartnerDocs: Model<IPartnerDocs> =
    mongoose.models.PartnerDocs || mongoose.model<IPartnerDocs>("PartnerDocs", PartnerDocsSchema);

export default PartnerDocs;