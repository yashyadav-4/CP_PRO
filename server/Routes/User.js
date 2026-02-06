const express = require('express');
const { handleUserSignup, handleUserLogin,handleVerifyAuth } = require('../Controllers/User')
const router = express.Router();

router.post('/login', handleUserLogin);

router.post('/signup', handleUserSignup);
router.get('/verify' , handleVerifyAuth);

module.exports = router;