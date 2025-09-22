# Documentation Assets

This directory contains supporting assets for the documentation including screenshots, diagrams, and code examples.

## Directory Structure

### Screenshots (`/screenshots`)

Application screenshots organized by feature area:

- `dashboard/` - Dashboard and analytics screenshots
- `transactions/` - Transaction management screens
- `imports/` - Data import and validation workflows
- `reports/` - Report generation and tax forms
- `mobile/` - Mobile and tablet responsive views

### Diagrams (`/diagrams`)

Technical diagrams and flowcharts:

- `architecture/` - System architecture diagrams
- `workflows/` - User workflow diagrams
- `data-flow/` - Data processing flow diagrams
- `api/` - API interaction diagrams

### Examples (`/examples`)

Code examples and configuration samples:

- `api/` - API request/response examples
- `components/` - Component usage examples
- `configurations/` - Setup and configuration examples
- `integrations/` - Third-party integration examples

## Asset Guidelines

### Screenshots

- **Format**: PNG for UI screenshots, JPG for photos
- **Resolution**: Minimum 1920x1080 for desktop, actual device resolution for mobile
- **Quality**: High quality, no compression artifacts
- **Annotations**: Use red boxes/arrows for highlighting important elements
- **Privacy**: Remove or blur any sensitive information

### Diagrams

- **Format**: SVG (preferred) or PNG for complex diagrams
- **Tools**: Draw.io, Mermaid, or Figma
- **Style**: Consistent colors and fonts matching design system
- **Accessibility**: Include alt text and ensure sufficient color contrast

### Code Examples

- **Format**: Markdown code blocks with syntax highlighting
- **Completeness**: Include all necessary imports and context
- **Comments**: Explain complex logic and important details
- **Testing**: Verify all examples work with current codebase

## Naming Conventions

### Files

- Use kebab-case for file names
- Include feature area prefix: `dashboard-overview.png`
- Include device type for responsive screenshots: `transactions-mobile.png`
- Use version numbers for iterations: `user-flow-v2.svg`

### Directories

- Use descriptive, lowercase names
- Group by feature or document section
- Keep hierarchy shallow (max 2 levels deep)

## Maintenance

### Update Schedule

- **Screenshots**: Update with each major UI change
- **Diagrams**: Review quarterly or with architecture changes
- **Examples**: Validate with each release

### Quality Checks

- [ ] All screenshots are current and accurate
- [ ] Diagrams reflect current architecture
- [ ] Code examples compile and run
- [ ] No sensitive data exposed
- [ ] Consistent styling and branding

---

**Maintained by:** Documentation Team
**Last Review:** [Date]
**Next Review:** [Date + 3 months]
