const Project = require('../models/Project');
const ErrorResponse = require('../shared/errors/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const allProjectsResponse = require('../models/response_models/projects/allProjectsResponse');
const singleProjectResponse = require('../models/response_models/projects/singleProjectResponse');

//@desc     Get all projects
//@route    GET /api/v1/projects
//@access   Private
exports.getProjects = asyncHandler(async (req, res, next) => {

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
    const projects = await Project.find(JSON.parse(finalQuery))
        .skip(offset)
        .limit(limit)
        .select(allProjectsResponse);

    res.status(200).json({
        success: true,
        count: projects.length,
        data: projects
    })
});

//@desc     Get single project
//@route    GET /api/v1/projects/:id
//@access   Private
exports.getProject = asyncHandler(async (req, res, next) => {
    const project = await Project.findById(req.params.id).select(singleProjectResponse);
    if (!project) {
        return next(new ErrorResponse(`Project with id ${req.params.id} not found`, 404));
    }
    res.status(200).json({
        success: true,
        data: project
    })
});

//@desc     Create new project
//@route    POST /api/v1/projects
//@access   Private
exports.createProject = asyncHandler(async (req, res, next) => {
    const newProject = await Project.create(req.body);
    res.status(201).json({
        success: true,
        data: newProject
    })
});

//@desc     Update project
//@route    PUT /api/v1/projects/:id
//@access   Private
exports.updateProject = asyncHandler(async (req, res, next) => {
    const projectToUpdate = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!projectToUpdate) {
        return next(new ErrorResponse(`Project with id ${req.params.id} not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: projectToUpdate
    })
});

//@desc     Delete project
//@route    DELETE /api/v1/projects/:id
//@access   Private
exports.deleteProject = asyncHandler(async (req, res, next) => {
    const projectToDelete = await Project.findByIdAndDelete(req.params.id);

    if (!projectToDelete) {
        return next(new ErrorResponse(`Project with id ${req.params.id} not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: {}
    })
});