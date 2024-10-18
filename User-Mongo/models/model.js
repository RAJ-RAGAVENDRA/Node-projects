const mongoose=require('mongoose')
const user_url=require('../connection')

const userSchema = new mongoose.Schema({
    userName:String,
    age:Number,
    num:Number,
    mailID:String,
    password:String,
    active:{
        type:Boolean,
        default:true
    }

})
const User = user_url.model('user', userSchema);

 module.exports=User
