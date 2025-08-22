import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  variant: "success" | "warning" | "error" | "pending";
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  error: "bg-red-100 text-red-800 border-red-200",
  pending: "bg-blue-50 text-blue-800 border-blue-200",
};

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
