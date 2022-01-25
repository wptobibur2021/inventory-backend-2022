/**
 * =====================
 *  CART MODELS DECLARATION BELOW
 * ====================
 */
const mongoose = require('mongoose')
const UsersSchema = new mongoose.Schema({
    fullName: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true,
        minLength: 8
    },
    nidNo: {
        type: Number,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    userRole: {
        type: Number,
        required: true
    }
}, {timestamps: true})
module.exports = mongoose.model('Users', UsersSchema)
