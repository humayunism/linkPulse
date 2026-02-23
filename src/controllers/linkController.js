const Link = require('../models/Link');

// @desc    Create a new link
// @route   POST /api/links
// @access  Private
exports.createLink = async (req, res) => {
  try {
    const { title, url, category } = req.body;

    // ডাটা ভ্যালিডেট করা
    if (!title || !url) {
      return res.status(400).json({
        success: false,
        error: 'Please provide title and URL'
      });
    }

    // লিঙ্ক তৈরি করা এবং ইউজার ID যুক্ত করা
    const link = await Link.create({
      title,
      url,
      category: category || 'Other',
      user: req.user.id // authMiddleware থেকে পাওয়া
    });

    res.status(201).json({
      success: true,
      data: link
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all links for a user
// @route   GET /api/links
// @access  Private
exports.getLinks = async (req, res) => {
  try {
    const links = await Link.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: links.length,
      data: links
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single link
// @route   GET /api/links/:id
// @access  Private
exports.getLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({
        success: false,
        error: 'Link not found'
      });
    }

    // চেক করা যে এই লিঙ্কটা অথেন্টিকেটেড ইউজারের কিনা
    if (link.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this link'
      });
    }

    res.status(200).json({
      success: true,
      data: link
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update link
// @route   PUT /api/links/:id
// @access  Private
exports.updateLink = async (req, res) => {
  try {
    let link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({
        success: false,
        error: 'Link not found'
      });
    }

    // চেক করা যে এই লিঙ্কটা অথেন্টিকেটেড ইউজারের কিনা
    if (link.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this link'
      });
    }

    // আপডেট করা
    link = await Link.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: link
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete link
// @route   DELETE /api/links/:id
// @access  Private
exports.deleteLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({
        success: false,
        error: 'Link not found'
      });
    }

    // চেক করা যে এই লিঙ্কটা অথেন্টিকেটেড ইউজারের কিনা
    if (link.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this link'
      });
    }

    await Link.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Track link clicks
// @route   GET /api/links/:id/click
// @access  Public
exports.trackClick = async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(
      req.params.id,
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!link) {
      return res.status(404).json({
        success: false,
        error: 'Link not found'
      });
    }

    // রিডাইরেক্ট করা লিঙ্কের দিকে
    res.status(200).json({
      success: true,
      data: link
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all user links
// @route   GET /api/links
// @access  Private
exports.getLinks = async (req, res) => {
  try {
    // শুধুমাত্র এই ইউজারের লিঙ্কগুলো খুঁজে বের করবে
    const links = await Link.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: links.length,
      data: links
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
