import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, XCircle, FileText, RefreshCw } from "lucide-react";

interface ValidationStepProps {
  fileName: string;
  onNext: () => void;
  onReprocess: () => void;
}

const validationChecks = [
  {
    id: "file-format",
    title: "File Format Validation",
    status: "Passed",
    value: 100,
    color: "text-green-600",
    icon: CheckCircle,
    description: "CSV format is valid and readable"
  },
  {
    id: "data-structure",
    title: "Data Structure Check",
    status: "Warning", 
    value: 85,
    color: "text-yellow-600",
    icon: AlertTriangle,
    description: "3 rows have formatting issues"
  },
  {
    id: "required-fields",
    title: "Required Fields",
    status: "Passed",
    value: 100,
    color: "text-green-600", 
    icon: CheckCircle,
    description: "All required columns present"
  },
  {
    id: "data-quality",
    title: "Data Quality Assessment",
    status: "Passed",
    value: 95,
    color: "text-green-600",
    icon: CheckCircle,
    description: "High quality transaction data detected"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Passed":
      return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
    case "Warning":
      return <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>;
    case "Failed":
      return <Badge className="bg-red-100 text-red-800">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function ValidationStep({ fileName, onNext, onReprocess }: ValidationStepProps) {
  const hasWarnings = validationChecks.some(check => check.status === "Warning");
  const hasFailed = validationChecks.some(check => check.status === "Failed");
  
  return (
    <div className="space-y-6">
      {/* File Info Header */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <div>
            <h3 className="font-medium">{fileName}</h3>
            <p className="text-sm text-muted-foreground">1,247 transactions • 85.4 KB</p>
          </div>
        </div>
      </div>

      {/* Validation Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">Validation Results</h3>
          <div className="flex items-center gap-2">
            {!hasFailed && !hasWarnings && <CheckCircle className="h-4 w-4 text-green-500" />}
            {hasWarnings && !hasFailed && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
            {hasFailed && <XCircle className="h-4 w-4 text-red-500" />}
            <p className="text-sm text-muted-foreground">
              {hasFailed ? "Validation failed - please fix errors" :
               hasWarnings ? "Validation passed with warnings" :
               "All validation checks passed"}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onReprocess}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Reprocess
        </Button>
      </div>

      {/* Validation Checks */}
      <div className="space-y-6">
        {validationChecks.map((check) => {
          const IconComponent = check.icon;
          return (
            <div key={check.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconComponent className={`h-4 w-4 ${check.color}`} />
                  <span className="font-medium text-sm">{check.title}</span>
                </div>
                {getStatusBadge(check.status)}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{check.description}</span>
                  <span className="font-medium">{check.value}%</span>
                </div>
                <div className="relative">
                  <Progress value={check.value} className="h-2" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary and Actions */}
      <div className="pt-4 border-t space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall Status:</span>
          <div className="flex items-center gap-2">
            {!hasFailed && <CheckCircle className="h-4 w-4 text-green-500" />}
            {hasFailed && <XCircle className="h-4 w-4 text-red-500" />}
            <span className={`font-medium ${hasFailed ? 'text-red-600' : 'text-green-600'}`}>
              {hasFailed ? "Validation Failed" : "Ready for Schema Mapping"}
            </span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={onNext} 
            disabled={hasFailed}
            className="flex-1"
          >
            Continue to Schema Mapping
          </Button>
          {hasWarnings && (
            <Button variant="outline" onClick={onNext}>
              Continue with Warnings
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
