# Storybook Integration Guide

> How to create Storybook stories for Computis components with proper documentation.

## Overview

Storybook provides interactive component documentation. Each component should have stories demonstrating all variants, states, and usage patterns.

---

## Setup

### Required Dependencies

```bash
pnpm add -D @storybook/react @storybook/addon-essentials @storybook/addon-a11y
```

### Story File Location

```
client/components/ui/[component].stories.tsx
```

---

## Story Template

### Basic Story Structure

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./component-name";

const meta: Meta<typeof ComponentName> = {
  title: "UI/ComponentName",
  component: ComponentName,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline"],
      description: "Visual variant of the component",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the component",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "Component description for documentation.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

// Default story
export const Default: Story = {
  args: {
    children: "Component Content",
  },
};

// Variant stories
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Variant",
  },
};

// State stories
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled State",
  },
};

// Interactive story
export const Playground: Story = {
  args: {
    variant: "default",
    size: "md",
    children: "Play with controls",
  },
};
```

---

## Component Stories

### Button Stories

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Loader2, Plus, Settings } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: { control: "boolean" },
    asChild: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link Button",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
};

export const IconOnly: Story = {
  args: {
    size: "icon",
    "aria-label": "Settings",
    children: <Settings className="h-4 w-4" />,
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Plus className="h-4 w-4 mr-2" />
        Add Item
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Loading...
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Settings">
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  ),
};
```

### Card Stories

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { Button } from "./button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with important information.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Enter your details to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Form fields would go here.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  ),
};

export const MetricCard: Story = {
  render: () => (
    <Card className="w-[250px]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </p>
            <p className="text-2xl font-bold">$45,231.89</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          +20.1% from last month
        </p>
      </CardContent>
    </Card>
  ),
};
```

### Input Stories

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Search } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "email@example.com",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-[300px]">
      <label htmlFor="email-input" className="text-sm font-medium">
        Email Address
      </label>
      <Input id="email-input" type="email" placeholder="email@example.com" />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="space-y-2 w-[300px]">
      <label htmlFor="error-input" className="text-sm font-medium">
        Email
      </label>
      <Input
        id="error-input"
        type="email"
        placeholder="email@example.com"
        className="border-destructive"
        aria-invalid="true"
        aria-describedby="error-message"
      />
      <p id="error-message" className="text-sm text-destructive">
        Please enter a valid email address.
      </p>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="relative w-[300px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input className="pl-10" placeholder="Search..." />
    </div>
  ),
};
```

---

## Accessibility Testing

### A11y Addon Configuration

```tsx
// .storybook/preview.ts
export const parameters = {
  a11y: {
    element: '#storybook-root',
    config: {
      rules: [
        { id: 'color-contrast', enabled: true },
        { id: 'label', enabled: true },
        { id: 'button-name', enabled: true },
      ],
    },
  },
};
```

### Testing Keyboard Navigation

Each story should include:
- Tab focus order
- Enter/Space activation
- Escape to close
- Arrow key navigation (where applicable)

---

## Documentation Best Practices

### Add JSDoc Comments

```tsx
/**
 * Primary button component for user actions.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click Me
 * </Button>
 * ```
 */
export interface ButtonProps {
  /** The visual style variant */
  variant?: "default" | "secondary" | "outline";
  /** The button size */
  size?: "sm" | "md" | "lg";
  /** Loading state */
  loading?: boolean;
}
```

### Include Usage Examples

```tsx
export const UsageExample: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Common Patterns</h3>
      
      {/* Form submit button */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">Form Submit</p>
        <Button type="submit">Save Changes</Button>
      </div>
      
      {/* Action group */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">Action Group</p>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </div>
      </div>
    </div>
  ),
};
```

---

## File Organization

```
stories/
├── Button.stories.tsx
├── Card.stories.tsx
├── Input.stories.tsx
├── Select.stories.tsx
├── Table.stories.tsx
├── Dialog.stories.tsx
├── Badge.stories.tsx
├── Tabs.stories.tsx
├── Forms.stories.tsx (patterns)
├── DataDisplay.stories.tsx (patterns)
└── LoadingStates.stories.tsx
```

---

*Each component should have comprehensive Storybook coverage before production use.*
