import { Router } from 'express';

import {
  getBlogs,
  createBlog,
  getBlogById,
  changeBlogLikes,
  deleteBlog,
} from '../controllers/blogs.controller.js';
import sessionValidator from '../middleware/session-validator.js';

const router = Router();

router.get('/', getBlogs);
router.post('/', sessionValidator, createBlog);
router.get('/:id', getBlogById);
router.put('/:id', changeBlogLikes);
router.delete('/:id', sessionValidator, deleteBlog);

export default router;
