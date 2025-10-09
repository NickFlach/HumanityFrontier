# 🚢 HumanityFrontier Deployment Guide

Complete guide for deploying the Quantum Shield platform to production.

---

## 📋 **Table of Contents**

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Production Build](#production-build)
- [Deployment Platforms](#deployment-platforms)
- [Security Checklist](#security-checklist)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

---

## 🔧 **Prerequisites**

- **Node.js** 18+ and npm
- **PostgreSQL** 14+ database
- **Git** for version control
- **Domain name** (optional, for custom domains)
- **SSL Certificate** (for HTTPS)

---

## 🌍 **Environment Configuration**

### **Create Production Environment File**

```env
# .env.production

# Server
NODE_ENV=production
PORT=5000
HOST=0.0.0.0

# Database (PostgreSQL/Neon)
DATABASE_URL=postgresql://user:password@hostname:5432/quantum_shield

# Session Security
SESSION_SECRET=generate-strong-random-secret-here-minimum-32-chars

# CORS Configuration
CORS_ORIGIN=https://yourdomain.com

# Optional: External Services
QUANTUM_API_KEY=your-quantum-api-key
CONSCIOUSNESS_PROBE_URL=https://consciousness-probe.yourdomain.com
PITCHFORK_API_URL=https://pitchfork.yourdomain.com
SPACECHILD_API_URL=https://spacechild.yourdomain.com

# Monitoring
SENTRY_DSN=your-sentry-dsn-here
LOG_LEVEL=info

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

### **Generate Secure Secrets**

```bash
# Generate session secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🗄️ **Database Setup**

### **Option 1: Local PostgreSQL**

```bash
# Install PostgreSQL
# Ubuntu/Debian:
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS:
brew install postgresql

# Start PostgreSQL
sudo service postgresql start  # Linux
brew services start postgresql # macOS

# Create database
createdb quantum_shield

# Create user
createuser -P quantum_user
```

### **Option 2: Neon (Recommended)**

1. Sign up at [neon.tech](https://neon.tech)
2. Create new project: "quantum-shield"
3. Copy connection string
4. Add to `.env.production` as `DATABASE_URL`

### **Option 3: Supabase**

1. Sign up at [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings → Database
4. Add to `.env.production`

### **Run Database Migrations**

```bash
# Push schema to database
npm run db:push

# Or generate and run migrations
npx drizzle-kit generate
npx drizzle-kit migrate
```

---

## 🏗️ **Production Build**

### **1. Build the Application**

```bash
# Install dependencies
npm install --production=false

# Build frontend and backend
npm run build

# This creates:
# - dist/index.js (backend)
# - dist/public/* (frontend)
```

### **2. Test Production Build Locally**

```bash
# Set environment
export NODE_ENV=production

# Start production server
npm start

# Verify at http://localhost:5000
```

---

## 🚀 **Deployment Platforms**

### **Option 1: Replit (Easiest)**

1. Fork the repository to Replit
2. Configure environment variables in Secrets
3. Click "Run" - automatically deploys!

**Replit Configuration:**

```toml
# .replit
run = "npm start"
entrypoint = "server/index.ts"

[deployment]
run = ["sh", "-c", "npm install && npm run build && npm start"]
```

---

### **Option 2: Railway**

1. Sign up at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select HumanityFrontier repository
4. Add PostgreSQL database plugin
5. Configure environment variables
6. Deploy automatically!

**Railway Configuration:**

```json
// railway.json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

### **Option 3: Render**

1. Sign up at [render.com](https://render.com)
2. Create "New Web Service"
3. Connect GitHub repository
4. Configure:

```yaml
# render.yaml
services:
  - type: web
    name: quantum-shield
    env: node
    plan: starter
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: quantum-shield-db
          property: connectionString
```

---

### **Option 4: Fly.io**

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Launch app
fly launch

# Deploy
fly deploy
```

**Fly Configuration:**

```toml
# fly.toml
app = "quantum-shield"
primary_region = "iad"

[build]
  builder = "paketobuildpacks/builder:base"

[env]
  PORT = "5000"
  NODE_ENV = "production"

[[services]]
  internal_port = 5000
  protocol = "tcp"

  [[services.ports]]
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443
```

---

### **Option 5: DigitalOcean App Platform**

1. Sign up at [digitalocean.com](https://digitalocean.com)
2. Create new App → Deploy from GitHub
3. Select repository
4. Configure build and run commands
5. Add managed PostgreSQL database
6. Deploy!

---

### **Option 6: Heroku**

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create quantum-shield

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Deploy
git push heroku main
```

---

### **Option 7: VPS (Ubuntu/Debian)**

```bash
# SSH into server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Clone repository
git clone https://github.com/yourusername/HumanityFrontier.git
cd HumanityFrontier/HumanityFrontier/HumanityFrontier

# Install dependencies
npm install --production

# Build
npm run build

# Install PM2 process manager
npm install -g pm2

# Start with PM2
pm2 start dist/index.js --name quantum-shield

# Save PM2 config
pm2 save
pm2 startup
```

**Nginx Configuration:**

```nginx
# /etc/nginx/sites-available/quantum-shield
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔒 **Security Checklist**

### **Essential Security Steps**

- [ ] **Strong SESSION_SECRET** (32+ random characters)
- [ ] **HTTPS enabled** (SSL certificate)
- [ ] **Environment variables** properly configured
- [ ] **Database credentials** secured
- [ ] **CORS** configured for your domain only
- [ ] **Rate limiting** enabled
- [ ] **Input validation** on all endpoints
- [ ] **SQL injection** protection (Drizzle ORM provides this)
- [ ] **XSS protection** headers set
- [ ] **Regular dependency updates** (`npm audit fix`)

### **HTTP Security Headers**

```typescript
// server/index.ts - Add security headers

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});
```

---

## 📊 **Monitoring**

### **Application Monitoring**

**Sentry Integration:**

```bash
npm install @sentry/node
```

```typescript
// server/index.ts
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### **Health Check Endpoint**

```typescript
// server/routes.ts
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
```

### **Logging**

```bash
# View logs on different platforms

# Railway
railway logs

# Render
render logs

# Fly.io
fly logs

# PM2 (VPS)
pm2 logs quantum-shield
```

---

## 🐛 **Troubleshooting**

### **Common Issues**

**Issue: Database connection fails**
```
Error: connect ECONNREFUSED
```

**Solution:**
- Verify DATABASE_URL is correct
- Check database server is running
- Ensure firewall allows connections
- Test connection string manually

---

**Issue: Port already in use**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

---

**Issue: Build fails**
```
Error: Cannot find module
```

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist

# Rebuild
npm run build
```

---

**Issue: 502 Bad Gateway**

**Solution:**
- Server not running - check logs
- Port mismatch - verify PORT env variable
- Memory limit exceeded - upgrade plan

---

## 📈 **Performance Optimization**

### **Database Optimization**

```sql
-- Add indexes for frequently queried fields
CREATE INDEX idx_quantum_keys_user_id ON quantum_keys(user_id);
CREATE INDEX idx_quantum_keys_key_id ON quantum_keys(key_id);
CREATE INDEX idx_quantum_ledger_key_id ON quantum_ledger(key_id);
CREATE INDEX idx_quantum_entanglements_source ON quantum_entanglements(source_key_id);
```

### **Caching Strategy**

```typescript
// Add Redis for session storage (optional)
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL
});

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
```

---

## 🎉 **Post-Deployment**

### **Verification Steps**

1. ✅ Application loads at your domain
2. ✅ Database connections working
3. ✅ API endpoints responding
4. ✅ Quantum operations functional
5. ✅ HTTPS certificate valid
6. ✅ Monitoring/logging active

### **Documentation Update**

```bash
# Update README with production URL
sed -i 's/localhost:5000/yourdomain.com/g' README.md

# Commit changes
git add README.md
git commit -m "Update production URL"
git push
```

---

<div align="center">

**🛡️ Quantum Shield Deployed**

*Your quantum cryptographic platform is now live!*

For support, open an issue on GitHub

</div>
