import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, AlertTriangle, Copy } from "lucide-react";

const anomalyTypes = [
  {
    id: "data-spikes",
    title: "Data Spikes",
    description: "Unusual transaction volume patterns detected",
    count: 8,
    status: "25 since last week",
    statusColor: "bg-red-100 text-red-700",
    iconColor: "text-red-500",
    icon: TrendingUp,
    borderColor: "border-red-200"
  },
  {
    id: "missing-fmv", 
    title: "Missing FMV",
    description: "Transactions with missing price data",
    count: 2,
    status: "2 since last week", 
    statusColor: "bg-green-100 text-green-700",
    iconColor: "text-green-500",
    icon: DollarSign,
    borderColor: "border-green-200"
  },
  {
    id: "classification-conflicts",
    title: "Classification Conflicts", 
    description: "Multiple rules affecting same transactions",
    count: 12,
    status: "5 since last week",
    statusColor: "bg-yellow-100 text-yellow-700", 
    iconColor: "text-yellow-500",
    icon: AlertTriangle,
    borderColor: "border-yellow-200"
  },
  {
    id: "potential-duplicates",
    title: "Potential Duplicates",
    description: "Transactions that may be duplicated",
    count: 5,
    status: "3 since last week",
    statusColor: "bg-purple-100 text-purple-700",
    iconColor: "text-purple-500", 
    icon: Copy,
    borderColor: "border-purple-200"
  }
];

export function AnomalyOverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {anomalyTypes.map((anomaly) => {
        const IconComponent = anomaly.icon;
        return (
          <Card key={anomaly.id} className={`${anomaly.borderColor} hover:shadow-lg transition-shadow cursor-pointer`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-background border ${anomaly.borderColor}`}>
                    <IconComponent className={`h-5 w-5 ${anomaly.iconColor}`} />
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    {anomaly.count}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{anomaly.title}</h3>
                <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                <Badge variant="secondary" className={`text-xs ${anomaly.statusColor} border-0`}>
                  {anomaly.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
