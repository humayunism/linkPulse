const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');

// রেজিস্ট্রেশন রুট: POST /api/auth/register
router.post('/register', register);

module.exports = router;