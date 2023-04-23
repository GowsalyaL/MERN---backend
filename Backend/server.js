const express = require('express')
const dotenv = require ('dotenv').config()
const colors = require('colors')
const errorHandler = require('../Backend/MiddleWare/errorMiddleware')
const port = process.env.PORT || 5000;
const connectDb = require('./Config-Mongo/db')
const cors = require('cors')


connectDb()
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended : false}));



app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)



app.listen(port, ()=>{
    console.log(`server started on port: ${port}`)
})
