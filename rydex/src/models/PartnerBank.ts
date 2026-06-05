import mongoose, { Document, Model } from "mongoose";

type statusType = 'not_added' | 'added' | 'verified';

export interface IPartnerBank extends Document {
    owner: mongoose.Types.ObjectId,
    accountHolder: string,
    accountNumber: string,
    ifsc: string,
    upi?: string,
    status: statusType,
    createdAt?: Date,
    updatedAt?: Date
}

const PartnerBankSchema = new mongoose.Schema<IPartnerBank>({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    accountHolder: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    ifsc: {
        type: String,
        required: true,
        uppercase: true
    },
    upi: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['not_added', 'added', 'verified'],
        default: 'not_added'
    }
}, { timestamps: true });


const PartnerBank: Model<IPartnerBank> =
    mongoose.models.PartnerBank || mongoose.model<IPartnerBank>("PartnerBank", PartnerBankSchema);

export default PartnerBank;