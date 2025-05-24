const express = require('express');
const app = express();

require('dotenv').config();
require('./db.js');

const authRouter = require('./routes/authRouter.js')
const userRouter = require('./routes/userRouter.js')
const adminProductRouter = require('./routes/adminProductRouter.js')
const catogriesRouter = require('./routes/categoryRouter.js')
const orderRouter = require('./routes/orderRouter.js')
const adminOrderRouter = require('./routes/adminOrderRouter.js')

app.get('/', (req, res) => {
    res.send('Welcome to our website')
})
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/admin/products', adminProductRouter)
app.use('/catogries', catogriesRouter)
app.use('/orders', orderRouter)
app.use('/admin/orders', adminOrderRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})