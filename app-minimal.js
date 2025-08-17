const express = require("express");
const app = express();

// Basic middleware
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Minimal app working!', 
    timestamp: new Date().toISOString()
  });
});

app.get('/test', (req, res) => {
  res.json({ 
    message: 'Test successful!', 
    timestamp: new Date().toISOString()
  });
});

// Export for Vercel
module.exports = app; 