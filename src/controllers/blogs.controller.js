import Blog from '../models/Blog.js';
import logger from '../utils/logger.js';

export const getAllBlogs = async (_req, res) => {
  try {
    const blogs = await Blog.findAll();
    // console.log(JSON.stringify(blogs, null, 2));
    res.json(blogs);
  } catch (error) {
    logger.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json(newBlog);
  } catch (error) {
    logger.error('Error creating blog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    // console.log(blog.toJSON());
    res.json(blog);
  } catch (error) {
    logger.error('Error fetching blog by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    const updatedBlog = await blog.update(req.body);
    res.json(updatedBlog);
  } catch (error) {
    logger.error('Error updating blog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    await blog.destroy();
    res.status(204).end();
  } catch (error) {
    logger.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
