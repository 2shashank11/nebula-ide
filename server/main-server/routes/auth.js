const express = require('express');

const {
    handleUserLogin,
    handleUserSignup,
    handleUserLogout,
} = require('../controllers/auth');

const router = express.Router();

router.post('/login', handleUserLogin);
router.post('/signup', handleUserSignup);
router.post('/logout', handleUserLogout);
//forgot password and reset password under auth route


module.exports = router;

