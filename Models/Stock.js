/**
 * =====================
 *  STOCK MODELS DECLARATION BELOW
 * ====================
 */
const mongoose = require('mongoose')
const StockSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    salesPrice:{
        type: Number,
        required: true
    },
    buyPrice:{
        type: Number,
        required: true
    },
    productQty:{
        type: Number,
        required: true
    },
    brandName:{
        type: String,
        required: true
    },
    catName:{
      type: String,
      required: true
    },
},{timestamps: true})
module.exports = mongoose.model('Stock', StockSchema)