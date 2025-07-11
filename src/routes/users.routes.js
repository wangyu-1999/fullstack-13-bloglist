import { Router } from 'express';

import {
  getAllUsers,
  getUserByUsername,
  createUser,
  changeUserName,
} from '../controllers/users.controller.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/:username', getUserByUsername);
router.post('/', createUser);
router.put('/:username', changeUserName);

export default router;
