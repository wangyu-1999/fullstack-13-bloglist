import { Router } from 'express';

import {
  createReadingList,
  readReadingList,
} from '../controllers/reading-lists.controller.js';
import sessionValidator from '../middleware/session-validator.js';

const router = Router();

router.post('/', sessionValidator, createReadingList);
router.put('/:id', sessionValidator, readReadingList);

export default router;
