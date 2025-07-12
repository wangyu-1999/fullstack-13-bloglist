import { NotFoundError } from '../custom-errors/index.js';
import { User, Blog } from '../models/index.js';

export const getAllUsers = async (_req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
    ],
  });
  res.json(users);
};

export const getUserByUsername = async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (!user) throw new NotFoundError('User not found');
  res.json(user);
};

export const createUser = async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
};

export const changeUserName = async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (!user) throw new NotFoundError('User not found');
  user.username = req.body.username || user.username;
  await user.save();
  res.json(user);
};
