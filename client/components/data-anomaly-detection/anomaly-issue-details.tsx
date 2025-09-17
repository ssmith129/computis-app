import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, ArrowLeft, ExternalLink, Download, Plus, RotateCcw } from "lucide-react";

interface AnomalyIssueDetailsProps {
  issueId: string;
  onClose: () => void;
}

const issueData = {
  type: "Volume Spike",
  detected: "Oct 25, 2023",
  priority: "High",
  status: "Open",
  asset: "Bitcoin (BTC)",
  affected: "15 transactions",
  description: "This appears to be a legitimate set of transactions based on historical patterns for this wallet.",
  suggestion: "Mark as resolved after confirming with client.",
  confidence: "85%"
};

const affectedTransactions = [
  {
    date: "2022-08-14 09:15",
    type: "Receive",
    amount: "0.15 BTC",
    fmv: "$3,750.00",
    classification: "Income",
    actions: true
  },
  {
    date: "2022-08-14 09:22", 
    type: "Receive",
    amount: "0.25 BTC",
    fmv: "$6,250.00",
    classification: "Income", 
    actions: true
  },
  {
    date: "2022-08-14 10:05",
    type: "Receive", 
    amount: "0.10 BTC",
    fmv: "$2,500.00",
    classification: "Income",
    actions: true
  }
];

const quickActions = [
  {
    title: "Bulk Classify",
    description: "Apply classification to all transactions", 
    icon: Plus,
    color: "text-green-600"
  },
  {
    title: "Create Rule",
    description: "Make rules to avoid in the future",
    icon: Plus,
    color: "text-blue-600"
  },
  {
    title: "Update FMV",
    description: "Fix proposed w/ calculations",
    icon: RotateCcw,
    color: "text-yellow-600"
  },
  {
    title: "Export",
    description: "Download as CSV or PDF",
    icon: Download,
    color: "text-purple-600"
  }
];

export function AnomalyIssueDetails({ issueId, onClose }: AnomalyIssueDetailsProps) {
  return (
    <div className="flex-1 h-0 bg-background overflow-auto">
      {/* Header */}
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-red-500" />
                Volume Spike Details
              </h1>
              <p className="text-muted-foreground">Issue Information and Affected Transactions</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={onClose}>
            ✕ Close
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Issue Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Issue Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Type</div>
                  <div className="font-medium">{issueData.type}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground">Detected</div>
                  <div className="font-medium">{issueData.detected}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground">Priority</div>
                  <Badge variant="secondary" className="bg-red-100 text-red-700 border-0">
                    {issueData.priority}
                  </Badge>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-0">
                    {issueData.status}
                  </Badge>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground">Affected</div>
                  <div className="font-medium">{issueData.affected}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground">Asset</div>
                  <div className="font-medium">{issueData.asset}</div>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Recommendation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Analysis:</div>
                  <p className="text-sm mt-1">{issueData.description}</p>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Suggested Action:</div>
                  <p className="text-sm mt-1">{issueData.suggestion}</p>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Confidence:</div>
                  <div className="font-medium">{issueData.confidence}</div>
                </div>
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                  Apply AI Recommendation
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                      <IconComponent className={`h-4 w-4 ${action.color}`} />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{action.title}</div>
                        <div className="text-xs text-muted-foreground">{action.description}</div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Affected Transactions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Affected Transactions</CardTitle>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Export List
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>FMV (USD)</TableHead>
                      <TableHead>Classification</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {affectedTransactions.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {transaction.date}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-0">
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {transaction.amount}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 border-0">
                            {transaction.fmv}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-0">
                            {transaction.classification}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Showing 3 of 15 transactions
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <div className="flex gap-1">
                      <Button variant="default" size="sm" className="h-8 w-8 p-0">1</Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">2</Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">3</Button>
                      <span className="flex items-center px-2">...</span>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">5</Button>
                    </div>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-6">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Mark as Resolved
          </Button>
          <Button variant="outline">
            Ignore Issue
          </Button>
        </div>
      </div>
    </div>
  );
}
