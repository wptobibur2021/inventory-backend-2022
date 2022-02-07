/**
 * =====================
 *  DAMAGE MODELS DECLARATION BELOW
 * ====================
 */

const mongoose = require('mongoose')
const DamageSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    salesPrice: {
        type: Number,
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    comment:{
        type: String,
        default: null
    },

}, {timestamps: true})
module.exports = mongoose.model('Damage', DamageSchema)