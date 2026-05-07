const express = require('express');
const router = express.Router();

const { generateEmail, getEmailHistory } = require('../controllers/aiController');
const protect = require('../middlewares/authmiddleware');

router.post('/generate', protect, generateEmail);
router.get('/history', protect, getEmailHistory);

module.exports = router;