import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";

const issues = [
  {
    id: "missing-fmv",
    type: "High",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    issueType: "Missing FMV",
    description: "3 transactions missing accurate pricing data",
    affectedTransactions: "BTC",
    date: "Aug 14, 2022",
    severity: "High",
    action: "Fix Now"
  },
  {
    id: "unclassified",
    type: "Medium", 
    icon: Info,
    iconColor: "text-blue-500",
    issueType: "Unclassified Transactions",
    description: "12 transactions need classification",
    affectedTransactions: "USDC",
    date: "Multiple",
    severity: "Medium",
    action: "Classify"
  },
  {
    id: "low-confidence",
    type: "Low",
    icon: AlertCircle,
    iconColor: "text-yellow-500",
    issueType: "Low AI Confidence",
    description: "5 transactions with low AI confidence",
    affectedTransactions: "ETH",
    date: "Multiple", 
    severity: "Low",
    action: "Review"
  }
];

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case "High":
      return <Badge className="bg-red-100 text-red-800">{severity}</Badge>;
    case "Medium":
      return <Badge className="bg-yellow-100 text-yellow-800">{severity}</Badge>;
    case "Low":
      return <Badge className="bg-blue-100 text-blue-800">{severity}</Badge>;
    default:
      return <Badge variant="outline">{severity}</Badge>;
  }
};

export function IssuesTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Issues Requiring Attention</h3>
          <p className="text-sm text-muted-foreground">Review these issues before exporting</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Issue Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Affected Transactions</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue) => {
              const IconComponent = issue.icon;
              return (
                <TableRow key={issue.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <IconComponent className={`h-4 w-4 ${issue.iconColor}`} />
                      <span className="font-medium">{issue.issueType}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {issue.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono">
                        {issue.affectedTransactions}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {issue.date}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getSeverityBadge(issue.severity)}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant={issue.severity === "High" ? "default" : "outline"}
                    >
                      {issue.action}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {issues.length === 0 && (
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Issues Found</h3>
          <p className="text-sm text-muted-foreground">
            All your data is ready for export.
          </p>
        </div>
      )}
    </div>
  );
}
