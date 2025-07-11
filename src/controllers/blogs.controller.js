import { Blog, User } from '../models/index.js';

export const getAllBlogs = async (_req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
  });
  // console.log(JSON.stringify(blogs, null, 2));
  res.json(blogs);
};

export const createBlog = async (req, res) => {
  const user = await User.findOne({ where: { id: req.decodedToken.id } });
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }
  const newBlog = await Blog.create({ ...req.body, userId: user.id });
  res.status(201).json(newBlog);
};

export const getBlogById = async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  // console.log(blog.toJSON());
  res.json(blog);
};

export const changeBlogLikes = async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  blog.likes = req.body.likes;
  await blog.save();
  res.json(blog);
};

export const deleteBlog = async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  await blog.destroy();
  res.status(204).end();
};
