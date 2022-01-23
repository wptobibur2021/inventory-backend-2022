/**
 * ===================
 * PRODUCT ROUTER DECLARATION BELOW
 * ===================
 */
const router = require('express').Router()
const Products = require('../Models/Products')
const Brand = require('../Models/Brand')
const Cats = require('../Models/Category')

/*
*================
*   GET API DECLARATION BELOW
* ===============
*/
router.get('/all', async (rqe,res)=>{
    try{
        const products = await Products.find().populate(['catId','brandId'])
        await res.status(200).json(products)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})


/*
*================
*   POST API DECLARATION BELOW
* ===============
*/
router.post('/create', async (req,res)=>{
    const newProduct = new Products(req.body)
    console.log("New :", newProduct)
    try{
        const saveProduct = await newProduct.save()
        await res.status(200).json(saveProduct)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})

/*
*================
*   POST API DECLARATION BELOW
* ===============
*/
router.delete('/delete/:id', async(req,res)=>{
    const id = req.params.id
    try{
        const productDelete = await Products.findById(id)
        await productDelete.deleteOne()
        await res.status(200).json('Product Delete Has Been Successfully')
    }catch (e) {
        await res.status(500).json(e.message)
    }
})




module.exports = router