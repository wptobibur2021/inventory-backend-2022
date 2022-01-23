/**
 * ===================
 * CART ROUTER DECLARATION BELOW
 * ===================
 */
const router = require('express').Router()
const Cart = require('../Models/Cart')
/*
*================
*   CART API DECLARATION BELOW
* ===============
*/
// Cart Add
router.post('/create', async (req,res)=>{
    const newCart = new Cart(req.body)
    try{
        const saveCart = await newCart.save()
        await res.status(200).json(saveCart)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})

// Cart Get

router.get('/all', async (req,res)=>{
    try{
        const carts = await Cart.find().populate('productId')
        await res.status(200).json(carts)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})

// Delete
router.delete('/delete', async (req,res)=>{
    try{
        const deleteCart = await Cart.deleteMany({})
        console.log('Delete: ', deleteCart)
        await res.status(200).json(deleteCart)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
module.exports = router