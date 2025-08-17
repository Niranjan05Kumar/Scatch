# 🚀 Vercel Deployment Guide - Scatch Project

## ✅ प्रोजेक्ट Vercel के लिए तैयार है!

### 📋 **Deployment से पहले की तैयारी:**

#### 1. **Environment Variables Setup**
Vercel dashboard में ये environment variables set करें:

```
NODE_ENV=production
JWT_KEY=your_secure_jwt_secret_key_here
EXPRESS_SESSION_SECRET=your_secure_session_secret_here
MONGO_URI=mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0
```

#### 2. **Vercel CLI Installation (Optional)**
```bash
npm i -g vercel
```

### 🚀 **Deployment Steps:**

#### **Method 1: Vercel Dashboard (Recommended)**
1. [Vercel.com](https://vercel.com) पर जाएं
2. GitHub से login करें
3. "New Project" पर click करें
4. अपना GitHub repository select करें
5. Environment variables add करें
6. Deploy करें

#### **Method 2: Vercel CLI**
```bash
# Project directory में जाएं
cd /path/to/your/project

# Vercel login
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

### 🔧 **Configuration Files:**

#### **vercel.json** ✅ (Created)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/app.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### **package.json** ✅ (Updated)
- `vercel-build` script added
- All dependencies properly configured

### 📁 **Important File Paths:**
- **Main App**: `app.js` ✅
- **Static Files**: `public/` ✅
- **Views**: `views/` ✅
- **Routes**: `routes/` ✅
- **Models**: `models/` ✅
- **Config**: `config/` ✅

### 🔒 **Security Considerations:**

#### ✅ **Fixed Issues:**
1. **vercel.json** created for proper routing
2. **Build script** added for Tailwind CSS
3. **Environment variables** properly configured

#### ⚠️ **Important Notes:**
1. **MongoDB URI** - Production में environment variable use करें
2. **JWT Secret** - Strong secret key use करें
3. **Session Secret** - Unique secret key use करें

### 🎯 **Post-Deployment Steps:**

1. **Admin Setup:**
   ```bash
   # Local में run करें या Vercel function बनाएं
   npm run setup-admin
   ```

2. **Admin Login:**
   - URL: `https://your-app.vercel.app/ownerlogin`
   - Email: `admin@example.com`
   - Password: `admin123`

3. **Test Features:**
   - User registration
   - Product management
   - Shopping cart
   - Database operations

### 🌐 **Expected URLs:**
- **Main Site**: `https://your-app.vercel.app`
- **Admin Panel**: `https://your-app.vercel.app/ownerlogin`
- **User Login**: `https://your-app.vercel.app/userlogin`
- **Products**: `https://your-app.vercel.app/products`

### 🚨 **Troubleshooting:**

#### **Common Issues:**
1. **Build Error**: Check if all dependencies are in `package.json`
2. **Database Connection**: Verify MongoDB URI in environment variables
3. **Static Files**: Ensure `public/` folder structure is correct
4. **Routes**: Check if all route files are properly exported

#### **Vercel Logs:**
- Vercel dashboard में "Functions" tab check करें
- Build logs में errors देखें
- Runtime logs में issues identify करें

### ✅ **Deployment Checklist:**
- [ ] vercel.json created
- [ ] Environment variables set
- [ ] MongoDB connection configured
- [ ] Static files in public/ folder
- [ ] All routes properly exported
- [ ] Build script working
- [ ] Admin setup ready