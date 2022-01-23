/**
 * =====================
 *  EMPLOYEE MODELS DECLARATION BELOW
 * ====================
 */

const mongoose = require('mongoose')
const EmployeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    nid:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true,
    },
    mobileNo:{
        type: Number,
        required: true
    }

},{timestamps: true})
module.exports = mongoose.model('Employee', EmployeeSchema)