/**
 * ===================
 * RETURN ROUTER DECLARATION BELOW
 * ===================
 */

const router = require('express').Router()
const Return = require('../Models/Return')

// Damage Create
router.post('/create', async (req,res)=>{
    try{
        const newReturn = new Return(req.body)
        const saveReturn = await newReturn.save()
        await res.status(200).json(saveReturn)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})

module.exports = router