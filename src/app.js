// ১. এনভায়রনমেন্ট ভ্যারিয়েবল লোড করা
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const app = express();

// ২. ডাটাবেস কানেক্ট করা
connectDB();

// ৩. মিডলওয়্যার
app.use(express.json());

// ৪. রুট/পাথ সেট করা
app.get('/', (req, res) => {
  res.send('LinkPulse Server with MongoDB is running! 🚀');
});

// ৫. সার্ভার পোর্ট সেটআপ
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});