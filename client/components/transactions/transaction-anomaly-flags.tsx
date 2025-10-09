import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

const anomalyFlags = [
  {
    id: "volume-spike",
    type: "error",
    icon: AlertTriangle,
    title: "Volume Spike",
    description: "Aug 14, 2022",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    actionLabel: "Investigate",
  },
  {
    id: "missing-fmv",
    type: "warning",
    icon: TrendingUp,
    title: "Missing FMV",
    description: "3 transactions",
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    actionLabel: "Fix Values",
  },
  {
    id: "classification-conflict",
    type: "info",
    icon: Users,
    title: "Rule Conflict",
    description: "2 transactions",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    actionLabel: "Resolve",
  },
];

export function TransactionAnomalyFlags() {
  return (
    <div className="flex gap-4">
      {anomalyFlags.map((flag) => {
        const IconComponent = flag.icon;
        return (
          <div
            key={flag.id}
            className="flex-1 flex items-center gap-3 p-3 border rounded-lg bg-card"
          >
            <div className={`p-2 rounded-full ${flag.iconBg} shrink-0`}>
              <IconComponent className={`h-4 w-4 ${flag.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium truncate">{flag.title}</h4>
              <p className="text-xs text-muted-foreground truncate">
                {flag.description}
              </p>
            </div>
            <Link to="/data-anomaly-detection">
              <Button
                size="sm"
                variant="link"
                className="text-blue-600 p-0 h-auto text-sm shrink-0"
              >
                {flag.actionLabel}
              </Button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
