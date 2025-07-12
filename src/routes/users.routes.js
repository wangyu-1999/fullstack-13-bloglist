import { Router } from 'express';

import {
  getAllUsers,
  getUser,
  createUser,
  changeUserName,
} from '../controllers/users.controller.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:username', changeUserName);

export default router;
