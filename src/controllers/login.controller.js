import jwt from 'jsonwebtoken';

import { User } from '../models/index.js';
import config from '../utils/config.js';
export const login = async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });

  if (!user || config.SECRET !== req.body.password) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    config.SECRET
  );
  res.status(200).json({ token, username: user.username, name: user.name });
};
