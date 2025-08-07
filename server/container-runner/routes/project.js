const express = require('express');

const { 
    initializeNewProject,
    openExistingProject,
    getProjectFileTree,
    getFilecontent,
    
} = require('../controllers/project');

const router = express.Router();

router.post('/init', initializeNewProject)
router.post('/open/:projectId', openExistingProject);
router.get('/files/:projectId', getProjectFileTree);
router.post('/files/:projectId/path', getFilecontent)

module.exports = router;