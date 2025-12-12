const express = require('express');
const db = require('../config/db.config');

const router = express.Router();

// Get all templates
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM templates WHERE is_public = TRUE ORDER BY usage_count DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
