const express = require('express')
const auth = require("./auth");
const user = require("./user");
const doctor = require("./doctor");
const appointment = require("./appointment");

const router = express.Router()
router.use('/auth', auth)
router.use('/user', user)
router.use('/doctor', doctor)
router.use('/appointment', appointment)
module.exports = router