/**
 * ===================
 * CATEGORY ROUTER DECLARATION BELOW
 * ===================
 */

const router = require('express').Router()
const Brand = require('../Models/Brand')

/*
*================
*   GET API DECLARATION BELOW
* ===============
*/



/*
*================
*   POST API DECLARATION BELOW
* ===============
*/
router.post('/create', async (req,res)=>{
    const newCat = new Brand(req.body)
    console.log('New Cat: ', newCat)
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
        const brand = await Brand.find()
        await res.status(200).json(brand)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})

// Delete API
router.delete('/delete/:id', async (req,res)=>{
    try{
        const id = req.params.id
        console.log('Brand Id: ', id)
        const brandDelete = await Brand.findById(id)
        await brandDelete.deleteOne()
        await res.status(200).json('Category Delete Has Been Successfully')
    }catch (e) {
        await res.status(500).json(e.message)
    }
})

module.exports = router