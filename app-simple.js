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
    message: 'Scatch App is working!', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/test', (req, res) => {
  res.json({ 
    message: 'Test route working!', 
    timestamp: new Date().toISOString()
  });
});

// Health check with database test
app.get('/health', async (req, res) => {
  try {
    // Try to connect to MongoDB
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";
    
    await mongoose.connect(mongoUri);
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
      mongoUri: process.env.MONGO_URI ? 'Set' : 'Not Set',
      database: dbStatus
    });
  } catch (error) {
    res.json({ 
      status: 'ERROR', 
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
      mongoUri: process.env.MONGO_URI ? 'Set' : 'Not Set',
      database: 'Connection Failed',
      error: error.message
    });
  }
});

// Database test route
app.get('/db-test', async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";
    
    await mongoose.connect(mongoUri);
    
    // Test basic database operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    res.json({ 
      message: 'Database connection successful!', 
      timestamp: new Date().toISOString(),
      collections: collections.map(col => col.name),
      connectionState: mongoose.connection.readyState
    });
  } catch (error) {
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

module.exports = app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} 