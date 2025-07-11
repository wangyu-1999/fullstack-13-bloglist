import { Router } from 'express';

import {
  getAllBlogs,
  createBlog,
  getBlogById,
  changeBlogLikes,
  deleteBlog,
} from '../controllers/blogs.controller.js';

const router = Router();

router.get('/', getAllBlogs);
router.post('/', createBlog);
router.get('/:id', getBlogById);
router.put('/:id', changeBlogLikes);
router.delete('/:id', deleteBlog);

export default router;
