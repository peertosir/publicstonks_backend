const Project = require('../models/Project');
const ErrorResponse = require('../shared/errors/errorResponse');

//@desc     Get all projects
//@route    GET /api/v1/projects
//@access   Private
exports.getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find();
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        })
    } catch (error) {
        return next(error);
    }
}

//@desc     Get single project
//@route    GET /api/v1/projects/:id
//@access   Private
exports.getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return next(new ErrorResponse(`Project with id ${req.params.id} not found`, 404));
        }
        res.status(200).json({
            success: true,
            data: project
        })
    } catch (error) {
        return next(error);
    }
}

//@desc     Create new project
//@route    POST /api/v1/projects
//@access   Private
exports.createProject = async (req, res, next) => {
    try {
        const newProject = await Project.create(req.body);
        res.status(201).json({
            success: true,
            data: newProject
        })
    } catch (error) {
        return next(error);
    }
}

//@desc     Update project
//@route    PUT /api/v1/projects/:id
//@access   Private
exports.updateProject = async (req, res, next) => {
    try {
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
    } catch (error) {
        return next(error);
    }
}

//@desc     Delete project
//@route    DELETE /api/v1/projects/:id
//@access   Private
exports.deleteProject = async (req, res, next) => {
    try {
        const projectToDelete = await Project.findByIdAndDelete(req.params.id);

        if (!projectToDelete) {
            return next(new ErrorResponse(`Project with id ${req.params.id} not found`, 404));
        }

        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        return next(error);
    }
}