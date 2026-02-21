const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title for your link'],
    trim: true,
  },
  url: {
    type: String,
    required: [true, 'Please add the actual URL'],
  },
  category: {
    type: String,
    enum: ['Social', 'Portfolio', 'Work', 'Other'], // নির্দিষ্ট ক্যাটাগরি
    default: 'Other',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // আমাদের User মডেলের সাথে কানেক্ট করা হলো
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Link', LinkSchema);