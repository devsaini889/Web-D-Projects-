import express from 'express';
import { generateEmail, getEmailHistory } from '../controllers/aiController.js';
import protect from '../middlewares/authmiddleware.js';

const router = express.Router();

router.post('/generate', protect, generateEmail);
router.get('/history', protect, getEmailHistory);

export default router;