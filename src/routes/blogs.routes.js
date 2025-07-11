import { Router } from 'express';

import {
  getAllBlogs,
  createBlog,
  getBlogById,
  changeBlogLikes,
  deleteBlog,
} from '../controllers/blogs.controller.js';
import tokenExtractor from '../middleware/token-extractor.js';

const router = Router();

router.get('/', getAllBlogs);
router.post('/', tokenExtractor, createBlog);
router.get('/:id', getBlogById);
router.put('/:id', changeBlogLikes);
router.delete('/:id', tokenExtractor, deleteBlog);

export default router;
