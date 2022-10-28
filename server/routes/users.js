import express from 'express';

import { signIn, signUp, fetchKey } from '../controllers/users.js';

const router = express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.get('/data', fetchKey);

export default router;