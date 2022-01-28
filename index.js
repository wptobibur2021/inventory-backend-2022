const mongoose = require('mongoose');
const express = require('express')
require('dotenv').config()
const app = express()
const multer  = require('multer')
const cors = require('cors')
const path = require("path");
const productRoute = require('./Routers/products')
const categoryRoute = require('./Routers/category')
const brandRoute = require('./Routers/brand')
const cartRoute = require('./Routers/cart')
const employeeRoute = require('./Routers/employee')
const customerRoute = require('./Routers/customer')
const stockRoute = require('./Routers/stock')
const orderRoute = require('./Routers/order')
const damageRoute = require('./Routers/damage')
const returnRoute = require('./Routers/return')
const userRoute = require('./Routers/user')

/**
 *  ======================
 *      MIDDLEWARE
 *  ======================
 */
app.use(cors())
app.use(express.json())
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use('/api/products', productRoute)
app.use('/api/category', categoryRoute)
app.use('/api/brand', brandRoute)
app.use('/api/cart', cartRoute)
app.use('/api/employee', employeeRoute)
app.use('/api/customer', customerRoute)
app.use('/api/stock', stockRoute)
app.use('/api/order', orderRoute)
app.use('/api/damage', damageRoute)
app.use('/api/return', returnRoute)
app.use('/api/user', userRoute)



// FILE STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets/images/products");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File Upload successfully");
    } catch (error) {
        console.error(error);
    }
});




// Backend Server Start Port
const port = process.env.PORT || 5080

/*
* ===================
*   Database Connection
* ===================
*/
const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@techbd71.5ewxj.mongodb.net/stockManagement?retryWrites=true&w=majority`
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log('DB Ok'))
    .catch(err => console.log(err))

// mongoose.connect(process.env.DB_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//         })
//     .then(() => console.log("Database connected!"))
//     .catch(err => console.log(err));


// Root Get API
app.get('/', async (req, res)=>{
    await res.send('Backend Server ok')
})
app.listen(port, () =>{
    console.log(`'Backend Server Start at http://localhost:${port}`)
})
