# Vercel Deployment Guide

This guide covers deploying the AI Chatbot Solutions project to Vercel with optimal configuration.

## 🚀 Quick Deployment

### Prerequisites
- [Vercel account](https://vercel.com/signup)
- GitHub repository connected to Vercel
- Node.js 18+ (automatically handled by Vercel)

### One-Click Deployment
1. **Fork this repository**
2. **Connect to Vercel**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your forked repository
   - Configure environment variables (see below)
   - Deploy!

## 📋 Environment Variables

### Required Variables
Set these in your Vercel Dashboard under Project Settings > Environment Variables:

```bash
# Essential for deployment
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NODE_ENV=production
```

### Optional Variables
Add these as needed for enhanced features:

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
MIXPANEL_TOKEN=your-mixpanel-token

# AI Services (for enhanced chatbot generation)
OPENAI_API_KEY=sk-proj-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key

# Database (for data persistence)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key

# Email & CRM
RESEND_API_KEY=re_your-resend-key
HUBSPOT_API_KEY=your-hubspot-key
```

## 🛠️ Manual Deployment Steps

### 1. Clone and Setup
```bash
git clone https://github.com/your-username/aichatbotsolutions.ai.git
cd aichatbotsolutions.ai
npm install
```

### 2. Local Development
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your values
# Start development server
npm run dev
```

### 3. Deploy to Vercel

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: Git Integration
1. Push to GitHub
2. Connect repository in Vercel Dashboard
3. Automatic deployments on every push

## ⚙️ Configuration Files

### vercel.json
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "functions": {
    "src/app/api/**/*.ts": {
      "runtime": "nodejs20.x",
      "maxDuration": 10
    }
  }
}
```

### next.config.js
- Optimized for Vercel deployment
- Standalone output mode
- Image optimization
- Bundle size optimization

## 🎯 Domain Configuration

### Custom Domain
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

### Vercel Domain
- Automatic `.vercel.app` subdomain
- Format: `project-name-username.vercel.app`
- SSL certificate automatically provisioned

## 📊 Performance Optimization

### Automatic Optimizations
- ✅ Edge caching for static assets
- ✅ Image optimization with Next.js Image component
- ✅ Automatic code splitting
- ✅ Gzip compression
- ✅ CDN distribution

### Build Performance
- Bundle analysis: `npm run build:analyze`
- Build time: ~20-30 seconds
- Cold start: <100ms

## 🔒 Security Features

### Headers Configuration
```javascript
// Automatically applied via vercel.json
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: origin-when-cross-origin
```

### Environment Security
- Environment variables encrypted at rest
- Automatic HTTPS enforcement
- Secure headers by default

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check build locally
npm run build

# Check for TypeScript errors
npm run type-check

# Check for linting issues
npm run lint
```

#### Environment Variable Issues
1. Verify variables are set in Vercel Dashboard
2. Check variable names (case-sensitive)
3. Restart deployment after changes

#### API Route Timeouts
- Default timeout: 10 seconds
- Increase in `vercel.json` if needed
- Check function regions in Vercel Dashboard

### Support Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [GitHub Issues](https://github.com/your-repo/issues)

## 🔄 CI/CD Pipeline

### Automatic Deployments
- **Production**: Deploys from `main` branch
- **Preview**: Deploys from feature branches
- **Development**: Local development environment

### Branch Strategy
```
main (production) → your-domain.com
feature-* (preview) → random-url.vercel.app
local (development) → localhost:3000
```

## 📈 Monitoring & Analytics

### Built-in Monitoring
- Vercel Analytics (optional)
- Performance insights
- Error tracking

### Custom Analytics
```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Mixpanel
MIXPANEL_TOKEN=your-token
```

## 🎉 Post-Deployment Checklist

- [ ] ✅ Site loads correctly
- [ ] ✅ All pages render properly
- [ ] ✅ API routes respond correctly
- [ ] ✅ Analytics tracking works
- [ ] ✅ Custom domain configured (if applicable)
- [ ] ✅ Environment variables set
- [ ] ✅ SSL certificate active
- [ ] ✅ Performance acceptable (<2s load time)

## 💡 Pro Tips

1. **Enable Vercel Analytics** for detailed performance insights
2. **Use Preview deployments** for testing before production
3. **Set up monitoring** with tools like Sentry for error tracking
4. **Optimize images** using Next.js Image component
5. **Monitor bundle size** with `npm run build:analyze`

## 📞 Need Help?

If you encounter issues:
1. Check this guide first
2. Review [Vercel documentation](https://vercel.com/docs)
3. Open an issue in the GitHub repository
4. Contact support through Vercel Dashboard

---

**Last Updated**: December 2024  
**Vercel Version**: Latest  
**Next.js Version**: 15.3.3