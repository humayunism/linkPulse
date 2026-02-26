require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// রুট ফাইলগুলো ইমপোর্ট করা
const authRoutes = require('./routes/authRoutes');

const app = express();

// ডাটাবেস কানেক্ট করা
connectDB();

// মিডলওয়্যার (খুবই গুরুত্বপূর্ণ, এটা ছাড়া বডি থেকে ডাটা পড়া যাবে না)
app.use(express.json());

// Routes ইমপোর্ট করো
const linkRoutes = require('./routes/linkRoutes');

// রুটগুলো মাউন্ট (Mount) করা
app.use('/api/auth', authRoutes);
app.use('/api/links', linkRoutes);

app.get('/', (req, res) => {
  res.send('LinkPulse Server with MongoDB is running! 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});