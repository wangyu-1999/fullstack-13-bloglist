import { Router } from 'express';

import {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} from '../controllers/blogs.controller.js';

const router = Router();

router.get('/blogs', getAllBlogs);
router.post('/blogs', createBlog);
router.get('/blogs/:id', getBlogById);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);

export default router;
