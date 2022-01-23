/**
 * ===================
 * CATEGORY ROUTER DECLARATION BELOW
 * ===================
 */

const router = require('express').Router()
const Category = require('../Models/Category')

/*
*================
*   CATEGORY API DECLARATION BELOW
* ===============
*/
// Create API
router.post('/create', async (req,res)=>{
    const newCat = new Category(req.body)
    try{
        const saveCat = await newCat.save()
        await res.status(200).json(saveCat)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
// Get API
router.get('/all', async (req,res)=>{
    try{
        const cats = await Category.find()
        await res.status(200).json(cats)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
// Delete API
router.delete('/delete/:id', async (req,res)=>{
    const id = req.params.id
    try{
        const categoryDelete = await Category.findById(id)
        await categoryDelete.deleteOne()
        await res.status(200).json('Category Delete Has Been Successfully')
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
module.exports = router