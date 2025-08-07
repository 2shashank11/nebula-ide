const express = require('express');

const {
    handleGetUserInfo,
    handleUserUpdate,
} = require('../controllers/user.js');

const router = express.Router();

router.get('/info', handleGetUserInfo)
router.patch('update', handleUserUpdate)

module.exports = router;