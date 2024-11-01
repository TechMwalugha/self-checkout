import mongoose from "mongoose";

const checkOutSchema = new mongoose.Schema({
    apiRef: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    items: [
        {
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            quantity: {
                type: String,
                required: true,
            },
            frequency: {
                type: Number,
                required: true,
            },
        }
    ],
    paymentUrl: {
        type: String,
    },
    state: {
        type: String,
    },
    failedReason: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    updatedAt: {
        type: Date,
        default: () => new Date()
    }
});

checkOutSchema.pre('save', function (next) {
    this.updatedAt = Date.now() as any;
    next();
});

const CheckOut = mongoose.models.CheckOut || mongoose.model('CheckOut', checkOutSchema);

export default CheckOut;
