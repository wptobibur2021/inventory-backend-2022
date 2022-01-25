/**
 * ===================
 * USER ROUTER DECLARATION BELOW
 * ===================
 */

import {BulkOperationBase as User} from "mongodb/mongodb.ts34";

const router = require('express').Router()
const Users = require('../Models/Users')
const bcrypt = require('bcrypt')

// User Registration
router.post('registration', async (req, res) => {
    try{
        // Password Generate
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = await new Users({
            fullName: req.body.fullName,
            password: hashedPassword,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            userRole: 1
        })
        const user = await newUser.save()
        await  res.status(200).json(user)

    }catch(e){
        await res.status(500).json(e.message)
    }
})

// User Login
router.post('/login', async (req,res)=>{
    const email = req.body.email
    try{
        const user = await Users.findOne({ email: email})
        !user && await res.status(400).json('User not found')
        const validPassword = await bcrypt.compare(req.body.password,user.password)
        !validPassword && await res.status(400).json('Wrong password')
        await res.status(200).json(user)
    }catch(e){
        await res.status(500).json(e.message)
    }

})


module.exports = router