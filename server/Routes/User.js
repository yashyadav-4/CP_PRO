const express = require('express');
const { handleUserSignup, handleUserLogin, handleVerifyAuth, handleLogOut, handlePasswordChange, handleGoogleAuth, handleHeartbeat } = require('../Controllers/User')
const { verifyToken } = require('../Middlewares/auth');

const router = express.Router();

router.post('/login', handleUserLogin);
router.post('/signup', handleUserSignup);
router.post('/google', handleGoogleAuth);
router.get('/verify' , handleVerifyAuth);
router.post('/logout' , handleLogOut);

router.post('/change-password', handlePasswordChange);

//pings browser tab every 60 seconds
router.post('/heartbeat', verifyToken, handleHeartbeat);

module.exports = router;