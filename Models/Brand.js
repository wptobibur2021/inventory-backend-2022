/**
 * =====================
 *  PRODUCTS MODELS DECLARATION BELOW
 * ====================
 */
const mongoose = require('mongoose')
const BrandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true
    }
},{timestamps: true})
module.exports = mongoose.model('Brand', BrandSchema)