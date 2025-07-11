# Scatch - Deployment Guide

## Prerequisites
- Node.js v14+ installed
- MongoDB Atlas account
- A deployment platform account (Render.com, Railway.app, Heroku, etc.)

## Environment Variables
Make sure to set these environment variables on your deployment platform:

```
PORT=3000 (or let the platform assign one)
JWT_KEY="your_secure_jwt_key"
EXPRESS_SESSION_SECRET="your_secure_session_secret"
NODE_ENV=production
```

## Deployment Steps

### 1. Clone the repository
```
git clone https://github.com/Niranjan05Kumar/Scatch.git
cd Scatch
```

### 2. Install dependencies
```
npm install
```

### 3. Build CSS
```
npm run build-css
```

### 4. Start the application
```
npm start
```

## Platform-Specific Instructions

### Render.com
- Build Command: `npm install && npm run build-css`
- Start Command: `npm start`

### Railway.app
- Deployment will automatically use the start script from package.json

### Heroku
- Make sure the Procfile exists with: `web: npm start`

## Post-Deployment
After deployment, you might want to:
1. Create an owner account through the admin interface
2. Add initial products
3. Test the user registration and shopping features
