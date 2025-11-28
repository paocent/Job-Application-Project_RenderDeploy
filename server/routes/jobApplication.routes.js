// src/routes/job.routes.js

import express from 'express';
import jobCtrl from '../controllers/jobApplication.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// --- Base Routes: GET /api/jobs, POST /api/jobs ---
router.route('/')
  .get(authCtrl.requireSignin, jobCtrl.listByUser)
  .post(authCtrl.requireSignin, jobCtrl.create);

// --- Single Job Routes: GET/PUT/DELETE /api/jobs/:jobId ---
router.route('/:jobId')
  .get(authCtrl.requireSignin, jobCtrl.read)
  .put(authCtrl.requireSignin, jobCtrl.update)
  .delete(authCtrl.requireSignin, jobCtrl.remove);

// --- Parameter Middleware ---
router.param('jobId', jobCtrl.jobByID);

export default router;
