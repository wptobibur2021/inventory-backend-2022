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

router.get('/sales', async (req, res) => {
    try {
        const employeeId = req.query.employeeId
        const query = {
            employeeId: employeeId,
            status: 1
        }
        let result = []
        if(employeeId !== undefined){
            result = await Order.find(query).populate(['customerId', 'employeeId'])
        }else{
            result = await Order.find({status: 1}).populate(['customerId', 'employeeId'])
        }
        await res.status(200).json(result)
    }catch (err) {
        await res.status(500).json(err);
    }
})

// Single Order Get
router.get('/single/:id', async (req,res)=>{
    try{
        const id = req.params.id
        const order = await Order.findById(id).populate(['customerId', 'employeeId'])
        await res.status(200).json(order)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
// Income Monthly
// router.get('/income', async (req, res) => {
//
//     // let today = new Date().setHours(0, 0, 0, 0);
//     // const first = today.getDate();
//     // console.log('Today: ', today)
//     // console.log('First: ', first)
//     // const first = today.getDate() - today.getDay();
//     // const firstDayWeek = new Date(today.setDate(first));
//     // const lastDayWeek = new Date(today.setDate(first + 6));
//     // const firstDayMonth = new Date(today.setDate(1));
//     // const lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
//     // lastDayWeek.setHours(23, 59, 59, 0);
//     // lastDayMonth.setHours(23, 59, 59, 0);
//     // today = new Date().setHours(0, 0, 0, 0);
//     //
//     // const income = Order.aggregate([{
//     //     $group: {
//     //         "_id": "",
//     //         "today": {
//     //             $push: {
//     //                 $cond: {
//     //                     if: {
//     //                         $gte: ["$createdAt", new Date(today)]
//     //                     },
//     //                     then: "$$ROOT",
//     //                     else: ''
//     //                 }
//     //             }
//     //         },
//     //         "week": {
//     //             $push: {
//     //                 $cond: [{
//     //                     $and: [{
//     //                         $gte: ["$createdAt", new Date(firstDayWeek)]
//     //                     },
//     //                         {
//     //                             $lte: ["$createdAt", new Date(lastDayWeek)]
//     //                         }
//     //                     ]
//     //                 },
//     //                     "$$ROOT",
//     //                     ''
//     //                 ]
//     //             }
//     //         },
//     //         "month": {
//     //             $push: {
//     //                 $cond: [{
//     //                     $and: [{
//     //                         $gte: ["$createdAt", new Date(firstDayMonth)]
//     //                     },
//     //                         {
//     //                             $lte: ["$createdAt", new Date(lastDayMonth)]
//     //                         }
//     //                     ]
//     //                 },
//     //                     "$$ROOT",
//     //                     ''
//     //                 ]
//     //             }
//     //         }
//     //     }
//     // }])
//
//    // console.log('Income', income)
//
//         // .forEach(function (data) {
//         //     data.today = data.today.filter(e => e != "")
//         //     data.week = data.week.filter(e => e != "")
//         //     console.log('Data: ', data);
//         // })
//
//
//
//     const date = new Date();
//     const lastMonth = new Date(date.setMonth(date.getMonth()-1))
//     const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))
//     try{
//         const income = await Order.aggregate([
//             {$match: {createdAt: {$gte: previousMonth}}},
//             {
//                 $project:{
//                     month: {$month: "$createdAt"},
//                     sales: "$totalPrice"
//                 },
//             },
//             {
//                 $group:{
//                     _id: "$month",
//                     total: {$sum: "$sales"}
//                 },
//             }
//         ])
//         console.log('Income: ', income)
//         await res.status(200).json(income)
//     }catch(e){
//         await res.status(500).json(e.message)
//     }
// })


router.get("/income", async (req, res) => {
    const dateNow = new Date();
    const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));
    console.log('Last month: ' + lastMonth)
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    console.log('Previous month: ', previousMonth)
    const monthlyIncome = Order.aggregate(
        [
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
                    count: {
                        $sum: 1
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
                    count: 1,
                }
            }
        ],
    )
    await res.status(200).json(monthlyIncome)
    console.log('Monthly Income: ', monthlyIncome)
})



// router.get("/income", async (req, res) => {
//     const date = new Date();
//     const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//     const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
//
//     try {
//         const income = await Order.aggregate([
//             { $match: { createdAt: { $gte: previousMonth } } },
//             {
//                 $project: {
//                     month: { $month: "$createdAt" },
//                     sales: "$totalPrice",
//                 },
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: { $sum: "$sales" },
//                 },
//             },
//         ]);
//         console.log('Income: ', income)
//         await res.status(200).json(income);
//
//     } catch (err) {
//        await res.status(500).json(err);
//     }
// });


// Update Order By ID
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




        // const result = await Order.findOne(query).then(item=>{
        //     const updateCart = item.carts.map((item)=>item._id).indexOf(cartId)
        //     console.log('updateCart', updateCart)
        //     item.carts[updateCart].damagePro = damagePro
        //     item.carts[updateCart].returnPro = returnPro
        //     item.save();
        //     console.log('Item', item)
        // })
        // Person.findOne(personQuery).then(item => {
        //     const audioIndex = item.items.map(item => item.id).indexOf(itemID);
        //     item.items[audioIndex].name = 'Name value';
        //     item.save();
        // });
        //const result = await Order.findOne()
        // const updateDoc = {
        //     damage: damagePro,
        //     return: returnPro
        // }
        // const orderUpdate = findOrder.carts.filter((cart)=>cart._id === cartId)
        //
        // console.log('Order Update: ', orderUpdate[0])
        // const doc = {
        //     orderUpdate: updateDoc
        // }
        // const result = await Order.findByIdAndUpdate(orderId, { $set:
        //         {status: 1, doc}
        // })
        // const orderUpdate = findOrder.carts.findByIdAndUpdate(cartId,{
        //     updateDoc
        // })

       // console.log('Update Cart: ', orderUpdate)
       // console.log('Update Doc: ', updateDoc)
        //const result = await orderUpdate.updateOne(updateDoc)
        await res.status(200).json(result)
        //console.log('Result: ', result)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
module.exports = router


