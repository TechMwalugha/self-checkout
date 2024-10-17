import mongoose from 'mongoose'


const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    itemId: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    quantity: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    updatedAt: {
        type: Date,
        default: () => new Date()
    }
})

itemSchema.pre('save', function(next) {
    this.updatedAt = Date.now() as any
    next()
})

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema)

export default Item