import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnomalyOverviewCards } from "./anomaly-overview-cards";
import { AnomalyIssuesTable } from "./anomaly-issues-table";
import { AnomalyIssueDetails } from "./anomaly-issue-details";
import { Filter, Settings, CheckCircle } from "lucide-react";

export function DataAnomalyDetectionContent() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [viewFilter, setViewFilter] = useState("All Issues");
  const [priorityFilter, setPriorityFilter] = useState("High Priority");
  const [statusFilter, setStatusFilter] = useState("Resolved");
  const [timePeriod, setTimePeriod] = useState("This Week");

  if (selectedIssue) {
    return <AnomalyIssueDetails issueId={selectedIssue} onClose={() => setSelectedIssue(null)} />;
  }

  return (
    <div className="flex-1 h-0 bg-background overflow-auto">
      {/* Header */}
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">Data Anomaly Detection</h1>
            <p className="text-muted-foreground">Insights on detected issues requiring your attention</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Alert Settings
            </Button>
            <Button size="sm" className="bg-[#0B5DEA] hover:bg-[#0B5DEA]/90 text-white">
              <CheckCircle className="h-4 w-4 mr-2" />
              Resolve All
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 pb-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">View:</span>
              <div className="flex gap-1">
                {["All Issues", "High Priority", "Resolved", "Time Period", "This Week", "This Month", "All Time"].map((filter) => (
                  <Button
                    key={filter}
                    variant={viewFilter === filter ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewFilter(filter)}
                    className="h-8 text-xs"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="link" size="sm" className="h-8 text-xs text-blue-600 hover:text-blue-700 p-0">
                View Audit Trail
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Overview Cards */}
        <AnomalyOverviewCards />

        {/* Issues Table */}
        <Card>
          <CardContent className="p-0">
            <AnomalyIssuesTable onSelectIssue={setSelectedIssue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
