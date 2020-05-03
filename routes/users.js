const router = require('express').Router();
const {
    getUsers,
    getUser,
    updateUser,
    banUser
} = require('../controllers/users');

router.route('/').get(getUsers);

router.route('/:id').get(getUser).put(updateUser);

router.route('/:id/ban').put(banUser);

module.exports = router;