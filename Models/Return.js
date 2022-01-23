/**
 * =====================
 *  RETURN MODELS DECLARATION BELOW
 * ====================
 */

const mongoose = require('mongoose')
const ReturnSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    quantity: {
        type: Number,
        required: true
    },
    price:{
      type: Number,
      required: true
    },

}, {timestamps: true})
module.exports = mongoose.model('Return', ReturnSchema)