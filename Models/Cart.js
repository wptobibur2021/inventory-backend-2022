/**
 * =====================
 *  CART MODELS DECLARATION BELOW
 * ====================
 */
const mongoose = require('mongoose')
const CartSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    qty: {
        type: Number,
        required: true
    },
    salesPrice: {
        type: Number,
        required: true
    },
    damagePro:{
        type: Number,
        default: 0
    },
    salesPro:{
        type: Number,
        default: 0
    },
    returnPro:{
        type: Number,
        default: 0
    },
    totalPrice:{
        type: Number,
        required: true
    },
}, {timestamps: true})
module.exports = mongoose.model('Cart', CartSchema)
