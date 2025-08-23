import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";

const validationItems = [
  {
    id: "transaction-classification",
    title: "Transaction Classification",
    status: "Passed",
    value: 100,
    color: "text-green-600",
    bgColor: "bg-green-500",
    icon: CheckCircle,
    description: "All classifications validated"
  },
  {
    id: "fmv-accuracy", 
    title: "FMV Data Accuracy",
    status: "Warning",
    value: 85,
    color: "text-yellow-600",
    bgColor: "bg-yellow-500",
    icon: AlertTriangle,
    description: "Some pricing data missing"
  },
  {
    id: "ai-confidence",
    title: "AI Classification Confidence", 
    status: "Passed",
    value: 92,
    color: "text-green-600",
    bgColor: "bg-green-500",
    icon: CheckCircle,
    description: "High confidence scores"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Passed":
      return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
    case "Warning":
      return <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>;
    case "Error":
      return <Badge className="bg-red-100 text-red-800">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function DataValidation() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">Data Validation</h3>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <p className="text-sm text-muted-foreground">Your data has been validated for export</p>
          </div>
        </div>
      </div>

      {/* Validation Items */}
      <div className="space-y-6">
        {validationItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconComponent className={`h-4 w-4 ${item.color}`} />
                  <span className="font-medium text-sm">{item.title}</span>
                </div>
                {getStatusBadge(item.status)}
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.description}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
                <div className="relative">
                  <Progress value={item.value} className="h-2" />
                  <style jsx>{`
                    .progress-fill {
                      background-color: ${item.bgColor.replace('bg-', '')};
                    }
                  `}</style>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="pt-4 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall Status:</span>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="font-medium text-green-600">Ready for Export</span>
          </div>
        </div>
      </div>
    </div>
  );
}
