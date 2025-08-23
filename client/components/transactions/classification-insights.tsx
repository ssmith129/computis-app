import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

const classificationData = [
  {
    level: "High Confidence",
    count: 61,
    percentage: 55,
    description: "These transactions match known patterns with high confidence.",
    color: "text-green-600",
    bgColor: "bg-green-100",
    icon: CheckCircle,
    progressColor: "bg-green-500"
  },
  {
    level: "Medium Confidence", 
    count: 42,
    percentage: 34,
    description: "These transactions have somewhat reliable AI classifications.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100", 
    icon: AlertCircle,
    progressColor: "bg-yellow-500"
  },
  {
    level: "Low Confidence",
    count: 14,
    percentage: 11,
    description: "These transactions need manual review due to uncertain patterns.",
    color: "text-red-600",
    bgColor: "bg-red-100",
    icon: XCircle,
    progressColor: "bg-red-500"
  }
];

export function ClassificationInsights() {
  return (
    <div className="space-y-6">
      {/* All Confidence Levels Overview */}
      <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="font-medium">All Confidence Levels</span>
        </div>
        <div className="text-right">
          <div className="font-semibold text-lg">117 transactions</div>
          <div className="text-sm text-muted-foreground">100%</div>
        </div>
      </div>

      {/* Individual Confidence Levels */}
      <div className="space-y-4">
        {classificationData.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.level} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <IconComponent className={`h-5 w-5 ${item.color}`} />
                  <div>
                    <div className="font-medium">{item.level}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.count} transactions ({item.percentage}%)
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Accept All
                  </Button>
                  <Button variant="ghost" size="sm">
                    Review All
                  </Button>
                </div>
              </div>
              
              <div className="pl-8 space-y-2">
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
                <div className="relative">
                  <Progress 
                    value={item.percentage} 
                    className="h-2"
                  />
                  <style jsx>{`
                    .progress-indicator {
                      background-color: ${item.progressColor.replace('bg-', '')};
                    }
                  `}</style>
                </div>
              </div>
              
              <div className="flex gap-2 pl-8">
                <Button variant="outline" size="sm">
                  Investigate
                </Button>
                <Button variant="outline" size="sm">
                  Fix Values
                </Button>
                <Button variant="outline" size="sm">
                  Dismiss
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="pt-4 border-t">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Average Confidence:</span>
            <span className="ml-2 font-medium">67%</span>
          </div>
          <div>
            <span className="text-muted-foreground">Needs Review:</span>
            <span className="ml-2 font-medium text-red-600">14 transactions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
