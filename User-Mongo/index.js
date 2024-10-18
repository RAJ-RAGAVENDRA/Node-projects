const express=require('express')
const mongoose=require('mongoose')
const router=require('./Router/routerIndex')
const bcrypt=require('bcryptjs')
require('dotenv').config();


const app=express()
app.use(express.json())
app.use(router)

const port=process.env.APP_PORT

app.listen(port,()=>{
    console.log('Server is running..')
})