const express = require("express");
const app = express();

// Load environment variables
require("dotenv").config();

// Import required modules
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Static files
app.use(express.static(path.join(__dirname, "../public")));

// Session configuration
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET || "fallback-secret",
  })
);
app.use(flash());

// Serve frontend HTML
app.get('/frontend', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// EJS View Routes
app.get('/', async (req, res) => {
  try {
    res.render('index', { 
      error: req.flash('error'),
      success: req.flash('success'),
      loggedIn: false 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to render index page' });
  }
});

// Form handling routes for original EJS views
app.post('/users/register', async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";
    
    await mongoose.connect(mongoUri);
    const userModel = require("../models/user-model");
    
    const { fullname, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      req.flash('error', 'User already exists with this email');
      return res.redirect('/');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new userModel({
      name: fullname,
      email,
      password: hashedPassword,
      cart: []
    });
    
    await newUser.save();
    
    req.flash('success', 'Registration successful! Please login.');
    res.redirect('/');
  } catch (error) {
    console.error('Registration error:', error);
    req.flash('error', 'Registration failed. Please try again.');
    res.redirect('/');
  }
});

app.post('/users/login', async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";
    
    await mongoose.connect(mongoUri);
    const userModel = require("../models/user-model");
    
    const { email, password } = req.body;
    
    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/');
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/');
    }
    
    // Set user in session
    req.session.user = user;
    req.flash('success', 'Login successful!');
    res.redirect('/shop');
  } catch (error) {
    console.error('Login error:', error);
    req.flash('error', 'Login failed. Please try again.');
    res.redirect('/');
  }
});

app.post('/owners/login', async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";
    
    await mongoose.connect(mongoUri);
    const ownerModel = require("../models/owner-model");
    const productModel = require("../models/product-model");
    
    const { email, password } = req.body;
    
    // Find owner
    const owner = await ownerModel.findOne({ email });
    if (!owner) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/ownerlogin');
    }
    
    // Check password (plain text comparison as per original code)
    if (password !== owner.password) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/ownerlogin');
    }
    
    // Set owner in session
    req.session.owner = owner;
    req.flash('success', 'Admin login successful!');
    res.redirect('/admin');
  } catch (error) {
    console.error('Owner login error:', error);
    req.flash('error', 'Admin login failed. Please try again.');
    res.redirect('/ownerlogin');
  }
});

app.get('/shop', async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";
    
    await mongoose.connect(mongoUri);
    const productModel = require("../models/product-model");
    const products = await productModel.find();
    
    res.render('shop', {
      user: req.session.user || null,
      products: products,
      warning: req.flash('warning'),
      success: req.flash('success'),
      activeTab: "all-products"
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load shop page' });
  }
});

app.get('/cart', async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";

    await mongoose.connect(mongoUri);
    const userModel = require("../models/user-model");
    const productModel = require("../models/product-model");

    const userId = req.session.user?._id;

    if (!userId) {
      req.flash('error', 'Please login to view cart');
      return res.redirect('/');
    }

    const user = await userModel.findById(userId).populate('cart.productId');
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/');
    }

    // Calculate total
    let total = 0;
    user.cart.forEach(item => {
      if (item.productId) {
        total += (item.productId.price - item.productId.discount + 20) * item.quantity;
      }
    });

    res.render('cart', {
      user: user,
      cartItems: user.cart,
      total: total,
      success: req.flash('success'),
      error: req.flash('error')
    });
  } catch (error) {
    console.error('Cart error:', error);
    res.status(500).json({ error: 'Failed to load cart page' });
  }
});

app.get('/account', async (req, res) => {
  try {
    res.render('account', { 
      user: req.session.user || null,
      success: req.flash('success')
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load account page' });
  }
});

app.get('/ownerlogin', async (req, res) => {
  try {
    res.render('owner-login', {
      error: req.flash('error'),
      success: req.flash('success'),
      loggedIn: false
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load owner login page' });
  }
});

app.get('/admin', async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";
    
    await mongoose.connect(mongoUri);
    const productModel = require("../models/product-model");
    const products = await productModel.find();
    
    res.render('admin', {
      error: req.flash('error'),
      success: req.flash('success'),
      products: products,
      loggedIn: req.session.owner ? true : false,
      activeTab: "all-products"
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load admin page' });
  }
});

app.get('/userEdit', async (req, res) => {
  try {
    res.render('userEdit', {
      user: req.session.user || null,
      error: req.flash('error'),
      success: req.flash('success')
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load user edit page' });
  }
});

// Logout route
app.get('/users/logout', (req, res) => {
  req.session.destroy();
  req.flash('success', 'Logged out successfully!');
  res.redirect('/');
});

// User edit route
app.get('/users/edit', async (req, res) => {
  try {
    res.render('userEdit', {
      user: req.session.user || null,
      error: req.flash('error'),
      success: req.flash('success')
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load user edit page' });
  }
});

// Shop discounted route
app.get('/shop/discounted', async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";

    await mongoose.connect(mongoUri);
    const productModel = require("../models/product-model");
    
    // Find products with discount
    const discountedProducts = await productModel.find({ 
      discount: { $gt: 0 } 
    });

    res.render('shop', {
      user: req.session.user || null,
      products: discountedProducts,
      warning: req.flash('warning'),
      success: req.flash('success'),
      activeTab: "discounted"
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load discounted products' });
  }
});

// Add to cart route
app.get('/addtocart/:productId', async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";

    await mongoose.connect(mongoUri);
    const productModel = require("../models/product-model");
    const userModel = require("../models/user-model");

    const { productId } = req.params;
    const userId = req.session.user?._id;

    if (!userId) {
      req.flash('error', 'Please login to add items to cart');
      return res.redirect('/');
    }

    // Find product
    const product = await productModel.findById(productId);
    if (!product) {
      req.flash('error', 'Product not found');
      return res.redirect('/shop');
    }

    // Find user and add to cart
    const user = await userModel.findById(userId);
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/');
    }

    // Check if product already in cart
    const existingCartItem = user.cart.find(item => item.productId.toString() === productId);
    
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      user.cart.push({
        productId: productId,
        quantity: 1,
        price: product.price
      });
    }

    await user.save();
    req.flash('success', 'Product added to cart successfully!');
    res.redirect('/cart');
  } catch (error) {
    console.error('Add to cart error:', error);
    req.flash('error', 'Failed to add product to cart');
    res.redirect('/shop');
  }
});

// Remove from cart route
app.get('/removefromcart/:productId', async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";

    await mongoose.connect(mongoUri);
    const userModel = require("../models/user-model");

    const { productId } = req.params;
    const userId = req.session.user?._id;

    if (!userId) {
      req.flash('error', 'Please login to manage cart');
      return res.redirect('/');
    }

    const user = await userModel.findById(userId);
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/');
    }

    // Remove product from cart
    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();

    req.flash('success', 'Product removed from cart');
    res.redirect('/cart');
  } catch (error) {
    console.error('Remove from cart error:', error);
    req.flash('error', 'Failed to remove product from cart');
    res.redirect('/cart');
  }
});

// Update cart quantity route
app.post('/updatecart/:productId', async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";

    await mongoose.connect(mongoUri);
    const userModel = require("../models/user-model");

    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.session.user?._id;

    if (!userId) {
      return res.status(401).json({ error: 'Please login to update cart' });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const cartItem = user.cart.find(item => item.productId.toString() === productId);
    if (!cartItem) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    } else {
      cartItem.quantity = parseInt(quantity);
    }

    await user.save();
    res.json({ success: true, message: 'Cart updated successfully' });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// Test route
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

// Simple API routes (without views for now)
app.get('/api/products', async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";
    
    await mongoose.connect(mongoUri);
    const productModel = require("../models/product-model");
    const products = await productModel.find();
    
    res.json({ 
      message: 'Products fetched successfully!', 
      products: products,
      count: products.length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      error: 'Failed to fetch products', 
      message: error.message
    });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";
    
    await mongoose.connect(mongoUri);
    const userModel = require("../models/user-model");
    const users = await userModel.find().select('-password'); // Exclude password
    
    res.json({ 
      message: 'Users fetched successfully!', 
      users: users,
      count: users.length
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      error: 'Failed to fetch users', 
      message: error.message
    });
  }
});

// Authentication routes
app.post('/api/users/register', async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";
    
    await mongoose.connect(mongoUri);
    const userModel = require("../models/user-model");
    
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      cart: []
    });
    
    await newUser.save();
    
    res.json({ 
      message: 'User registered successfully!', 
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'Registration failed', 
      message: error.message
    });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";
    
    await mongoose.connect(mongoUri);
    const userModel = require("../models/user-model");
    
    const { email, password } = req.body;
    
    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_KEY || 'fallback-jwt-secret',
      { expiresIn: '24h' }
    );
    
    res.json({ 
      message: 'Login successful!', 
      token: token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Login failed', 
      message: error.message
    });
  }
});

// Owner authentication
app.post('/api/owners/login', async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";
    
    await mongoose.connect(mongoUri);
    const ownerModel = require("../models/owner-model");
    const productModel = require("../models/product-model");
    
    const { email, password } = req.body;
    
    // Find owner
    const owner = await ownerModel.findOne({ email });
    if (!owner) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    // Check password (plain text comparison as per original code)
    if (password !== owner.password) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    // Get products for admin panel
    const products = await productModel.find();
    
    res.json({ 
      message: 'Owner login successful!', 
      owner: { id: owner._id, email: owner.email },
      products: products,
      productCount: products.length
    });
  } catch (error) {
    console.error('Owner login error:', error);
    res.status(500).json({ 
      error: 'Owner login failed', 
      message: error.message
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