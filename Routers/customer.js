/**
 * ===================
 * CUSTOMER ROUTER DECLARATION BELOW
 * ===================
 */
const router = require('express').Router()
const Customer = require('../Models/Customer')

/**
 * ================
 *   CUSTOMER API DECLARATION BELOW
 * ===============
 */

// Create API
router.post('/create', async (req,res)=>{
    const newCustomer = new Customer(req.body)
    console.log('New Customer: ', newCustomer)
    try{
        const saveCustomer = await newCustomer.save()
        await res.status(200).json(saveCustomer)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
router.get('/all', async (req,res)=>{
    try{
        const customers = await Customer.find()
        await res.status(200).json(customers)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
module.exports = router
