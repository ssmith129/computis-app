# UX Copywriting & Content Strategy Guide

## Table of Contents

1. [Brand Voice & Tone](#brand-voice--tone)
2. [UI Copy Standards](#ui-copy-standards)
3. [Error Message Templates](#error-message-templates)
4. [User Journey Copy Flows](#user-journey-copy-flows)
5. [Accessibility Considerations](#accessibility-considerations)
6. [Content Guidelines](#content-guidelines)

## Brand Voice & Tone

### Brand Voice Characteristics

**Professional yet Approachable** - We simplify complex crypto tax concepts without talking down to users.

**Clear and Confident** - Our language is direct, actionable, and builds user confidence in tax compliance.

**Trustworthy and Reliable** - We use precise language that reflects our commitment to accuracy and security.

### Tone Guidelines

#### Primary Tone: Professional & Supportive

- **Use:** "Let's get your crypto taxes organized"
- **Avoid:** "Don't worry about crypto taxes anymore"

#### Secondary Tone: Educational & Empowering

- **Use:** "Review and classify your transactions"
- **Avoid:** "Check if your transactions are correct"

#### Voice Attributes

- **Clarity**: Use simple, direct language
- **Confidence**: Make definitive statements when appropriate
- **Helpfulness**: Always provide next steps or context
- **Respect**: Acknowledge the complexity users face

## UI Copy Standards

### Button Copy

**Primary Actions**

- Generate Report
- Save Changes
- Import Transactions
- Create Rule
- Add Client

**Secondary Actions**

- View Details
- Edit Settings
- Cancel Import
- Go Back

**Destructive Actions**

- Delete Transaction
- Remove Client
- Clear All Data

### Labels and Headers

**Page Titles**

- Use title case: "Transaction Management"
- Keep under 3 words when possible
- Be specific: "IRS Form 8949" not "Tax Forms"

**Section Headers**

- Use sentence case: "Recent uploads"
- Describe content: "Gain/loss summary" not "Summary"

**Form Labels**

- Be descriptive: "Client business name"
- Include format hints: "Tax year (YYYY)"
- Use help text for complex fields

### Status Messages

**Success States**

- ✅ "Transaction imported successfully"
- ✅ "Rule created and activated"
- ✅ "Export generated - ready for download"

**Loading States**

- 🔄 "Importing transactions..."
- 🔄 "Generating report..."
- 🔄 "Analyzing anomalies..."

**Empty States**

- "No transactions found. Import your first transaction file to get started."
- "No clients yet. Add your first client to begin managing their crypto taxes."

## Error Message Templates

### Validation Errors

```
Field Required: "[Field name] is required"
Format Error: "Please enter a valid [field type]"
Range Error: "[Field] must be between [min] and [max]"
```

### System Errors

```
Connection Error: "Unable to connect. Please check your internet connection and try again."
Server Error: "Something went wrong on our end. Please try again in a few moments."
Permission Error: "You don't have permission to perform this action."
```

### Import/Upload Errors

```
File Format: "Please upload a CSV file from a supported exchange"
File Size: "File size must be under 10MB"
Data Validation: "3 transactions have invalid data. Review and fix before importing."
```

### User-Friendly Error Structure

1. **What happened** (clear problem statement)
2. **Why it happened** (brief context if helpful)
3. **What to do next** (specific action)

**Example:**

```
"Unable to generate report"
"Some transactions are missing required data"
"Review flagged transactions and try again"
```

## User Journey Copy Flows

### Onboarding Flow

1. **Welcome**: "Welcome to [Platform Name] - Simplify your crypto tax reporting"
2. **Setup**: "Let's set up your account"
3. **First Import**: "Import your first transaction file"
4. **Success**: "Great! You're ready to manage crypto taxes"

### Transaction Import Flow

1. **Upload**: "Upload transactions from your exchange"
2. **Validate**: "Validating your transaction data"
3. **Map**: "Map columns to ensure accurate import"
4. **Review**: "Review transactions before final import"
5. **Complete**: "Transactions imported successfully"

### Report Generation Flow

1. **Select**: "Choose report type and tax year"
2. **Configure**: "Select accounts and date ranges"
3. **Generate**: "Generating your tax report"
4. **Download**: "Report ready for download"

### Error Resolution Flow

1. **Detect**: "We found potential issues with your data"
2. **Review**: "Review flagged transactions"
3. **Fix**: "Make corrections or dismiss false positives"
4. **Resolve**: "All issues resolved - ready to proceed"

## Accessibility Considerations

### Screen Reader Content

- **Alt Text**: Descriptive, not redundant with surrounding text
- **Aria Labels**: Clear action descriptions for icon buttons
- **Landmarks**: Proper heading hierarchy and navigation structure

### Content Accessibility

- **Plain Language**: Write at 8th-grade reading level
- **Abbreviations**: Always spell out on first use
- **Context**: Provide sufficient context for actions
- **Instructions**: Break complex processes into clear steps

### Visual Content

- **Icon Meanings**: Always pair icons with text labels
- **Color Dependency**: Don't rely solely on color for meaning
- **Focus States**: Clear, high-contrast focus indicators

## Content Guidelines

### Writing Style

- **Active Voice**: "Generate report" not "Report will be generated"
- **Present Tense**: "Review transactions" not "You will review"
- **Second Person**: "Your transactions" not "User transactions"
- **Contractions**: Use sparingly in UI, freely in help content

### Technical Terms

**Preferred Terms:**

- Transaction (not "tx" or "txn")
- Cryptocurrency (not "crypto" in formal contexts)
- Wallet address (not "wallet ID")
- Tax year (not "year" alone)

**Avoid Jargon:**

- Instead of "FIFO/LIFO" use "First in, first out"
- Instead of "DeFi" use "Decentralized finance"
- Instead of "Gas fees" use "Network fees"

### Number and Date Formatting

- **Currencies**: Always include currency symbol ($1,234.56)
- **Dates**: Use clear format (March 15, 2024)
- **Large Numbers**: Use commas (1,234 transactions)
- **Percentages**: Include % symbol (95% complete)

### Help and Support Content

- **Progressive Disclosure**: Start simple, offer detail on demand
- **Contextual Help**: Relevant to current user task
- **Link to Documentation**: Provide paths to comprehensive help
- **Contact Options**: Clear escalation to human support

---

## Implementation Checklist

### Content Review Process

- [ ] All copy follows voice and tone guidelines
- [ ] Error messages provide clear next steps
- [ ] Technical terms are explained or avoided
- [ ] Content is accessible and inclusive
- [ ] Microcopy supports user goals

### Quality Assurance

- [ ] Spell check and grammar review
- [ ] Consistency check across related features
- [ ] Accessibility review with screen reader
- [ ] User testing of critical flows
- [ ] Legal/compliance review of financial language

---

**Last Updated:** [Current Date]
**Version:** 1.0
**Maintained by:** UX Content Team
