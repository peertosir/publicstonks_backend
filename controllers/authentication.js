const bodyParser = require('body-parser')
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const bcrypt = require('bcryptjs');

exports.register = asyncHandler(async (req, res, next) => {
    const {password, firstName, lastName, email} = req.body
    console.log(req.body)
    console.log(password)

    const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
    },
     (err, user) => {
         //addcode
        if (err && err.name == "MongoError" && err.keyValue.email) return res.status(409).send('Email exists')
        if (err) return res.status(500).send('Some problems with registration')

        const userId = user._id
        res.status(200).send({success:true,userId: userId})
    })
})

exports.login = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})
        if (!user) return res.status(404).send({"success":false, "message":'No user found.'})

       const passwordIsValid = await bcrypt.compareSync(req.body.password, user.password)
        if (!passwordIsValid) return res.status(401).send({success:false})

        res.status(200).send({success:true})
})