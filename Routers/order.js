/**
 * ===================
 * STOCK ROUTER DECLARATION BELOW
 * ===================
 */
const router = require('express').Router()
const Order = require('../Models/Order')

/**
 * ===============
 *   STOCK API DECLARATION BELOW
 * ===============
 */
// Cart Add
router.post('/create', async (req,res)=>{
    const newOrder = new Order(req.body)
    try{
        const saveOrder = await newOrder.save()
        await res.status(200).json(saveOrder)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
/* Gel all order */
router.get('/all', async (req,res)=>{
    try{
        const employeeId = req.query.employeeId
        const query = {employeeId: employeeId}
        let result = []
        if(employeeId !== undefined){
            result = await Order.find(query).populate(['customerId', 'employeeId'])
        }else{
            result = await Order.find().populate(['customerId', 'employeeId'])
        }
        await res.status(200).json(result)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
/* Total sales function declaration below */
router.get('/totalSales', async (req,res)=>{
    try{
        const result = await Order.find()
        await res.status(200).json(result)
    }catch(e){
        await res.status(500).json(e.message)
    }
})
/* Sales function declaration below */
router.get('/sales', async (req, res) => {
    try {
        const employeeId = req.query.employeeId
        const pageNo = parseInt(req.query.page || '0')
        const pageSize = 50
        //console.log('Total Sales: ', total)
        const query = {
            employeeId: employeeId,
            status: 1
        }
        let result = []
        const totalPage = await Order.countDocuments({status: 1})
        if(employeeId !== undefined){
            result = await Order.find(query).limit(pageSize).skip(pageSize * pageNo).populate(['customerId', 'employeeId'])
        }else{
            result = await Order.find({status: 1}).limit(pageSize).skip(pageSize * pageNo).populate(['customerId', 'employeeId'])
        }
        await res.status(200).json({
            result,
            totalPage: Math.ceil(totalPage / pageSize)
        })
    }catch (err) {
        await res.status(500).json(err);
    }
})
/* Single Order Get */
router.get('/single/:id', async (req,res)=>{
    try{
        const id = req.params.id
        const order = await Order.findById(id).populate(['customerId', 'employeeId'])
        await res.status(200).json(order)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
/* Monthly Income report Function */
router.get("/monthlyIncome", async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
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
        await res.status(200).json(income);
    } catch (err) {
       await res.status(500).json(err);
    }
});

/* Update Order By ID */
router.put('/update/:id', async (req,res)=>{
    try{
        const orderId = req.params.id
        const cartId = req.body.cartId
        const returnPro = req.body.returnPro
        const damagePro = req.body.damagePro
        const salesPro = req.body.salesPro
        const cartPrice = req.body.cartPrice
        const totalPrice = req.body.totalPrice
        const result = await Order.updateOne(
            {_id: orderId, "carts._id": cartId},
            {
                status: 1,
                totalPrice: totalPrice,
                $set:{
                    "carts.$.damagePro": damagePro,
                    "carts.$.returnPro": returnPro,
                    "carts.$.salesPro": salesPro,
                    "carts.$.totalPrice": cartPrice,
                }
            }
        )
        await res.status(200).json(result)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
module.exports = router


