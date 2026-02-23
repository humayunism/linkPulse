const express = require('express');
const router = express.Router();
const { createLink, getLinks } = require('../controllers/linkController');
const { protect } = require('../middleware/authMiddleware');

// সব লিঙ্ক রুটকে প্রোটেক্টেড রাখতে চাইলে এভাবে লেখা যায়:
router.use(protect);

// GET রিকোয়েস্টের জন্য রুট
router.get('/', getLinks);

// নতুন লিঙ্ক তৈরি করার রুট
router.post('/', createLink);

module.exports = router;