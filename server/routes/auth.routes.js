import express from 'express';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// Routes mounted under /api/users in Express
router.post('/signin', authCtrl.signin);
router.get('/signout', authCtrl.signout);

export default router;
