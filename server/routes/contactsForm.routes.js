// server/routes/contactsForm.routes.js
import express from 'express';
import contactFormCtrl from '../controllers/contactsForm.controller.js';

const router = express.Router();

// POST route for contact form submissions
// This will be mounted at /api/contactForms
router.route('/')
    .post(contactFormCtrl.create);

export default router;
