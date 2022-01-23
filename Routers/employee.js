/**
 * ===================
 * EMPLOYEE ROUTER DECLARATION BELOW
 * ===================
 */
const router = require('express').Router()
const Employee = require('../Models/Employee')

/**
* ================
*   EMPLOYEE API DECLARATION BELOW
* ===============
*/

// Create API
router.post('/create', async (req,res)=>{
    const newEmployee = new Employee(req.body)
    console.log('New Employee: ', newEmployee)
    try{
        const saveEmployee = await newEmployee.save()
        await res.status(200).json(saveEmployee)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
router.get('/all', async (req,res)=>{
    try{
        const employee = await Employee.find()
        await res.status(200).json(employee)
    }catch (e) {
        await res.status(500).json(e.message)
    }
})
module.exports = router
