/**
 * ===================
 * STOCK ROUTER DECLARATION BELOW
 * ===================
 */
const router = require('express').Router()
const Stock = require('../Models/Stock')
// ID No Find
const objectId = require('mongodb').ObjectId
/**
* ===============
*   STOCK API DECLARATION BELOW
* ===============
*/
// Cart Add
router.post('/create', async (req,res)=>{

    try{
        const id = req.body.productId
        const query = {productId: objectId(id)}
        console.log('Query: ', query)
        const findId = await Stock.findOne(query)
        console.log("Find Id: ", findId)
        let saveStock
        if(findId){
            saveStock = await Stock.updateOne({
                $set: req.body,
            })
        }else{
            const newStock = new Stock(req.body)
            saveStock = await newStock.save()
        }
        await res.status(200).json(saveStock)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
// Get All Stock Item
router.get('/all', async (req,res)=>{
    try{
        const stocks = await Stock.find().populate('productId')
        await res.status(200).json(stocks)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
// Update Stock Qty
router.put('/update/:id', async (req,res)=>{
    try{
        const id = req.params.id
        const updateData= await Stock.findByIdAndUpdate(id,{
            $set: req.body
        })
        await res.status(200).json(updateData)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})

// Update Return
router.put('/return/update/:id', async (req, res)=>{
    try{
        const productId = req.params.id
        const qty = req.body.productQty
        const result = await Stock.updateOne(
            {productId},
            { $inc: { productQty: qty } }
        )
        await res.status(200).json(result)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})

// Delete Stock
router.delete('/delete/:id', async (req, res) => {
    try {
        const productId = req.params.id
        console.log('Product Id:',productId)
        const result = await Stock.deleteOne({productId: productId})
        await res.status(200).json(result)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})

module.exports = router