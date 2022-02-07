/**
 * ===================
 * COST ROUTER DECLARATION BELOW
 * ===================
 */
const router = require('express').Router()
const Cost = require('../Models/Cost')

router.post('/create', async (req,res)=>{
    try{
        const newCost = new Cost(req.body)
        const saveCost  = await newCost.save();
        await res.status(200).json(saveCost)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})

router.get('/all', async (req,res)=>{
    try{
        const pageNo = parseInt(req.query.page || '0')
        const pageSize = 10
        const totalPage = await Cost.countDocuments({})
        const result = await Cost.find().limit(pageSize).skip(pageNo * pageSize);
        await res.status(200).json(
            {
                totalPage: Math.ceil(totalPage / pageSize),
                result
            }
        )
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
module.exports = router