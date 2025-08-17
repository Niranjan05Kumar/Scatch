const express = require("express");
const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Scatch App API working!', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/test', (req, res) => {
  res.json({ 
    message: 'Test route working!', 
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Server error', 
    message: err.message 
  });
});

// Export for Vercel
module.exports = app; 