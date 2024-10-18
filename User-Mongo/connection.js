const mongoose=require('mongoose')
require('dotenv').config()

const url=process.env.DB_URL

const db_url=mongoose.createConnection(url)

module.exports=db_url;