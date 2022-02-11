/**
 * ===================
 * COST ROUTER DECLARATION BELOW
 * ===================
 */
const router = require('express').Router()
const Cost = require('../Models/Cost')

/* Cost create function declaration below */
router.post('/create', async (req,res)=>{
    try{
        const newCost = new Cost(req.body)
        const saveCost  = await newCost.save();
        await res.status(200).json(saveCost)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})

/* Cost get function declaration below */
router.get('/all', async (req,res)=>{
    try{
        const pageNo = parseInt(req.query.page || '0')
        const pageSize = 5
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
/* Cost Total Report */
router.get('/report', async (req,res)=>{
    try{
        const result = await Cost.find()
        await res.status(200).json(result)
    }catch(e){
        await res.status(500).json(e.message)
    }
})
/* Monthly Cost */
router.get('/monthlyCost', async (req,res)=>{
    try{
        const date = new Date()
        const lastMonth = new Date(date.setMonth(date.getMonth()-1))
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))
        const cost = await Cost.aggregate([
            {$match:{createdAt: {$gte: previousMonth}}},
            {
                $group:{
                    _id: {
                        month: {
                            $month: "$createdAt"
                        },
                        year: {
                            $year: "$createdAt"
                        }
                    },
                    total:{
                        $sum: "$costTaka"
                    }
                }
            },
            {
                $project:{
                    _id:{
                        $concat: [
                            {
                                $arrayElemAt:[
                                    [
                                        "",
                                        "January",
                                        "February",
                                        "March",
                                        "April",
                                        "May",
                                        "June",
                                        "July",
                                        "August",
                                        "September",
                                        "October",
                                        "November",
                                        "December"
                                    ], "$_id.month"
                                ]
                            }, "-",
                            {
                                $toString: "$_id.year"
                            }
                        ]
                    },
                    total:1,
                }
            }
        ])
        await res.status(200).json(cost)
    }catch(e){

    }
})
module.exports = router