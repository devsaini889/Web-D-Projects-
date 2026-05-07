const express = require('express');
const router = express.Router();

// AI routes
router.get('/', (req, res) => {
  res.json({ message: 'AI routes' });
});

module.exports = router;
