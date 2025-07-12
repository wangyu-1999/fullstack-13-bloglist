import { Router } from 'express';

import {
  createReadingList,
  readReadingList,
} from '../controllers/reading-lists.controller.js';
import tokenExtractor from '../middleware/token-extractor.js';

const router = Router();

router.post('/', createReadingList);
router.put('/:id', tokenExtractor, readReadingList);

export default router;
