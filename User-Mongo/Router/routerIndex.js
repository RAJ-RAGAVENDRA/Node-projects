const express=require('express');
const route=express.Router();
const controlIndex=require('../Controller/controller');
const { validatetoken } = require('../middleware');


route.post('/user',controlIndex.post);
route.get('/user',controlIndex.get);
route.get('/user/:id',controlIndex.getByID)
route.put('/update/:id', controlIndex.put)
route.delete('/delete/:id',controlIndex.delete)
route.get('/getByName/:userName',controlIndex.getbyName)
route.post('/login',controlIndex.login)
route.post('/signup',controlIndex.signup)
route.get('/auth',validatetoken,controlIndex.auth)

module.exports=route;
