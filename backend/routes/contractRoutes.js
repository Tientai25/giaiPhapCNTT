const express = require('express');
const db = require('../config/db.config');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all contracts (protected)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.*, u.full_name as creator_name 
      FROM contracts c 
      LEFT JOIN users u ON c.created_by = u.user_id
      ORDER BY c.created_at DESC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get contract by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM contracts WHERE contract_id = ?', 
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Contract not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
