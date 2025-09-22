# Crypto Tax Platform - Complete Documentation

## 🎯 Overview

The Crypto Tax Platform is a comprehensive web application designed to simplify cryptocurrency tax reporting and compliance. Built for tax professionals, accountants, and crypto investors, it automates the complex process of tracking, classifying, and reporting cryptocurrency transactions for tax purposes.

### Value Proposition

- **Automated Classification**: AI-powered transaction categorization
- **Multi-Exchange Support**: Import from 50+ cryptocurrency exchanges
- **Tax Compliance**: Generate IRS-compliant forms (8949, Schedule D)
- **Anomaly Detection**: Identify and resolve data inconsistencies
- **Client Management**: Multi-client support for tax professionals
- **Real-time Processing**: Instant transaction analysis and reporting

## 📋 Table of Contents

1. [Features](#features)
2. [System Architecture](#system-architecture)
3. [Detailed Workflows](#detailed-workflows)
4. [Installation & Setup](#installation--setup)
5. [Usage Examples](#usage-examples)
6. [API Documentation](#api-documentation)
7. [Contributing](#contributing)
8. [Troubleshooting](#troubleshooting)

## ✨ Features

### Core Functionality

#### 📊 Dashboard & Analytics

- **Real-time Metrics**: Transaction volumes, gain/loss summaries, completion status
- **Visual Analytics**: Interactive charts showing portfolio performance and tax implications
- **Recent Activity**: Latest imports, rule executions, and system activities
- **Anomaly Alerts**: Immediate notification of data inconsistencies

#### 💼 Transaction Management

- **Bulk Import**: CSV file uploads from major exchanges (Coinbase, Binance, Kraken, etc.)
- **Smart Classification**: AI-powered categorization (Income, Trade, Transfer, etc.)
- **Manual Override**: Edit classifications with audit trail
- **Filtering & Search**: Advanced filters by date, amount, exchange, status
- **Bulk Operations**: Mass edit, delete, or reclassify transactions

#### 🏦 Wallet & Exchange Integration

- **Multi-Source Support**: 50+ supported exchanges and wallet formats
- **Connection Management**: Secure API connections to exchanges
- **Automatic Sync**: Scheduled imports for connected accounts
- **Address Tracking**: Monitor specific wallet addresses
- **Custom Mapping**: Support for custom CSV formats

#### 👥 Client Management (Professional Features)

- **Multi-Client Support**: Manage hundreds of clients with isolated data
- **Permission System**: Role-based access control (Admin, Editor, Viewer)
- **Client Onboarding**: Streamlined setup for new clients
- **Bulk Operations**: Apply changes across multiple clients
- **Reporting Dashboard**: Client-specific analytics and progress tracking

#### 🤖 Rule Engine & Automation

- **Custom Rules**: Create complex classification rules based on multiple criteria
- **Conditional Logic**: IF/THEN statements for automated processing
- **Rule Templates**: Pre-built rules for common scenarios
- **Conflict Resolution**: Automatic handling of overlapping rules
- **Audit Trail**: Complete history of rule executions and changes

#### 📈 Advanced Analytics & Reporting

- **IRS Form 8949**: Automated generation with proper formatting
- **Schedule D**: Capital gains and losses summary
- **Gain/Loss Reports**: Detailed P&L analysis with multiple accounting methods
- **Custom Reports**: Flexible reporting with date ranges and filters
- **Export Options**: PDF, CSV, Excel formats for all reports

#### 🔍 Data Anomaly Detection

- **Smart Analysis**: AI-powered detection of unusual patterns
- **Issue Classification**: Volume spikes, missing data, duplicate transactions
- **Resolution Workflows**: Guided processes to fix identified issues
- **False Positive Management**: Mark legitimate anomalies as resolved
- **Batch Processing**: Resolve multiple issues simultaneously

#### ⚙️ Data Import & Validation

- **Multi-Step Validation**: File format, data structure, and content verification
- **Schema Mapping**: Intelligent column mapping for various CSV formats
- **Error Handling**: Detailed error reports with correction suggestions
- **Preview Mode**: Review data before final import
- **Rollback Capability**: Undo imports if issues are discovered

### Advanced Features

#### 🎯 Intelligent Processing

- **Machine Learning**: Continuous improvement of classification accuracy
- **Pattern Recognition**: Identify recurring transaction patterns
- **Contextual Analysis**: Consider transaction timing and amounts for better classification
- **Learning from Corrections**: Adapt to user feedback and manual corrections

#### 🔒 Security & Compliance

- **Data Encryption**: End-to-end encryption for sensitive financial data
- **Audit Logging**: Complete trail of all user actions and system changes
- **Backup & Recovery**: Automated backups with point-in-time recovery
- **Privacy Controls**: GDPR-compliant data handling and deletion

#### 📱 User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Touch Optimization**: iPad Pro support with touch gestures
- **Keyboard Shortcuts**: Power-user shortcuts for common actions
- **Dark Mode**: Professional dark theme for extended use
- **Accessibility**: WCAG 2.1 AA compliant interface

## 🏗️ System Architecture

### Application Stack

```
┌─────────────────────────────────────┐
│           Frontend (React)          │
├─────────────────────────────────────┤
│     Component Library (Radix UI)    │
├─────────────────────────────────────┤
│       State Management (TanStack)   │
├─────────────────────────────────────┤
│           API Layer (REST)          │
├─────────────────────────────────────┤
│      Serverless Functions (Vercel)  │
├─────────────────────────────────────┤
│         Database (PostgreSQL)       │
└─────────────────────────────────────┘
```

### Technology Decisions

#### Frontend Framework: React 18 + TypeScript

**Why React:**

- Component reusability for complex financial UI
- Large ecosystem for specialized components (charts, tables)
- Strong TypeScript support for financial data type safety
- Excellent performance with concurrent features

**Why TypeScript:**

- Type safety for financial calculations
- Better developer experience with autocomplete
- Reduced runtime errors in production
- Enhanced refactoring capabilities

#### UI Library: Radix UI + Tailwind CSS

**Why Radix UI:**

- Accessibility-first components (WCAG 2.1 AA)
- Unstyled components for custom theming
- Comprehensive component coverage
- Keyboard navigation support

**Why Tailwind CSS:**

- Rapid prototyping and development
- Consistent design system enforcement
- Responsive design utilities
- Dark mode support

#### State Management: TanStack Query + React Context

**Why TanStack Query:**

- Optimized data fetching and caching
- Background updates and synchronization
- Error handling and retry logic
- Offline support capabilities

#### Build Tool: Vite

**Why Vite:**

- Lightning-fast development server
- Optimized production builds
- Native ES modules support
- Excellent TypeScript integration

### Component Architecture

#### Page-Level Organization

```typescript
// Page Structure
export default function TransactionsPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar activeItem="Transactions" />
      <SidebarInset>
        <DashboardHeader />
        <TransactionsContent />
      </SidebarInset>
    </SidebarProvider>
  );
}
```

#### Feature-Based Components

```
client/components/
├── dashboard/          # Dashboard-specific components
├── transactions/       # Transaction management
├── clients/           # Client management
├── rule-engine/       # Rule creation and management
├── data-anomaly-detection/ # Anomaly detection
├── exports/           # Report generation
├── wallet-ingestion/  # Data import workflows
└── ui/               # Shared UI components
```

## 🔄 Detailed Workflows

### Transaction Import Workflow

```mermaid
graph TD
    A[Upload CSV File] --> B[File Validation]
    B --> C{Valid Format?}
    C -->|No| D[Show Error Message]
    C -->|Yes| E[Schema Mapping]
    E --> F[Data Preview]
    F --> G{User Confirms?}
    G -->|No| H[Modify Mapping]
    G -->|Yes| I[Import Transactions]
    H --> F
    I --> J[Classification Rules]
    J --> K[Anomaly Detection]
    K --> L[Review Results]
    L --> M[Complete Import]
```

### Data Anomaly Detection Process

1. **Automated Scanning**: System continuously monitors imported data
2. **Pattern Analysis**: ML algorithms identify unusual patterns
3. **Issue Classification**: Categorize anomalies by type and severity
4. **User Notification**: Present issues in prioritized dashboard
5. **Resolution Workflow**: Guide users through fixing each issue
6. **Verification**: Confirm resolutions don't introduce new problems

### Report Generation Workflow

1. **Parameter Selection**: Choose report type, date range, accounts
2. **Data Aggregation**: Compile relevant transactions and calculations
3. **Tax Method Application**: Apply FIFO, LIFO, or specific identification
4. **Form Generation**: Create IRS-compliant forms with proper formatting
5. **Validation**: Verify calculations and completeness
6. **Export Options**: Provide multiple format options for download

### Client Onboarding Process

1. **Initial Setup**: Create client profile with basic information
2. **Data Import**: Upload historical transaction data
3. **Classification Review**: Verify AI classifications and create custom rules
4. **Anomaly Resolution**: Address any data quality issues
5. **Report Generation**: Create initial tax reports
6. **Handoff**: Train client or team on ongoing maintenance

## 🚀 Installation & Setup

### Prerequisites

- **Node.js**: Version 18 or higher
- **Package Manager**: pnpm (recommended) or npm
- **Git**: For version control
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Development Environment Setup

#### 1. Clone Repository

```bash
git clone https://github.com/your-org/crypto-tax-platform.git
cd crypto-tax-platform
```

#### 2. Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

#### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Required Environment Variables
DATABASE_URL="postgresql://username:password@localhost:5432/crypto_tax_db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Optional API Keys
COINBASE_API_KEY="your-coinbase-api-key"
BINANCE_API_KEY="your-binance-api-key"

# Development Settings
NODE_ENV="development"
LOG_LEVEL="debug"
```

#### 4. Database Setup

```bash
# Initialize database
pnpm db:migrate

# Seed development data (optional)
pnpm db:seed
```

#### 5. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Production Deployment

#### Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

#### Environment Variables for Production

Set these in your deployment platform:

```bash
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="secure-random-string"
NEXTAUTH_URL="https://your-domain.com"
```

#### Docker Deployment

```bash
# Build Docker image
docker build -t crypto-tax-platform .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  crypto-tax-platform
```

## 💡 Usage Examples

### Basic Transaction Import

```typescript
// Import transactions from CSV file
import { useTransactionImport } from '@/hooks/use-transaction-import';

function ImportButton() {
  const { uploadFile, isLoading, error } = useTransactionImport();

  const handleFileUpload = async (file: File) => {
    try {
      const result = await uploadFile(file);
      console.log(`Imported ${result.count} transactions`);
    } catch (error) {
      console.error('Import failed:', error);
    }
  };

  return (
    <input
      type="file"
      accept=".csv"
      onChange={(e) => handleFileUpload(e.target.files[0])}
      disabled={isLoading}
    />
  );
}
```

### Custom Classification Rule

```typescript
// Create rule for automated transaction classification
const rule = {
  name: "Mining Income Classification",
  conditions: [
    {
      field: "description",
      operator: "contains",
      value: "mining",
    },
    {
      field: "amount",
      operator: "greater_than",
      value: 0,
    },
  ],
  actions: [
    {
      type: "classify",
      classification: "INCOME",
    },
    {
      type: "add_note",
      note: "Automatically classified as mining income",
    },
  ],
};
```

### Generate Tax Report

```typescript
// Generate IRS Form 8949
import { useReportGeneration } from '@/hooks/use-report-generation';

function GenerateReportButton() {
  const { generateReport, isLoading } = useReportGeneration();

  const handleGenerate = async () => {
    const params = {
      reportType: 'FORM_8949',
      taxYear: 2023,
      accountingMethod: 'FIFO',
      clientId: 'client-123'
    };

    const report = await generateReport(params);
    // Download or display report
  };

  return (
    <button onClick={handleGenerate} disabled={isLoading}>
      {isLoading ? 'Generating...' : 'Generate Form 8949'}
    </button>
  );
}
```

## 📚 API Documentation

### Core Endpoints

#### Transaction Management

```typescript
// GET /api/transactions
// Query parameters: page, limit, filters, sort
interface TransactionQuery {
  page?: number;
  limit?: number;
  dateFrom?: string;
  dateTo?: string;
  classification?: TransactionType;
  exchange?: string;
}

// POST /api/transactions/import
// Body: FormData with CSV file
interface ImportResponse {
  success: boolean;
  importId: string;
  totalTransactions: number;
  errors?: ImportError[];
}
```

#### Report Generation

```typescript
// POST /api/reports/generate
interface ReportRequest {
  type: "FORM_8949" | "SCHEDULE_D" | "GAIN_LOSS";
  taxYear: number;
  accountingMethod: "FIFO" | "LIFO" | "SPECIFIC_ID";
  clientId?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

// GET /api/reports/:reportId/download
// Returns: PDF or CSV file
```

#### Rule Engine

```typescript
// POST /api/rules
interface Rule {
  name: string;
  description?: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  priority: number;
  active: boolean;
}

// POST /api/rules/:ruleId/execute
// Execute rule against specified transactions
```

### Authentication & Authorization

```typescript
// All API endpoints require authentication
// Headers:
{
  'Authorization': 'Bearer <jwt-token>',
  'Content-Type': 'application/json'
}

// Role-based access control
enum UserRole {
  ADMIN = 'admin',      // Full system access
  MANAGER = 'manager',  // Multi-client management
  USER = 'user',        // Single client access
  VIEWER = 'viewer'     // Read-only access
}
```

## 🤝 Contributing

### Development Workflow

1. **Fork Repository**: Create personal fork on GitHub
2. **Create Branch**: Feature branches from `main`
3. **Development**: Follow coding standards and test requirements
4. **Pull Request**: Submit PR with detailed description
5. **Code Review**: Address feedback from maintainers
6. **Merge**: Squash and merge when approved

### Coding Standards

```typescript
// TypeScript strict mode required
// ESLint and Prettier for formatting
// Conventional Commits for messages

// Example commit message:
// feat(transactions): add bulk classification feature
// fix(reports): correct FIFO calculation for partial sales
// docs(api): update endpoint documentation
```

### Testing Requirements

```bash
# Unit tests for utilities and hooks
pnpm test

# Integration tests for API endpoints
pnpm test:integration

# E2E tests for critical user flows
pnpm test:e2e

# Type checking
pnpm typecheck
```

### Component Development Guidelines

1. **Accessibility**: All components must be keyboard navigable
2. **Responsive**: Test on mobile, tablet, and desktop
3. **Performance**: Lazy load and optimize bundle size
4. **Documentation**: Include Storybook stories
5. **Testing**: Unit tests for logic, integration tests for interactions

## 🔧 Troubleshooting

### Common Issues

#### Build Problems

**Issue**: "Module not found" errors during build

```bash
# Solution: Clear cache and reinstall
rm -rf node_modules .next
pnpm install
pnpm build
```

**Issue**: TypeScript errors in production build

```bash
# Solution: Run type checking
pnpm typecheck
# Fix reported errors before building
```

#### Development Server Issues

**Issue**: Hot reload not working

```bash
# Solution: Restart development server
pnpm dev --force
```

**Issue**: Port already in use

```bash
# Solution: Use different port
pnpm dev --port 3001
```

#### Database Connection Problems

**Issue**: "Connection refused" error

1. Verify database is running
2. Check connection string in `.env.local`
3. Ensure firewall allows connections
4. Verify credentials and permissions

#### Import/Upload Failures

**Issue**: CSV import fails with validation errors

1. Check file format matches expected schema
2. Verify column headers are correct
3. Ensure data types match requirements
4. Check for special characters or encoding issues

#### Performance Issues

**Issue**: Slow page loads or interactions

1. Check browser dev tools for performance bottlenecks
2. Verify API response times
3. Review console for JavaScript errors
4. Consider enabling production optimizations

### Getting Help

- **Documentation**: Check `/documentation` folder for detailed guides
- **GitHub Issues**: Report bugs and feature requests
- **Community Forum**: Ask questions and share knowledge
- **Support Email**: Critical issues and enterprise support

### Debug Mode

Enable debug logging for troubleshooting:

```bash
# Set environment variable
DEBUG=crypto-tax:* pnpm dev

# Or add to .env.local
LOG_LEVEL=debug
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React, TypeScript, and Tailwind CSS
- UI components powered by Radix UI
- Charts and visualizations by Recharts
- Icons by Lucide React

---

**Last Updated:** [Current Date]
**Version:** 1.0
**Maintained by:** Platform Engineering Team
