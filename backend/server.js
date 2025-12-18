const express = require('express');
const cors = require('cors');
const db = require('./config/db.config');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contractRoutes = require('./routes/contractRoutes');
const templateRoutes = require('./routes/templateRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Log environment info
console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
console.log('🚀 Starting server on port:', PORT);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 TDT eContract API Server',
    status: 'running',
    version: '1.0.0'
  });
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 as result');
    res.json({ 
      status: 'healthy',
      database: 'connected',
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message 
    });
  }
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/templates', templateRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: err.message 
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ TDT eContract API Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});
