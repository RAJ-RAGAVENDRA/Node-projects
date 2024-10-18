const express=require('express')
const route=express.Router()
const controller=require('../Controller/controller')

route.post('/insert',controller.insert);
route.get('/read',controller.read);
route.get('/getByID/:id',controller.getById);
route.get('/getByName/:name',controller.getByName);
route.put('/update/:id',controller.update);
route.delete('/delete/:id',controller.delete);

module.exports=route