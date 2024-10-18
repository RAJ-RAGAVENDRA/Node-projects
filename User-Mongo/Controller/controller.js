const User = require('../models/model');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')
//---------------POST--------------------------------
module.exports.post = async (req, res) => {
    const user = new User(req.body)
    await user.save()
    return res.json({
        message: 'Successfully Data Saved...'
    })
}

//---------------GET---------------------------------
module.exports.get = async (req, res) => {
    const user = await User.find({
        active: true
    });
    return res.send(user)
}

//---------------GETBYID-----------------------------
module.exports.getByID = async (req, res) => {
    const user = await User.findById(req.params.id);

    res.status(200).send(user);
}
//---------------PUT---------------------------------
module.exports.put = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!user) {
        return res.status(404).send('No users found with this ID');
    }
    res.status(200).send(user)
}
//---------------DELETE------------------------------------
module.exports.delete = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).send('No Data Found');
    }
    user.active = false
    await user.save()
    res.status(200).send('Deleted successfully...')
}
//---------------GETBYNAME-------------------------------
module.exports.getbyName = async (req, res) => {
    const name = req.params.userName;
    const user = await User.find({
        userName: name
    })
    return res.send(user);
}
//--------------LOGIN-------------------------------------
module.exports.login = async (req, res) => {
    const {
        mailID,
        password
    } = req.body
    const user = await User.findOne({
        mailID: req.body.mailID
    })
    if (user != null) {
        const isValid = bcrypt.compare(password, user.password)
        if (isValid) {
            const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
            return res.json({
                name: user.userName,
                message: 'Authentication successful',
                token: token

            })
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid username or password',
            });
        }

    } else {
        res.json({
            message: "User not found"
        })
    }

};
//--------------SIGNUP-----------------------------------
module.exports.signup = async (req, res) => {
    const mail = await User.findOne({
        mailID: req.body.mailID
    });

    if (mail != null) {
        return res.send('MailID Already Exists..')
    } else {
        // module.exports.post(req.body);
        const { mailID, password} = req.body

        const hashPassword = await bcrypt.hash(password, 7)

        const user = new User({
            userName:req.body.userName,
            mailID:mailID,
            password: hashPassword // This is now a string
        })

        await user.save()
        return res.send("signup Successfully")
    }
}
//-----------------------Auth--------------
module.exports.auth = async (req, res) => {
    const user = await User.find({
        userName: req.user.userName
    })

    return res.json({
        message: 'Authentication verified',
        success: true,
        user: user,
    });
}