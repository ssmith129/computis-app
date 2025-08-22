import { MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, ChartLegend } from "./pie-chart";

const txsStatusData = [
  { value: 65, color: "#0F65E5", label: "Processed" },
  { value: 20, color: "#F5D462", label: "Source" }, 
  { value: 10, color: "#F87700", label: "Archived" },
  { value: 5, color: "#F24040", label: "Ignored" },
];

const uploadStatusData = [
  { value: 80, color: "#00A624", label: "Success" },
  { value: 15, color: "#F87700", label: "Warning" },
  { value: 5, color: "#F24040", label: "Failed" },
];

export function PieChartSections() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Txs Status Chart */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Txs Status</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="h-4 w-4 text-gray-400" />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <PieChart data={txsStatusData} size={240} />
          </div>
          <ChartLegend data={txsStatusData} />
        </div>
      </Card>

      {/* Txs Upload Status Chart */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Txs Upload Status</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="h-4 w-4 text-gray-400" />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <PieChart data={uploadStatusData} size={240} />
          </div>
          <ChartLegend data={uploadStatusData} />
        </div>
      </Card>
    </div>
  );
}
