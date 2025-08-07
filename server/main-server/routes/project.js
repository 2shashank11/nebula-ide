const express = require('express');

const {
    createNewProject,
    getEnvironments,
    getAllProjects,
    updateProjectDetails,
    deleteProject,
    
} = require('../controllers/project');

const router = express.Router();

router.get('/environments', getEnvironments)
router.get('/get-all-projects', getAllProjects)
router.post('/create', createNewProject);
router.patch('/update', updateProjectDetails)
router.delete('/delete/:projectId', deleteProject)

module.exports = router;