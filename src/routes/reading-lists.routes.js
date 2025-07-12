import { Router } from 'express';

import { createReadingList } from '../controllers/reading-lists.controller.js';

const router = Router();

router.post('/', createReadingList);

export default router;
