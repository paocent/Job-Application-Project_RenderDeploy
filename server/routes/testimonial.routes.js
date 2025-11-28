import express from 'express';
import testimonialCtrl from '../controllers/testimonial.controller.js';

const router = express.Router();

// Base route: '/'
router.get('/', testimonialCtrl.list);

export default router;
