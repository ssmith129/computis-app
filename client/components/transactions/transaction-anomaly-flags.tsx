import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, TrendingUp, Users, X } from "lucide-react";

const anomalyFlags = [
  {
    id: "volume-spike",
    type: "error",
    icon: AlertTriangle,
    title: "Volume Spike Detected",
    description: "Unusual transaction volume on Aug 14, 2022",
    details: "Transaction volume increased by 450% compared to 30-day average.",
    actionLabel: "Investigate",
    dismissLabel: "Dismiss"
  },
  {
    id: "missing-fmv",
    type: "warning", 
    icon: TrendingUp,
    title: "Missing FMV Data",
    description: "3 transactions missing accurate pricing",
    details: "Fair market value data be inaccurate for these transactions.",
    actionLabel: "Fix Values",
    dismissLabel: "Dismiss"
  },
  {
    id: "classification-conflict",
    type: "info",
    icon: Users,
    title: "Classification Conflict", 
    description: "Rule conflict detected in 2 transactions",
    details: "Multiple rules are trying to classify the same transactions differently.",
    actionLabel: "Resolve", 
    dismissLabel: "Dismiss"
  }
];

const getAlertStyles = (type: string) => {
  switch (type) {
    case "error":
      return "border-red-200 bg-red-50 text-red-800";
    case "warning":
      return "border-yellow-200 bg-yellow-50 text-yellow-800";
    case "info":
      return "border-blue-200 bg-blue-50 text-blue-800";
    default:
      return "border-gray-200 bg-gray-50 text-gray-800";
  }
};

const getIconColor = (type: string) => {
  switch (type) {
    case "error":
      return "text-red-500";
    case "warning": 
      return "text-yellow-500";
    case "info":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
};

export function TransactionAnomalyFlags() {
  return (
    <div className="space-y-4">
      {anomalyFlags.map((flag) => {
        const IconComponent = flag.icon;
        return (
          <Alert key={flag.id} className={getAlertStyles(flag.type)}>
            <div className="flex items-start gap-3">
              <IconComponent className={`h-5 w-5 mt-0.5 ${getIconColor(flag.type)}`} />
              <div className="flex-1 space-y-2">
                <div>
                  <h4 className="font-medium">{flag.title}</h4>
                  <AlertDescription className="text-sm">
                    {flag.description}
                  </AlertDescription>
                </div>
                <p className="text-xs opacity-80">
                  {flag.details}
                </p>
                <div className="flex gap-2 pt-1">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-7 text-xs"
                  >
                    {flag.actionLabel}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="h-7 text-xs"
                  >
                    {flag.dismissLabel}
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </Alert>
        );
      })}

      {/* Summary */}
      <div className="pt-2 text-center">
        <Button variant="outline" size="sm" className="text-xs">
          View All Anomalies
        </Button>
      </div>
    </div>
  );
}
