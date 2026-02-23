const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  let token;

  // টোকেন বের করা (Authorization header থেকে)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // টোকেন না পেলে এরর দেওয়া
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }

  try {
    // টোকেন ভেরিফাই করা
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};
