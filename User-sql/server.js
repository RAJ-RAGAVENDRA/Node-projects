const express= require('express')
const sql=require('mysql2')
const router=require('./Router/routerIndex')
require('dotenv').config()
const db=require('./connection')
const app=express()

app.use(express.json())


db.connect((err)=>{
    if(err){
        console.log('Error in Connection to MySql:',err)
    }
    else{
        console.log('Connecting to MySql')
    }
})

app.use(router)

const port=process.env.APP_PORT;

app.listen(port,()=>{
    console.log("Server is running at Port:6000");
})