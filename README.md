# Fusion Starter - Crypto Tax Dashboard

A modern crypto tax dashboard built with React, TypeScript, and Tailwind CSS, ready for deployment on Vercel.

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/yourrepo)

## 🏗️ Project Structure

```
├── api/                    # Vercel serverless functions
│   ├── ping.ts            # Ping endpoint
│   └── demo.ts            # Demo endpoint
├── client/                 # React frontend application
│   ├── components/         # Reusable UI components
│   ├─��� pages/             # Page components
│   └── hooks/             # Custom React hooks
├── shared/                # Shared types and utilities
├── dist/spa/              # Built frontend (auto-generated)
└── vercel.json            # Vercel deployment configuration
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Type check
pnpm typecheck

# Build for production
pnpm build
```

## 🌐 Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment with zero configuration:

1. **One-click deploy**: Use the deploy button above
2. **Manual deploy**:
   ```bash
   npm i -g vercel
   vercel
   ```
3. **GitHub integration**: Connect your repository to Vercel for automatic deployments

### Environment Variables

Set these in your Vercel dashboard:

- `PING_MESSAGE` (optional) - Custom message for ping endpoint

## 📁 Key Features

- **Dashboard**: Comprehensive crypto tax overview
- **Transactions**: Transaction management and classification
- **Wallets**: Wallet and exchange integration
- **Reports**: IRS forms and gain/loss reports
- **Data Import**: CSV upload and validation workflow
- **Responsive Design**: Works on desktop and tablet
- **Dark Theme**: Modern dark UI design

## 🔧 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router
- **UI Components**: Radix UI, Lucide Icons
- **Build Tool**: Vite
- **Deployment**: Vercel (with serverless functions)

## 📋 API Endpoints

- `GET /api/ping` - Health check endpoint
- `GET /api/demo` - Demo data endpoint

## 🎨 Components

- Sidebar navigation with collapsible design
- Responsive dashboard cards and charts
- Data tables with filtering and sorting
- Multi-step form workflows
- Modal dialogs and overlays

## 🔐 Security

- CORS configured for API endpoints
- Environment variable support
- Secure serverless function deployment

## 📚 Documentation

**Complete Documentation Suite**: [`/documentation`](./documentation/)

### Quick Links

- **[📖 Complete Project Guide](./documentation/README.md)** - Comprehensive feature and technical documentation
- **[🎨 Design System](./documentation/DESIGN_SYSTEM.md)** - UI components, colors, typography, and patterns
- **[✍️ Content Guidelines](./documentation/UX_COPYWRITING_GUIDE.md)** - Voice, tone, and copy standards
- **[🤖 AI Features](./documentation/AI_FEATURES.md)** - Machine learning capabilities and API
- **[��� Documentation Index](./documentation/INDEX.md)** - Navigate all documentation by role/need

### Legacy Documentation

- [Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md) - Detailed deployment instructions
- [Component Documentation](./DESIGN_SYSTEM.md) - Design system and components
- [User Flows](./USER_FLOWS.md) - Application user flows

---

Built with ❤️ for the crypto community
