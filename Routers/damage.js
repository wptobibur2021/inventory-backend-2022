/**
 * ===================
 * DAMAGE ROUTER DECLARATION BELOW
 * ===================
 */

const router = require('express').Router()
const Damage = require('../Models/Damage')

// Damage Create
router.post('/create', async (req,res)=>{
    try{
        const newDamage = new Damage(req.body)
        const saveDamage = await newDamage.save()
        await res.status(200).json(saveDamage)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})

module.exports = router