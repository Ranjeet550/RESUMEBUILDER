# Deployment Guide: Vercel & Render

## Overview
- **Client:** Hosted on Vercel (https://resumebuilder-opal-five.vercel.app/)
- **Server:** Hosted on Render (Node.js + MongoDB)

---

## Step 1: Deploy Server to Render

### Prerequisites
- Render account (https://render.com)
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)

### 1.1 Set up MongoDB Atlas
1. Go to MongoDB Atlas and create a free cluster
2. Create a database user with username and password
3. Whitelist your IP (or allow all: 0.0.0.0/0)
4. Copy the connection string: `mongodb+srv://username:password@cluster.mongodb.net/resume-builder?retryWrites=true&w=majority`

### 1.2 Deploy to Render
1. Push your code to GitHub
2. Go to https://render.com and sign in
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Fill in the details:
   - **Name:** resume-builder-server
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid for better performance)

### 1.3 Add Environment Variables on Render
In the Render dashboard, go to your service → Environment:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-builder?retryWrites=true&w=majority
JWT_SECRET=your_very_secure_random_string_here
NODE_ENV=production
CLIENT_URL=https://resumebuilder-opal-five.vercel.app
PORT=10000
```

**Generate a secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 1.4 Deploy
- Click "Deploy"
- Wait for deployment to complete
- Copy your Render URL (e.g., `https://resume-builder-server.onrender.com`)

---

## Step 2: Deploy Client to Vercel

### Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository

### 2.1 Configure Environment Variables
1. Go to Vercel dashboard
2. Select your project → Settings → Environment Variables
3. Add:
   ```
   VITE_API_URL=https://resume-builder-server.onrender.com/api
   ```

### 2.2 Deploy
1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Vite configuration
3. Build settings should be:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click "Deploy"

---

## Step 3: Update CORS on Server

If you get CORS errors, ensure your server's CORS is configured correctly:

**server/index.js** already has:
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
```

This will automatically use your Vercel URL from the `CLIENT_URL` environment variable.

---

## Step 4: Test the Deployment

1. Visit https://resumebuilder-opal-five.vercel.app/
2. Try registering a new account
3. Check browser console for any API errors
4. Verify data is being saved to MongoDB

---

## Troubleshooting

### "Cannot POST /api/auth/register"
- Check that Render server is running
- Verify `VITE_API_URL` is correct in Vercel environment variables
- Check server logs on Render dashboard

### CORS Errors
- Ensure `CLIENT_URL` environment variable on Render matches your Vercel URL
- Restart the Render service after updating env vars

### MongoDB Connection Errors
- Verify MongoDB Atlas connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user credentials are correct

### Render Service Goes to Sleep
- Free tier services sleep after 15 minutes of inactivity
- Upgrade to paid plan for always-on service
- Or use a monitoring service to ping the health endpoint

---

## Environment Variables Summary

### Client (Vercel)
```
VITE_API_URL=https://resume-builder-server.onrender.com/api
```

### Server (Render)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-builder?retryWrites=true&w=majority
JWT_SECRET=your_secure_random_string
NODE_ENV=production
CLIENT_URL=https://resumebuilder-opal-five.vercel.app
PORT=10000
```

---

## Useful Links
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html
