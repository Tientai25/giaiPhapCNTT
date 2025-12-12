const express = require('express');
const db = require('../config/db.config');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, full_name, email, company, role, plan_type FROM users');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
