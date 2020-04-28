//@desc     Get all projects
//@route    GET /api/v1/projects
//@access   Private
exports.getProjects = (req, res, next) => {
    res.send({
        success: true,
        method: "get all"
    });
}

//@desc     Get single project
//@route    GET /api/v1/projects/:id
//@access   Private
exports.getProject = (req, res, next) => {
    res.send({
        success: true,
        method: `get id ${req.params.id}`
    });
}

//@desc     Create new project
//@route    POST /api/v1/projects
//@access   Private
exports.createProject = (req, res, next) => {
    res.send({
        success: true,
        method: `post`
    });
}

//@desc     Update project
//@route    PUT /api/v1/projects/:id
//@access   Private
exports.updateProject = (req, res, next) => {
    res.send({
        success: true,
        method: `put id ${req.params.id}`
    });
}

//@desc     Delete project
//@route    DELETE /api/v1/projects/:id
//@access   Private
exports.deleteProject = (req, res, next) => {
    res.send({
        success: true,
        method: `delete id ${req.params.id}`
    });
}