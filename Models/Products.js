/**
 * =====================
 *  PRODUCTS MODELS DECLARATION BELOW
 * ====================
 */
const mongoose = require('mongoose')
const ProductsSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    categoryName: {
        type: String,
        ref: 'Category'
    },
    brandName: {
        type: String,
        ref: 'Brand'
    },
    img:{
        type: String,
        required: false
    },
    productSerialNo:{
        type: String,
        required: true
    }
}, {timestamps:true})
module.exports = mongoose.model('Products', ProductsSchema)