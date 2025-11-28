import express from 'express';
import contactFormCtrl from '../controllers/contactsForm.controller.js';

const router = express.Router();

// POST /api/contact
router.post('/contact', contactFormCtrl.create);

export default router;
