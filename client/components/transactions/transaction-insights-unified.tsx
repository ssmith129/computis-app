import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Sparkles,
  Flag,
} from "lucide-react";
import { Link } from "react-router-dom";

const classificationData = [
  {
    level: "High Confidence",
    count: 61,
    percentage: 55,
    description: "Match known patterns with high confidence",
    color: "text-green-600",
    bgColor: "bg-green-100",
    icon: CheckCircle,
    progressColor: "bg-green-500",
    actionColor: "text-green-600",
  },
  {
    level: "Medium Confidence",
    count: 42,
    percentage: 34,
    description: "Somewhat reliable AI classifications",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    icon: AlertCircle,
    progressColor: "bg-yellow-500",
    actionColor: "text-yellow-600",
  },
  {
    level: "Low Confidence",
    count: 14,
    percentage: 11,
    description: "Need manual review due to uncertain patterns",
    color: "text-red-600",
    bgColor: "bg-red-100",
    icon: XCircle,
    progressColor: "bg-red-500",
    actionColor: "text-red-600",
  },
];

const anomalyFlags = [
  {
    id: "volume-spike",
    type: "error",
    severity: "high",
    icon: AlertTriangle,
    title: "Volume Spike",
    description: "Aug 14, 2022",
    count: "15 txns",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    actionLabel: "Investigate",
  },
  {
    id: "missing-fmv",
    type: "warning",
    severity: "medium",
    icon: TrendingUp,
    title: "Missing FMV",
    description: "3 transactions need pricing data",
    count: "3 txns",
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    actionLabel: "Fix Values",
  },
  {
    id: "classification-conflict",
    type: "info",
    severity: "low",
    icon: Users,
    title: "Rule Conflict",
    description: "2 transactions with conflicting rules",
    count: "2 txns",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    actionLabel: "Resolve",
  },
];

export function TransactionInsightsUnified() {
  return (
    <div className="space-y-6">
      {/* AI Classification Section */}
      <section aria-labelledby="classification-heading">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" aria-hidden="true" />
            <h3
              id="classification-heading"
              className="text-lg font-semibold text-foreground"
            >
              AI Classification Insights
            </h3>
          </div>
          <Badge variant="outline" className="text-xs">
            117 Total
          </Badge>
        </div>

        <div
          className="space-y-3"
          role="list"
          aria-label="Classification levels"
        >
          {classificationData.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.level}
                className="group flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                role="listitem"
              >
                {/* Icon and Label */}
                <div className="flex items-center gap-2.5 min-w-[160px]">
                  <div className={`p-1.5 rounded-full ${item.bgColor}`}>
                    <IconComponent
                      className={`h-4 w-4 ${item.color}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-medium block">
                      {item.level}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.count} transactions
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex-1 min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <Progress
                      value={item.percentage}
                      className="h-2 flex-1"
                      aria-label={`${item.level}: ${item.percentage}% of transactions`}
                    />
                    <span
                      className={`text-sm font-semibold tabular-nums ${item.color} min-w-[40px] text-right`}
                      aria-label={`${item.percentage} percent`}
                    >
                      {item.percentage}%
                    </span>
                  </div>
                </div>

                {/* Action */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${item.actionColor} h-8 px-3 opacity-0 group-hover:opacity-100 transition-opacity`}
                  aria-label={`Review ${item.level.toLowerCase()} transactions`}
                >
                  Review
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      <Separator className="my-6" />

      {/* Anomaly Flags Section */}
      <section aria-labelledby="anomaly-heading">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-orange-600" aria-hidden="true" />
            <h3
              id="anomaly-heading"
              className="text-lg font-semibold text-foreground"
            >
              Anomaly Flags
            </h3>
          </div>
          <Link to="/data-anomaly-detection">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground h-auto p-0 text-sm"
              aria-label="View all anomaly flags"
            >
              View All
            </Button>
          </Link>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
          role="list"
          aria-label="Transaction anomalies"
        >
          {anomalyFlags.map((flag) => {
            const IconComponent = flag.icon;
            return (
              <div
                key={flag.id}
                className="group relative flex flex-col gap-3 p-4 border rounded-lg bg-card hover:shadow-md transition-all"
                role="listitem"
              >
                {/* Severity Indicator */}
                <div
                  className={`absolute top-0 right-0 w-2 h-2 rounded-bl-lg ${
                    flag.severity === "high"
                      ? "bg-red-500"
                      : flag.severity === "medium"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                  aria-label={`Severity: ${flag.severity}`}
                />

                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${flag.iconBg} shrink-0`}>
                    <IconComponent
                      className={`h-5 w-5 ${flag.iconColor}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold mb-0.5">
                      {flag.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {flag.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <Badge
                    variant="secondary"
                    className="text-xs font-mono bg-muted"
                  >
                    {flag.count}
                  </Badge>
                  <Link to="/data-anomaly-detection">
                    <Button
                      size="sm"
                      variant="link"
                      className={`${flag.iconColor} p-0 h-auto text-xs font-medium`}
                      aria-label={`${flag.actionLabel} ${flag.title.toLowerCase()}`}
                    >
                      {flag.actionLabel} →
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-4 p-3 rounded-lg bg-muted/50 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle
                className="h-4 w-4 text-orange-600"
                aria-hidden="true"
              />
              <span className="text-sm font-medium">
                Active Issues Requiring Attention
              </span>
            </div>
            <span
              className="text-sm font-bold text-orange-600 tabular-nums"
              aria-label="20 total anomalies"
            >
              20 Total
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
