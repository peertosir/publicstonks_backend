const router = require('express').Router()
const bodyParser = require('body-parser')
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config.json');

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json())

router.post('/register', function(req,res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8)

    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    },
    function (err, user) {
        if (err) return res.status(500).send('There was a problem registering the user.')

        const token = jwt.sign({id:user._id}, config.secret, {
            expiresIn: 86400
        })
        res.status(200).send({auth:true,token:token})
    })
})

router.post("/login", function (req, res) {
    User.findOne({email: req.body.email}, function (err,user) {
        if (err) return res.status(500).send('Error on the server.')
        if (!user) return res.status(404).send('No user found.')

       const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
        if (!passwordIsValid) return res.status(401).send({auth:false,token:null})

        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400
        })

        res.status(200).send({auth:true,token:token})
    })
})

router.get('/me', function (req,res) {
    const token = req.headers['x-access-token']
    if (!token) return res.status(401).send({auth:false, message:'No token provided'})

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({auth:false, message: 'Failed to authenticate token'})

    User.findById(decoded.id, {password: 0}, function(err,user){
        if (err) return res.status(500).send('There was a problem finding the user')
        if (!user) return res.status(404).send("No user found.")
 
        res.status(200).send(user)
    })
    })
})

router.get('/logout', function(req,res) {
    res.status(200).send({auth:false, token:null})
})

module.exports = router