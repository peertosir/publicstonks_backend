const User = require('../models/User');
const ErrorResponse = require('../shared/errors/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const allUsersResponse = require('../models/response_models/users/allUsersResponse');
const singleUserResponse = require('../models/response_models/users/singleUserResponse');

//@desc     Get all projects
//@route    GET /api/v1/projects
//@access   Private
exports.getUsers = asyncHandler(async (req, res, next) => {

    //Copy req params
    const reqQuery = {
        ...req.query
    }

    //Remove pagination from query
    let removeQuery = ['limit', 'page'];
    removeQuery.forEach(item => delete reqQuery[item]);

    //Prepare pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit || 0;

    //Adapt query params for list to mongoDB standart mechanism
    const finalQuery = JSON.stringify(reqQuery).replace(/\b(in)\b/g, match => `$${match}`);

    //Execute final query to mongoDB
    const users = await User.find(JSON.parse(finalQuery))
        .skip(offset)
        .limit(limit)
        .select(allUsersResponse);

    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    })
});

exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).select(singleUserResponse);
    if (!user) {
        return next(new ErrorResponse(`User with id ${req.params.id} not found`, 404));
    }
    res.status(200).json({
        success: true,
        data: user
    })
});

exports.updateUser = asyncHandler(async (req, res, next) => {
    const userToUpdate = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!userToUpdate) {
        return next(new ErrorResponse(`User with id ${req.params.id} not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: userToUpdate
    })
});


exports.banUser = asyncHandler(async (req, res, next) => {
    const userToBan = await User.findByIdAndUpdate(req.params.id, {
        banned: true
    });

    if (!userToBan) {
        return next(new ErrorResponse(`User with id ${req.params.id} not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: {
            message: "User banned"
        }
    })
});