const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController'); // login যোগ করো

router.post('/register', register);
router.post('/login', login); // নতুন লগইন রুট

module.exports = router;