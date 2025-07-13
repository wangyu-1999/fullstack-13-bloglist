import { Router } from 'express';

import { login, logout } from '../controllers/login.controller.js';
import sessionValidator from '../middleware/session-validator.js';

const router = Router();

router.post('/login', login);
router.delete('/logout', sessionValidator, logout);

export default router;
