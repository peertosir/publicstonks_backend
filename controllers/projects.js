const Project = require('../models/Project');

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
        res.status(400).json({
            success: false
        })
    }
}

//@desc     Get single project
//@route    GET /api/v1/projects/:id
//@access   Private
exports.getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            res.status(404).json({
                success: false,
                message: "Not found"
            })
        }
        res.status(200).json({
            success: true,
            data: project
        })
    } catch (error) {
        res.status(400).json({
            success: false
        })
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
        res.status(400).json({
            success: false,
            error: error.message
        })
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
            res.status(404).json({
                success: false,
                message: "Not found"
            })
        }

        res.status(200).json({
            success: true,
            data: projectToUpdate
        })
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }
}

//@desc     Delete project
//@route    DELETE /api/v1/projects/:id
//@access   Private
exports.deleteProject = async (req, res, next) => {
    try {
        const projectToDelete = await Project.findByIdAndDelete(req.params.id);

        if (!projectToDelete) {
            res.status(404).json({
                success: false,
                message: "Not found"
            })
        }

        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }
}