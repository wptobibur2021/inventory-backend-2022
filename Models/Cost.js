/**
 * =====================
 *  COST MODELS DECLARATION BELOW
 * ====================
 */
const mongoose = require('mongoose')
const CostSchema = new mongoose.Schema({
    costTitle: {
        type: String,
        required: true
    },
    costTaka: {
        type: Number,
        required: true
    },
    costDate:{
        type: Date,
        required: true
    },
}, {timestamps: true})
module.exports = mongoose.model('Cost', CostSchema)
