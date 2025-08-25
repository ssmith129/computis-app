# Vercel Deployment Guide

This project is configured for deployment on Vercel with both frontend and serverless API functions.

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/yourrepo)

## Manual Deployment

### Prerequisites

1. Install Vercel CLI: `npm i -g vercel`
2. Login to Vercel: `vercel login`

### Deploy

1. Clone the repository
2. Install dependencies: `npm install`
3. Deploy to Vercel: `vercel`

### Environment Variables

Set these environment variables in your Vercel dashboard:

- `PING_MESSAGE` - Custom ping message (optional, defaults to "ping")

### Project Structure

```
├── api/                    # Vercel serverless functions
│   ├── ping.ts            # GET /api/ping
│   └── demo.ts            # GET /api/demo
├── client/                # React frontend
├── shared/                # Shared types between frontend/backend
├── dist/spa/              # Built frontend (generated)
└── vercel.json            # Vercel configuration
```

### API Endpoints

- `GET /api/ping` - Returns a ping message
- `GET /api/demo` - Returns a demo response

### Development

For local development:

```bash
npm run dev
```

This starts the Vite dev server with the Express middleware for API routes.

### Configuration Files

- `vercel.json` - Main Vercel configuration
- `.vercelignore` - Files to exclude from deployment
- `api/` - Serverless function directory

### Differences from Local Development

- In production, API routes are handled by Vercel serverless functions
- In development, API routes are handled by Express middleware
- CORS headers are configured in both environments

### Troubleshooting

1. **Build fails**: Check that all dependencies are in `package.json`
2. **API routes not working**: Verify `vercel.json` rewrites configuration
3. **CORS issues**: Check API function headers configuration
4. **404 on refresh**: SPA fallback is configured in `vercel.json`

### Performance Optimization

- Static assets are automatically cached by Vercel CDN
- API functions have automatic caching for GET requests
- Gzip compression is enabled by default
