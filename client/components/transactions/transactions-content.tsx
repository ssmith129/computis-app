import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionsTable } from "./transactions-table";
import { ClassificationInsights } from "./classification-insights";
import { TransactionAnomalyFlags } from "./transaction-anomaly-flags";
import { Filter, Tag, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export function TransactionsContent() {
  const [activeFilters, setActiveFilters] = useState({
    confidence: "All",
    status: "All",
  });

  const confidenceFilters = ["All", "High", "Medium", "Low"];
  const statusFilters = ["All", "Confirmed", "Suggested", "Flagged"];

  return (
    <div className="flex-1 h-0 bg-background overflow-auto pt-5 px-6 pb-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header replaced by page-level header */}
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mt-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Confidence:
              </span>
              {confidenceFilters.map((filter) => (
                <Button
                  key={filter}
                  variant={
                    activeFilters.confidence === filter ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    setActiveFilters((prev) => ({
                      ...prev,
                      confidence: filter,
                    }))
                  }
                  className="h-8"
                >
                  {filter}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Status:
              </span>
              {statusFilters.map((filter) => (
                <Button
                  key={filter}
                  variant={
                    activeFilters.status === filter ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    setActiveFilters((prev) => ({ ...prev, status: filter }))
                  }
                  className="h-8"
                >
                  {filter}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                <Tag className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Bulk Tag</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">AI Classify</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Transactions Table */}
          <Card>
            <CardContent className="p-0">
              <TransactionsTable filters={activeFilters} />
            </CardContent>
          </Card>

          {/* Bottom Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Classification Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg font-semibold">
                  AI Classification Insights
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Hide Legend
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ClassificationInsights />
              </CardContent>
            </Card>

            {/* Anomaly Flags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg font-semibold">
                  Anomaly Flags
                  <Link to="/data-anomaly-detection">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      View All
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionAnomalyFlags />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
