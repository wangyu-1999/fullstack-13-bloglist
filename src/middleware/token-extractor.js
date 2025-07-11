import jwt from 'jsonwebtoken';

import config from '../utils/config.js';
const tokenExtractor = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, config.SECRET);
      req.decodedToken = decodedToken;
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    return res
      .status(401)
      .json({ error: 'Authorization header missing or malformed' });
  }
  next();
};

export default tokenExtractor;
