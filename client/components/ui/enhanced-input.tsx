import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff, AlertCircle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-input focus-visible:border-ring",
        error: "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
        success: "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20",
        warning: "border-yellow-500 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/20",
      },
      size: {
        default: "h-10",
        sm: "h-9",
        lg: "h-11",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface EnhancedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  warning?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  loading?: boolean;
  required?: boolean;
}

const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ 
    className, 
    variant, 
    size: inputSize = size,
    type = "text",
    label,
    description,
    error,
    success,
    warning,
    leftIcon,
    rightIcon,
    showPasswordToggle = false,
    loading = false,
    required = false,
    id,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const inputId = id || React.useId();
    
    // Determine the actual input type
    const inputType = showPasswordToggle && type === "password" 
      ? showPassword ? "text" : "password"
      : type;

    // Determine variant based on validation state
    const inputVariant = error ? "error" : success ? "success" : warning ? "warning" : variant;

    // Get the appropriate message and icon
    const message = error || success || warning;
    const MessageIcon = error ? AlertCircle : success ? CheckCircle : warning ? Info : null;
    const messageColor = error ? "text-red-600" : success ? "text-green-600" : warning ? "text-yellow-600" : "text-muted-foreground";

    return (
      <div className="space-y-2">
        {/* Label */}
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            id={inputId}
            type={inputType}
            className={cn(
              inputVariants({ variant: inputVariant, size }),
              leftIcon && "pl-10",
              (rightIcon || showPasswordToggle || loading) && "pr-10",
              isFocused && "ring-2 ring-ring ring-offset-2",
              className
            )}
            ref={ref}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            aria-invalid={!!error}
            aria-describedby={
              [
                description && `${inputId}-description`,
                message && `${inputId}-message`
              ].filter(Boolean).join(' ') || undefined
            }
            {...props}
          />

          {/* Right Content */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            )}
            
            {showPasswordToggle && type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
            
            {rightIcon && !showPasswordToggle && !loading && (
              <div className="text-muted-foreground">
                {rightIcon}
              </div>
            )}
          </div>
        </div>

        {/* Validation Message */}
        {message && MessageIcon && (
          <div 
            id={`${inputId}-message`}
            className={`flex items-center space-x-2 text-sm ${messageColor}`}
            role={error ? "alert" : "status"}
          >
            <MessageIcon className="h-4 w-4" />
            <span>{message}</span>
          </div>
        )}
      </div>
    );
  }
);

EnhancedInput.displayName = "EnhancedInput";

// Form Field Container for consistent spacing
export function FormField({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
    </div>
  );
}

// Enhanced Textarea with similar features
export interface EnhancedTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'autoComplete'> {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  warning?: string;
  required?: boolean;
  resize?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
}

const EnhancedTextarea = React.forwardRef<HTMLTextAreaElement, EnhancedTextareaProps>(
  ({ 
    className,
    label,
    description,
    error,
    success,
    warning,
    required = false,
    resize = true,
    maxLength,
    showCharCount = false,
    id,
    value,
    ...props 
  }, ref) => {
    const textareaId = id || React.useId();
    const currentLength = typeof value === 'string' ? value.length : 0;
    
    const message = error || success || warning;
    const MessageIcon = error ? AlertCircle : success ? CheckCircle : warning ? Info : null;
    const messageColor = error ? "text-red-600" : success ? "text-green-600" : warning ? "text-yellow-600" : "text-muted-foreground";

    return (
      <div className="space-y-2">
        {/* Label */}
        {label && (
          <label 
            htmlFor={textareaId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Description */}
        {description && (
          <p id={`${textareaId}-description`} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}

        {/* Textarea */}
        <textarea
          id={textareaId}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            !resize && "resize-none",
            error && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
            success && "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20",
            warning && "border-yellow-500 focus-visible:border-yellow-500 focus-visible:ring-yellow-500/20",
            className
          )}
          ref={ref}
          maxLength={maxLength}
          value={value}
          aria-invalid={!!error}
          aria-describedby={
            [
              description && `${textareaId}-description`,
              message && `${textareaId}-message`
            ].filter(Boolean).join(' ') || undefined
          }
          {...props}
        />

        {/* Character Count */}
        {showCharCount && maxLength && (
          <div className="flex justify-end">
            <span className={cn(
              "text-xs",
              currentLength > maxLength * 0.9 ? "text-yellow-600" : "text-muted-foreground",
              currentLength >= maxLength ? "text-red-600" : ""
            )}>
              {currentLength}/{maxLength}
            </span>
          </div>
        )}

        {/* Validation Message */}
        {message && MessageIcon && (
          <div 
            id={`${textareaId}-message`}
            className={`flex items-center space-x-2 text-sm ${messageColor}`}
            role={error ? "alert" : "status"}
          >
            <MessageIcon className="h-4 w-4" />
            <span>{message}</span>
          </div>
        )}
      </div>
    );
  }
);

EnhancedTextarea.displayName = "EnhancedTextarea";

export { EnhancedInput, EnhancedTextarea, inputVariants };
