const express = require("express");
const app = express();

// Load environment variables
require("dotenv").config();

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

// Database test route
app.get('/db-test', async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    res.json({ 
      message: 'Database connection successful!', 
      timestamp: new Date().toISOString(),
      collections: collections.map(col => col.name),
      connectionState: mongoose.connection.readyState
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      error: 'Database connection failed', 
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
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