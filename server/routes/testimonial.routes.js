import express from 'express';
import testimonialCtrl from '../controllers/testimonial.controller.js';

const router = express.Router();

// ----------------------------------------------------
// Base Routes: /api/testimonials (List)
// ----------------------------------------------------
router.route('/api/testimonials')
    // GET: List all testimonials (Public endpoint - no auth required)
    .get(testimonialCtrl.list); 

export default router;