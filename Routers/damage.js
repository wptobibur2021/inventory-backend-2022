/**
 * ===================
 * DAMAGE ROUTER DECLARATION BELOW
 * ===================
 */

const router = require('express').Router()
const Damage = require('../Models/Damage')
const Order = require("../Models/Order");

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

// Damage Get
router.get('/all', async (req,res)=>{
    try{
        const result = await Damage.find().populate('productId')
        await res.status(200).json(result)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
/* Damage Monthly Report */
router.get('/damageMonthly', async(req,res)=>{
    try{
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
        const damage = await Damage.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $group: {
                    _id: {
                        month: {
                            $month: "$createdAt"
                        },
                        year: {
                            $year: "$createdAt"
                        },

                    },
                    total: {
                        $sum: "$totalPrice"
                    }
                }
            },
            {
                $project: {
                    _id: {
                        $concat: [
                            {
                                $arrayElemAt: [
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
                                    ],
                                    "$_id.month"
                                ]
                            },
                            "-",
                            {
                                $toString: "$_id.year"
                            }
                        ]
                    },
                    total:1,
                }
            }
        ]);
        await res.status(200).json(damage)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
module.exports = router