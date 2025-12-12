const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config');

const JWT_SECRET = process.env.JWT_SECRET || 'tdt-econtract-secret-key-2025';
const SALT_ROUNDS = 10;

// Register new user
const register = async (req, res) => {
  try {
    const { full_name, email, phone, company, password, role = 'user', plan_type = 'free' } = req.body;

    // Validate required fields
    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin: Họ tên, Email, Mật khẩu'
      });
    }

    // Check if email already exists
    const [existingUsers] = await db.query('SELECT user_id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email đã được sử dụng'
      });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert user
    const [result] = await db.query(
      `INSERT INTO users (full_name, email, phone, company, password_hash, role, plan_type, email_verified) 
       VALUES (?, ?, ?, ?, ?, ?, ?, FALSE)`,
      [full_name, email, phone, company, password_hash, role, plan_type]
    );

    // Generate JWT token
    const token = jwt.sign(
      { user_id: result.insertId, email, role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      data: {
        user_id: result.insertId,
        full_name,
        email,
        role,
        plan_type,
        token
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống khi đăng ký',
      error: error.message
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập email và mật khẩu'
      });
    }

    // Find user
    const [users] = await db.query(
      'SELECT user_id, full_name, email, password_hash, role, plan_type, is_active FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    const user = users[0];

    // Check if account is active
    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Tài khoản đã bị khóa'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    // Update last login
    await db.query('UPDATE users SET last_login = NOW() WHERE user_id = ?', [user.user_id]);

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        plan_type: user.plan_type,
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống khi đăng nhập',
      error: error.message
    });
  }
};

// Get user profile (requires authentication)
const getProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const [users] = await db.query(
      `SELECT user_id, full_name, email, phone, company, role, plan_type, 
              email_verified, created_at, last_login 
       FROM users WHERE user_id = ?`,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thông tin người dùng'
      });
    }

    res.json({
      success: true,
      data: users[0]
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin người dùng',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getProfile
};
