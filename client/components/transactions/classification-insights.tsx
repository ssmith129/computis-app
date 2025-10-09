import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

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

export function ClassificationInsights() {
  return (
    <div className="space-y-3">
      {classificationData.map((item) => {
        const IconComponent = item.icon;
        return (
          <div key={item.level} className="flex items-center gap-4 py-2">
            {/* Icon and Label */}
            <div className="flex items-center gap-2 min-w-[140px]">
              <IconComponent className={`h-4 w-4 ${item.color}`} />
              <span className="text-sm font-medium">{item.level}</span>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 min-w-[120px]">
              <Progress value={item.percentage} className="h-2" />
            </div>

            {/* Count and Percentage */}
            <div className="text-sm text-muted-foreground min-w-[100px] text-right">
              {item.count} ({item.percentage}%)
            </div>

            {/* Primary Action */}
            <Button
              variant="link"
              className={`${item.actionColor} p-0 h-auto text-sm`}
            >
              Review
            </Button>
          </div>
        );
      })}

      {/* Summary Row */}
      <div className="flex items-center justify-between pt-2 border-t">
        <span className="text-sm text-muted-foreground">
          Total Classifications
        </span>
        <span className="text-sm font-medium">117 transactions</span>
      </div>
    </div>
  );
}
