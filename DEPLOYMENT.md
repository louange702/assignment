# Deployment Guide - Louange Project

## Pre-Deployment Checklist

### Security
- [ ] Change default admin password
- [ ] Update JWT_SECRET to a strong random string
- [ ] Remove console.log statements
- [ ] Enable HTTPS
- [ ] Set secure environment variables
- [ ] Enable rate limiting
- [ ] Add input validation
- [ ] Configure CORS for production domains

### Configuration
- [ ] Update database credentials
- [ ] Set production API URLs
- [ ] Configure production ports
- [ ] Set NODE_ENV=production
- [ ] Update CORS origins

---

## Backend Deployment

### Option 1: Traditional Server (VPS/Dedicated)

#### 1. Install Dependencies
```bash
# Install Node.js and MySQL
sudo apt update
sudo apt install nodejs npm mysql-server

# Verify installations
node --version
npm --version
mysql --version
```

#### 2. Setup MySQL
```bash
sudo mysql_secure_installation
mysql -u root -p

# Create database
CREATE DATABASE louange_db;
CREATE USER 'louange_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON louange_db.* TO 'louange_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### 3. Deploy Backend
```bash
# Upload files to server
scp -r backend/ user@server:/var/www/louange/

# On server
cd /var/www/louange/backend
npm install --production

# Update .env
nano .env
```

Update `.env`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=louange_user
DB_PASSWORD=strong_password
DB_NAME=louange_db
JWT_SECRET=your_very_strong_random_secret_key_here
NODE_ENV=production
```

#### 4. Initialize Database
```bash
node config/initDb.js
```

#### 5. Setup PM2 (Process Manager)
```bash
# Install PM2
sudo npm install -g pm2

# Start application
pm2 start server.js --name louange-backend

# Setup auto-restart on reboot
pm2 startup
pm2 save
```

#### 6. Setup Nginx Reverse Proxy
```bash
sudo apt install nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/louange-api
```

Add configuration:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

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

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/louange-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 7. Setup SSL with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

---

### Option 2: Cloud Platforms

#### Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
heroku login
```

2. **Prepare Backend**
```bash
cd backend

# Create Procfile
echo "web: node server.js" > Procfile

# Initialize git
git init
git add .
git commit -m "Initial commit"
```

3. **Create Heroku App**
```bash
heroku create louange-backend
```

4. **Add MySQL Database**
```bash
heroku addons:create cleardb:ignite
heroku config:get CLEARDB_DATABASE_URL
```

5. **Set Environment Variables**
```bash
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production
```

6. **Deploy**
```bash
git push heroku main
heroku run node config/initDb.js
```

#### AWS (EC2)
Similar to traditional server deployment, but use AWS RDS for MySQL.

#### DigitalOcean App Platform
1. Connect GitHub repository
2. Configure build settings
3. Add environment variables
4. Deploy

---

## Admin Dashboard Deployment

### Build for Production
```bash
cd admin-dashboard

# Update API URL in code
# Change http://localhost:5000 to https://api.yourdomain.com

# Build
npm run build
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd admin-dashboard
netlify deploy --prod --dir=dist
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd admin-dashboard
vercel --prod
```

### Deploy to Traditional Server
```bash
# Upload build files
scp -r dist/ user@server:/var/www/louange/admin/

# Nginx config
sudo nano /etc/nginx/sites-available/louange-admin
```

```nginx
server {
    listen 80;
    server_name admin.yourdomain.com;
    root /var/www/louange/admin;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Frontend Deployment

Same process as Admin Dashboard:

```bash
cd frontend

# Update API URL
# Change http://localhost:5000 to https://api.yourdomain.com

# Build
npm run build

# Deploy to Netlify/Vercel or traditional server
```

---

## Environment Variables

### Backend (.env)
```env
# Production
PORT=5000
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=louange_db
JWT_SECRET=your_very_strong_random_secret_key
NODE_ENV=production
```

### Frontend & Admin Dashboard
Update API URLs in code:
```javascript
// Before (Development)
const API_URL = 'http://localhost:5000';

// After (Production)
const API_URL = 'https://api.yourdomain.com';
```

Or use environment variables:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

Create `.env.production`:
```env
VITE_API_URL=https://api.yourdomain.com
```

---

## Post-Deployment

### 1. Test Everything
- [ ] Admin login works
- [ ] All CRUD operations work
- [ ] Frontend connects to backend
- [ ] Database operations work
- [ ] SSL certificates are valid

### 2. Monitor
```bash
# Check PM2 logs
pm2 logs louange-backend

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Check MySQL logs
sudo tail -f /var/log/mysql/error.log
```

### 3. Backup
```bash
# Backup database
mysqldump -u louange_user -p louange_db > backup.sql

# Automate backups with cron
crontab -e
# Add: 0 2 * * * mysqldump -u louange_user -p'password' louange_db > /backups/louange_$(date +\%Y\%m\%d).sql
```

### 4. Setup Monitoring
- Use PM2 monitoring: `pm2 monitor`
- Setup uptime monitoring (UptimeRobot, Pingdom)
- Configure error logging (Sentry)

---

## Scaling Considerations

### Database
- Use connection pooling (already implemented)
- Add read replicas for heavy read operations
- Implement caching (Redis)
- Optimize queries with indexes

### Backend
- Use load balancer (Nginx, AWS ELB)
- Deploy multiple instances
- Implement rate limiting
- Use CDN for static assets

### Frontend
- Use CDN (Cloudflare, AWS CloudFront)
- Enable gzip compression
- Optimize images
- Implement lazy loading

---

## Maintenance

### Regular Updates
```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit
npm audit fix
```

### Database Maintenance
```sql
-- Optimize tables
OPTIMIZE TABLE users, services, team_members, contacts, admins;

-- Check table status
SHOW TABLE STATUS;
```

### Backup Strategy
- Daily automated backups
- Weekly full backups
- Monthly archive backups
- Test restore procedures regularly

---

## Rollback Plan

If deployment fails:

1. **Revert Code**
```bash
git revert HEAD
git push
```

2. **Restore Database**
```bash
mysql -u louange_user -p louange_db < backup.sql
```

3. **Restart Services**
```bash
pm2 restart louange-backend
sudo systemctl restart nginx
```

---

## Domain Configuration

### DNS Records
```
A     api.yourdomain.com      -> Server IP
A     admin.yourdomain.com    -> Server IP
A     www.yourdomain.com      -> Server IP
CNAME yourdomain.com          -> www.yourdomain.com
```

---

## Cost Estimation

### Minimal Setup (Small Traffic)
- VPS (DigitalOcean/Linode): $5-10/month
- Domain: $10-15/year
- SSL: Free (Let's Encrypt)
- **Total: ~$10/month**

### Medium Setup
- VPS: $20-40/month
- Managed Database: $15-30/month
- CDN: $5-10/month
- **Total: ~$50/month**

### Enterprise Setup
- Multiple servers with load balancer
- Managed database with replicas
- CDN with DDoS protection
- Monitoring and logging services
- **Total: $200+/month**

---

## Support

For deployment issues:
1. Check server logs
2. Verify environment variables
3. Test database connection
4. Check firewall rules
5. Verify DNS configuration
