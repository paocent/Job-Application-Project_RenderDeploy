// src/routes/job.routes.js

import express from 'express';
// Ensure this path matches your controller file name
import jobCtrl from '../controllers/jobApplication.controller.js';
import authCtrl from '../controllers/auth.controller.js'; 

const router = express.Router();

// --- 1. Base Routes: /api/jobs (List and Create) ---
router.route('/api/jobs')
    .get(authCtrl.requireSignin, jobCtrl.listByUser) 
    .post(authCtrl.requireSignin, jobCtrl.create); 

// --- 2. Single Job Routes: /api/jobs/:jobId (Read, Update, Delete) ---
router.route('/api/jobs/:jobId') 
    .get(authCtrl.requireSignin, jobCtrl.read) 
    .put(authCtrl.requireSignin, jobCtrl.update) 
    .delete(authCtrl.requireSignin, jobCtrl.remove);

// 3. Parameter Middleware: Runs jobByID whenever the :jobId parameter is found
router.param('jobId', jobCtrl.jobByID); 
// Note: Authentication is already done on the route itself, but sometimes requireSignin is added here too.
// We'll keep it simple and just run jobByID here, relying on the route methods above for signin check.

export default router;