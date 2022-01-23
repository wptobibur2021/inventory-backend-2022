/**
 * =====================
 *  PRODUCTS MODELS DECLARATION BELOW
 * ====================
 */
const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
    ordersNo:{
      type: String,
      required: true
    },
    status:{
      type: Number,
      default: 0
    },
    carts:{
      type: Array,
    },
    employeeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    customerId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer'
    },
    totalPrice:{
        type: Number,
        required: true
    },

},{timestamps: true})
module.exports = mongoose.model('Order', OrderSchema)