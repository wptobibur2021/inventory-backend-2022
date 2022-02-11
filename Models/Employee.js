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
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true,
    },
    mobileNo:{
        type: String,
        required: true
    }

},{timestamps: true})
module.exports = mongoose.model('Employee', EmployeeSchema)