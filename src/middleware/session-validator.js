import jwt from 'jsonwebtoken';

import { User, Session } from '../models/index.js';
import config from '../utils/config.js';

const sessionValidator = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    req.token = token;
    const session = await Session.findOne({ where: { token } });
    if (!session) {
      return res.status(401).json({ error: 'Invalid session' });
    }
    const user = await User.findByPk(session.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    if (user.disabled) {
      await session.destroy();
      return res.status(403).json({ error: 'User account is disabled' });
    }
    try {
      const decodedToken = jwt.verify(token, config.JWT_SIGN_SECRET);
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

export default sessionValidator;
