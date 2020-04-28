const router = require('express').Router();
const {
    getProject,
    getProjects,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projects');

router.route('/')
    .get(getProjects)
    .post(createProject);

router.route('/:id')
    .get(getProject)
    .put(updateProject)
    .delete(deleteProject);

module.exports = router;