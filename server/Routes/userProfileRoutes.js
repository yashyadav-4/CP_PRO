const express = require('express');
const router = express.Router();

const { optionalAuth } = require('../Middlewares/auth');
const { getUserPublicProfile } = require('../Controllers/publicProfileController');

router.get('/:username/profile', optionalAuth, getUserPublicProfile);

module.exports = router;
