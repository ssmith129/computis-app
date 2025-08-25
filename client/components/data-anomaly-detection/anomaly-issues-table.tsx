import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Copy,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AnomalyIssuesTableProps {
  onSelectIssue: (issueId: string) => void;
}

const issues = [
  {
    id: "volume-spike-1",
    type: "Volume Spike",
    icon: TrendingUp,
    iconColor: "text-red-500",
    description: "450% increase in Bitcoin transactions on Aug 14, 2022",
    dateDetected: "Oct 25, 2023",
    affectedTransactions: 15,
    priority: "High",
    priorityColor: "bg-red-100 text-red-700",
    status: "Open",
    statusColor: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "missing-fmv-1",
    type: "Missing FMV",
    icon: DollarSign,
    iconColor: "text-yellow-500",
    description: "Multiple Ethereum transactions missing accurate price data",
    dateDetected: "Oct 24, 2023",
    affectedTransactions: 7,
    priority: "Medium",
    priorityColor: "bg-yellow-100 text-yellow-700",
    status: "In Progress",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "classification-conflict-1",
    type: "Classification Conflict",
    icon: AlertTriangle,
    iconColor: "text-blue-500",
    description: "Income vs. Transfer rule conflict for Coinbase transactions",
    dateDetected: "Oct 23, 2023",
    affectedTransactions: 3,
    priority: "High",
    priorityColor: "bg-red-100 text-red-700",
    status: "Open",
    statusColor: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "potential-duplicate-1",
    type: "Potential Duplicate",
    icon: Copy,
    iconColor: "text-purple-500",
    description: "Same amount BTC transactions within 30 seconds",
    dateDetected: "Oct 22, 2023",
    affectedTransactions: 2,
    priority: "Medium",
    priorityColor: "bg-yellow-100 text-yellow-700",
    status: "Resolved",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: "volume-spike-2",
    type: "Volume Spike",
    icon: TrendingUp,
    iconColor: "text-red-500",
    description: "Unusual USDC transaction pattern on Oct 20, 2023",
    dateDetected: "Oct 21, 2023",
    affectedTransactions: 5,
    priority: "Low",
    priorityColor: "bg-blue-100 text-blue-700",
    status: "Open",
    statusColor: "bg-yellow-100 text-yellow-700",
  },
];

export function AnomalyIssuesTable({ onSelectIssue }: AnomalyIssuesTableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectRow = (issueId: string) => {
    setSelectedRows((prev) =>
      prev.includes(issueId)
        ? prev.filter((id) => id !== issueId)
        : [...prev, issueId],
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === issues.length
        ? []
        : issues.map((issue) => issue.id),
    );
  };

  return (
    <div className="space-y-4">
      {/* Table Header with Search */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Detected Issues</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Search Issues...
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.length === issues.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Issue Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date Detected</TableHead>
              <TableHead>Affected Transactions</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue) => {
              const IconComponent = issue.icon;
              return (
                <TableRow key={issue.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(issue.id)}
                      onCheckedChange={() => handleSelectRow(issue.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <IconComponent className={`h-4 w-4 ${issue.iconColor}`} />
                      <span className="font-medium">{issue.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate">{issue.description}</div>
                  </TableCell>
                  <TableCell>{issue.dateDetected}</TableCell>
                  <TableCell>{issue.affectedTransactions}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`${issue.priorityColor} border-0`}
                    >
                      {issue.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`${issue.statusColor} border-0`}
                    >
                      {issue.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSelectIssue(issue.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => onSelectIssue(issue.id)}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                          <DropdownMenuItem>Ignore Issue</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 pb-4">
        <div className="text-sm text-muted-foreground">
          Showing 1-5 of 25 issues
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <div className="flex gap-1">
            <Button variant="default" size="sm" className="h-8 w-8 p-0">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
            <span className="flex items-center px-2">...</span>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              6
            </Button>
          </div>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
