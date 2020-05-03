const router = require('express').Router()
const bodyParser = require('body-parser')
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/config.json');

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
        if (err) return res.status(500).send(err)

        const token = jwt.sign({id:user._id}, config.secret, {
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

    res.status(200).send(decoded)
    })
})

module.exports = router