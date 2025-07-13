import jwt from 'jsonwebtoken';

import { User, Session } from '../models/index.js';
import config from '../utils/config.js';
export const login = async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });

  if (!user || config.USER_PASSWORD !== req.body.password) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  if (user.disabled) {
    return res.status(403).json({ error: 'User account is disabled' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    config.JWT_SIGN_SECRET
  );

  await Session.create({ userId: user.id, token });

  res.status(200).json({ token, username: user.username, name: user.name });
};

export const logout = async (req, res) => {
  await Session.destroy({ where: { token: req.token } });
  res.status(204).end();
};
