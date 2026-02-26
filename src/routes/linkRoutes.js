const express = require('express');
const router = express.Router();
const { createLink, getLinks, getLink, updateLink, deleteLink, trackClick } = require('../controllers/linkController');
const { protect } = require('../middleware/authMiddleware');

// সব লিঙ্ক রুটকে প্রোটেক্টেড রাখতে চাইলে এভাবে লেখা যায়:
router.use(protect);

// GET রিকোয়েস্টের জন্য রুট
router.get('/', getLinks);

// নতুন লিঙ্ক তৈরি করার রুট
router.post('/', createLink);

// একটি নির্দিষ্ট লিঙ্ক পেতে
router.get('/:id', getLink);

// লিঙ্ক আপডেট করতে
router.put('/:id', updateLink);

// লিঙ্ক ডিলিট করতে
router.delete('/:id', deleteLink);

// লিঙ্ক ক্লিক ট্র্যাক করতে (এটা প্রোটেক্টেড নয়)
router.get('/:id/click', protect, trackClick);

module.exports = router;