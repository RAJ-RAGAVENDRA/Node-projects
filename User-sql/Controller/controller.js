const express = require('express')
const db = require('../connection');
const bcrypt = require('bcrypt');
const {
    error
} = require('console');
const {
    json
} = require('stream/consumers');
require('dotenv').config();


module.exports.insert = async (req, res) => {
    const {
        id,
        username,
        email,
        password,
        active,
        address
    } = req.body

    const query = 'INSERT INTO users(id,username,email,password,active,address)VALUES (?,?,?,?,?,?)'

    const hashedpassword = await bcrypt.hash(password, 5)

    db.query(query, [id, username, email, hashedpassword, active, address], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        res.status(200).json({
            message: 'user created succesfully'
        })
    })
};

//-------------------------------------------------------------------------------------

module.exports.read = async (req, res) => {
    const query = 'SELECT * FROM users WHERE active=TRUE'
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            })
        } else {
            res.status(200).json(result)
        }
    })
};

//---------------------------------------------------------------------------------------

module.exports.getById = async (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM users WHERE id=? AND active=TRUE'
    db.query(query, id, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            })
        }
        if (result.length === 0) {
            return res.status(404).json({
                message: 'user not found'
            });
        } else {
            res.status(200).json(result)
        }
    })
};

//-----------------------------------------------------------------------------

module.exports.getByName = async (req, res) => {
    const name = req.params.name
    const query = 'SELECT * FROM users WHERE username=? AND active=TRUE'
    db.query(query, name, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            })
        }
        if (result.length == 0) {
            return res.status(404).json({
                message: 'User not found'
            })
        } else {
            return res.status(200).json(result);
        }
    });
};

//----------------------------------------------------------------------------

module.exports.update = async (req, res) => {
    const id = req.params.id
    const {
        username,
        address
    } = req.body

    const query = 'UPDATE users SET username=?,address=? WHERE id=?';

    db.query(query,[id,username,address], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            })
        }
        if (result.affectedRows == 0) {
            return res.status(404).json({
                message: "User not found"
            })
        } else {
            return res.status(200).json({
                message: "User Updated.."
            })
        }
    });
};

//------------------------------------------------------------------------------

module.exports.delete = async (req, res) => {
    const id = req.params.id

    const query = 'UPDATE users SET active=FALSE WHERE id=?'

    db.query(query, id, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            })
        }
        if (result.affectedRows == 0) {
            return res.status(404).json({
                message: 'User not Found'
            })
        } else {
            return res.status(200).json({
                message: "user Deleted.."
            })
        }
    })
};