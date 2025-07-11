import { Router } from 'express';

import { getAuthorGropStatistics } from '../controllers/blogs.controller.js';

const router = Router();

router.get('/', getAuthorGropStatistics);

export default router;
