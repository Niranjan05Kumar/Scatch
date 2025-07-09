# Scatch - Modern E-commerce Platform

A full-stack e-commerce platform built with Node.js, Express, MongoDB, and EJS templating. Features a modern UI, comprehensive admin dashboard, and secure user authentication system.

## 🌟 Features

### User Management
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **User Registration & Login**: Complete user onboarding flow
- **Profile Management**: Users can update profile information and upload profile pictures
- **Password Security**: Secure password hashing and validation

### Product Management
- **Dynamic Product Catalog**: Browse products with search and filtering
- **Shopping Cart**: Add/remove items with persistent cart functionality
- **Product Details**: Rich product pages with images and specifications
- **Inventory Management**: Track product availability and stock

### Admin Dashboard
- **Centralized Management**: Single dashboard for all admin operations
- **Product CRUD**: Create, read, update, and delete products
- **Tab-based Navigation**: Intuitive admin interface with "All Products" and "Create Product" tabs
- **Bulk Operations**: Manage multiple products efficiently
- **File Upload**: Product image upload with validation

### UI/UX Features
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Flash Messages**: Comprehensive feedback system with color-coded messages
- **Interactive Components**: Smooth animations and transitions
- **Professional Theme**: Modern, clean interface design
- **Auto-hide Notifications**: Smart notification system with auto-dismiss

## 🛠️ Tech Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Token for authentication
- **bcrypt**: Password hashing library
- **Multer**: File upload middleware
- **Express Session**: Session management
- **Connect Flash**: Flash messaging system

### Frontend
- **EJS**: Embedded JavaScript templating
- **Tailwind CSS**: Utility-first CSS framework
- **Vanilla JavaScript**: Client-side interactivity
- **Responsive Design**: Mobile-first approach

### Development Tools
- **Nodemon**: Development auto-restart
- **dotenv**: Environment variable management
- **Debug**: Debug utility
- **Cookie Parser**: Cookie handling

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Scatch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/scatch
   JWT_SECRET=your-jwt-secret-key
   EXPRESS_SESSION_SECRET=your-session-secret-key
   NODE_ENV=development
   ```

4. **Build CSS**
   ```bash
   npm run build-css
   ```

5. **Start the application**
   ```bash
   # Development mode with auto-restart and CSS watching
   npm run dev
   
   # Production mode
   node app.js
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
Scatch/
├── app.js                      # Main application entry point
├── package.json                # Project dependencies and scripts
├── README.md                   # Project documentation
├── config/                     # Configuration files
│   ├── development.json        # Development environment config
│   ├── mongoose-connection.js  # MongoDB connection setup
│   ├── multer-profile.js       # Profile image upload config
│   └── multer-product.js       # Product image upload config
├── controllers/                # Business logic controllers
│   └── usersController.js      # Authentication logic
│   └── productsController.js   # Authentication logic
├── middleware/                 # Custom middleware
│   └── isLoggedIn.js      # isLoggedIn confirmation
├── models/                     # MongoDB schemas
│   ├── owner-model.js          # Owner/Admin model
│   ├── product-model.js        # Product model
│   └── user-model.js           # User model
├── routes/                     # Express route definitions
│   ├── index.js                # Main routes
│   ├── ownerRouter.js          # Owner/Admin routes
│   ├── productRouter.js        # Product routes
│   └── userRouter.js           # User routes
├── views/                      # EJS templates
│   ├── admin.ejs               # Admin dashboard
│   ├── cart.ejs                # Shopping cart page
│   ├── createproducts.ejs      # Product management page
│   ├── index.ejs               # Home page
│   ├── owner-login.ejs         # Admin login page
│   ├── shop.ejs                # Product catalog page
│   └── partials/               # Reusable template components
│       ├── footer.ejs          # Footer component
│       ├── header.eiis         # Header component
│       └── flashMessage.ejs    # Flash message component
├── public/                     # Static assets
│   ├── images/                 # Product and user images
│   ├── javascripts/            # Client-side JavaScript
│   │   ├── deleteProduct.js    # Product deletion functionality
│   │   └── flashMessage.js     # Flash message handling
│   └── stylesheets/            # CSS files
│       ├── input.css           # Tailwind CSS source
│       └── output.css          # Compiled CSS
└── utils/                      # Utility functions
    ├── generateToken.js        # JWT token generation
    └── hashPassword.js         # Password hashing utilities
```

## 🔧 Usage

### For Users
1. **Registration**: Create a new account with email and password
2. **Shopping**: Browse products, add items to cart
3. **Profile Management**: Update personal information and profile picture

### For Admins
1. **Admin Login**: Access admin dashboard with owner credentials, only one owner (development env)
2. **Product Management**: Add, delete products

## 🎨 Key Features Explained

### Flash Message System
- **Color-coded Messages**: Success (green), Error (red), Warning (yellow)
- **Auto-dismiss**: Messages automatically hide after 5 seconds
- **Manual Close**: Users can manually close messages
- **Persistent**: Messages persist across page redirects

### Admin Dashboard
- **Tab Navigation**: Switch between "All Products" and "Create Product" views
- **Product Grid**: Visual grid layout for product management
- **Quick Actions**: Delete products with confirmation dialogs
- **File Upload**: Product image upload

### Authentication System
- **Secure Storage**: Passwords hashed with bcrypt
- **JWT Tokens**: Stateless authentication tokens
- **Session Management**: Secure session handling
- **Route Protection**: Protected routes for authenticated users

## 🔐 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **File Upload Security**: Multer configuration with file type restrictions
- **Session Security**: Secure session configuration
- **Environment Variables**: Sensitive data stored in .env files

## 🚀 Development Scripts

```bash
# Watch CSS changes during development
npm run watch-css

# Build CSS for production
npm run build-css

# Start development server with auto-restart and CSS watching
npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Node.js, Express, MongoDB, and Tailwind CSS**
