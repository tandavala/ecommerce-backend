const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/authenticate')


router.get('/', (req, res, next) => {
    res.send("User Router management")
})

module.exports = router