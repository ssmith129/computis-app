import { FileText, Eye, Download, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";

interface Upload {
  fileName: string;
  exchange: string;
  uploaded: string;
  status: "success" | "warning" | "error";
  statusText: string;
  transactions: number;
}

const uploadsData: Upload[] = [
  {
    fileName: "coinbase_transactions_2022.csv",
    exchange: "Coinbase", 
    uploaded: "2023-10-24",
    status: "success",
    statusText: "Imported",
    transactions: 124,
  },
  {
    fileName: "binance_export_q3.csv",
    exchange: "Binance",
    uploaded: "2023-10-15", 
    status: "warning",
    statusText: "Mapping Required",
    transactions: 87,
  },
  {
    fileName: "kraken_history_2022.csv",
    exchange: "Kraken",
    uploaded: "2023-09-30",
    status: "error", 
    statusText: "Validation Failed",
    transactions: 63,
  },
];

export function RecentUploads() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900">Recent Uploads</h2>
      
      <Card className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              <TableHead className="text-gray-500 font-medium">File Name</TableHead>
              <TableHead className="text-gray-500 font-medium">Exchange/Wallet</TableHead>
              <TableHead className="text-gray-500 font-medium">Uploaded</TableHead>
              <TableHead className="text-gray-500 font-medium">Status</TableHead>
              <TableHead className="text-gray-500 font-medium">Transactions</TableHead>
              <TableHead className="text-gray-500 font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {uploadsData.map((upload, index) => (
              <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{upload.fileName}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <span className="text-gray-900">{upload.exchange}</span>
                </TableCell>
                <TableCell className="py-3">
                  <span className="text-gray-900">{upload.uploaded}</span>
                </TableCell>
                <TableCell className="py-3">
                  <StatusBadge variant={upload.status}>
                    {upload.statusText}
                  </StatusBadge>
                </TableCell>
                <TableCell className="py-3">
                  <span className="text-gray-900">{upload.transactions}</span>
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4 text-gray-400" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4 text-gray-400" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4 text-gray-400" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
