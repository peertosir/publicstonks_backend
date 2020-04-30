const Project = require('../models/Project');
const ErrorResponse = require('../shared/errors/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

//@desc     Get all projects
//@route    GET /api/v1/projects
//@access   Private
exports.getProjects = asyncHandler(async (req, res, next) => {
    const projects = await Project.find();
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
    const project = await Project.findById(req.params.id);
    if (!project) {
        return next(new ErrorResponse(`Project with id ${req.params.id} not found`, 404));
    }
    res.status(200).json({
        success: true,
        data: project
    })
})

//@desc     Create new project
//@route    POST /api/v1/projects
//@access   Private
exports.createProject = asyncHandler(async (req, res, next) => {
    const newProject = await Project.create(req.body);
    res.status(201).json({
        success: true,
        data: newProject
    })
})

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
})

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
})