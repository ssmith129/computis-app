import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
    level: "High",
    fullLevel: "High Confidence",
    count: 61,
    percentage: 55,
    description: "Match known patterns",
    color: "text-green-600",
    bgColor: "bg-green-100",
    icon: CheckCircle,
    progressColor: "bg-green-500",
    actionColor: "text-green-600",
  },
  {
    level: "Medium",
    fullLevel: "Medium Confidence",
    count: 42,
    percentage: 34,
    description: "Somewhat reliable",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    icon: AlertCircle,
    progressColor: "bg-yellow-500",
    actionColor: "text-yellow-600",
  },
  {
    level: "Low",
    fullLevel: "Low Confidence",
    count: 14,
    percentage: 11,
    description: "Needs manual review",
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
    subtitle: "Unusual Activity",
    description: "15 transactions detected on Aug 14, 2022 exceed normal volume by 300%",
    date: "Aug 14, 2022",
    count: 15,
    metric: "+300%",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    borderColor: "border-red-200",
    accentColor: "bg-red-500",
    actionLabel: "Investigate",
  },
  {
    id: "missing-fmv",
    type: "warning",
    severity: "medium",
    icon: TrendingUp,
    title: "Missing FMV",
    subtitle: "Pricing Required",
    description: "3 transactions are missing Fair Market Value data needed for tax calculations",
    date: "Multiple dates",
    count: 3,
    metric: "Critical",
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    borderColor: "border-yellow-200",
    accentColor: "bg-yellow-500",
    actionLabel: "Fix Values",
  },
  {
    id: "classification-conflict",
    type: "info",
    severity: "low",
    icon: Users,
    title: "Rule Conflict",
    subtitle: "Classification Issue",
    description: "2 transactions have conflicting classification rules that need resolution",
    date: "Pending review",
    count: 2,
    metric: "Low Priority",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
    accentColor: "bg-blue-500",
    actionLabel: "Resolve",
  },
];

export function TransactionInsightsUnified() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* AI Classification Insights Card */}
      <section
        aria-labelledby="classification-heading"
        className="flex flex-col h-auto border rounded-lg bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-100">
              <Sparkles className="h-5 w-5 text-blue-600" aria-hidden="true" />
            </div>
            <div>
              <h3
                id="classification-heading"
                className="text-base font-semibold text-foreground leading-none mb-1"
              >
                AI Classification
              </h3>
              <p className="text-xs text-muted-foreground">
                Confidence distribution
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs font-semibold px-2.5 py-1">
            117
          </Badge>
        </div>

        {/* Classification List */}
        <div
          className="space-y-4 flex-1"
          role="list"
          aria-label="Classification levels"
        >
          {classificationData.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.level}
                className="group flex items-center gap-3"
                role="listitem"
              >
                {/* Icon and Label */}
                <div className="flex items-center gap-2 min-w-[100px]">
                  <div className={`p-1 rounded-md ${item.bgColor}`}>
                    <IconComponent
                      className={`h-4 w-4 ${item.color}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground leading-tight">
                      {item.level}
                    </span>
                    <span className="text-xs text-muted-foreground leading-tight">
                      {item.count} txns
                    </span>
                  </div>
                </div>

                {/* Progress Bar with Percentage */}
                <div className="flex-1 flex items-center gap-2 min-w-0">
                  <Progress
                    value={item.percentage}
                    className="h-2 flex-1"
                    aria-label={`${item.fullLevel}: ${item.percentage}% of transactions`}
                  />
                  <span
                    className={`text-sm font-bold tabular-nums ${item.color} min-w-[42px] text-right`}
                    aria-label={`${item.percentage} percent`}
                  >
                    {item.percentage}%
                  </span>
                </div>

                {/* Action Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${item.actionColor} h-7 px-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity`}
                  aria-label={`Review ${item.fullLevel.toLowerCase()} transactions`}
                >
                  Review
                </Button>
              </div>
            );
          })}
        </div>

        {/* Footer Summary */}
        <div className="mt-5 pt-4 border-t flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            Total Classified
          </span>
          <span className="text-sm font-bold text-foreground tabular-nums">
            117 transactions
          </span>
        </div>
      </section>

      {/* Anomaly Flags Card - Now with 1x3 Grid */}
      <section
        aria-labelledby="anomaly-heading"
        className="flex flex-col h-auto border rounded-lg bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-orange-100">
              <Flag className="h-5 w-5 text-orange-600" aria-hidden="true" />
            </div>
            <div>
              <h3
                id="anomaly-heading"
                className="text-base font-semibold text-foreground leading-none mb-1"
              >
                Anomaly Flags
              </h3>
              <p className="text-xs text-muted-foreground">
                Issues requiring attention
              </p>
            </div>
          </div>
          <Link to="/data-anomaly-detection">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground h-auto p-0 text-xs font-medium"
              aria-label="View all anomaly flags"
            >
              View All →
            </Button>
          </Link>
        </div>

        {/* 1x3 Grid of Anomaly Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1"
          role="list"
          aria-label="Transaction anomalies"
        >
          {anomalyFlags.map((flag) => {
            const IconComponent = flag.icon;
            return (
              <div
                key={flag.id}
                className={`group relative flex flex-col h-auto border-2 ${flag.borderColor} rounded-lg bg-card hover:shadow-lg transition-all`}
                role="listitem"
              >
                {/* Severity Accent Bar */}
                <div
                  className={`h-1 w-full rounded-t-md ${flag.accentColor}`}
                  aria-label={`Severity: ${flag.severity}`}
                />

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2.5 rounded-lg ${flag.iconBg} shrink-0`}>
                      <IconComponent
                        className={`h-6 w-6 ${flag.iconColor}`}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-foreground mb-0.5 leading-tight">
                        {flag.title}
                      </h4>
                      <p className="text-xs font-medium text-muted-foreground leading-tight">
                        {flag.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Metrics Display */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        Affected
                      </span>
                      <span className={`text-lg font-bold ${flag.iconColor} tabular-nums`}>
                        {flag.count}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`text-xs font-semibold ${flag.iconBg} ${flag.iconColor} border-0`}
                    >
                      {flag.metric}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">
                    {flag.description}
                  </p>

                  {/* Date Info */}
                  <div className="text-xs text-muted-foreground mb-3 pb-3 border-b">
                    <span className="font-medium">Date: </span>
                    {flag.date}
                  </div>

                  {/* Action Button */}
                  <Link to="/data-anomaly-detection" className="mt-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className={`w-full ${flag.iconColor} border-current hover:bg-current hover:text-white transition-all font-medium`}
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

        {/* Footer Summary */}
        <div className="mt-5 pt-4 border-t">
          <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border-l-4 border-orange-500">
            <div className="flex items-center gap-2">
              <AlertTriangle
                className="h-4 w-4 text-orange-600 shrink-0"
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-foreground">
                Active Issues
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
