import { Op } from 'sequelize';

import { NotFoundError } from '../custom-errors/index.js';
import { Blog, User } from '../models/index.js';

export const getBlogs = async (req, res) => {
  let where = {};
  if (req.query.search) {
    where = {
      [Op.or]: {
        title: {
          [Op.iLike]: `%${req.query.search}%`,
        },
        author: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
    };
  }
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
  });
  // console.log(JSON.stringify(blogs, null, 2));
  res.json(blogs);
};

export const createBlog = async (req, res) => {
  const user = await User.findOne({ where: { id: req.decodedToken.id } });
  if (!user) throw new NotFoundError('User not found');
  const newBlog = await Blog.create({ ...req.body, userId: user.id });
  res.status(201).json(newBlog);
};

export const getBlogById = async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) throw new NotFoundError('Blog not found');
  // console.log(blog.toJSON());
  res.json(blog);
};

export const changeBlogLikes = async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) throw new NotFoundError('Blog not found');
  blog.likes = req.body.likes;
  await blog.save();
  res.json(blog);
};

export const deleteBlog = async (req, res) => {
  const user = await User.findOne({ where: { id: req.decodedToken.id } });
  if (!user) throw new NotFoundError('User not found');
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) throw new NotFoundError('Blog not found');
  if (blog.userId !== user.id) {
    return res
      .status(403)
      .json({ error: 'You do not have permission to delete this blog' });
  }
  await blog.destroy();
  res.status(204).end();
};
