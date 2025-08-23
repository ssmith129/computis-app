import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { 
  MoreHorizontal, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight,
  Check,
  X,
  AlertTriangle,
  Flag,
  Eye
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TransactionsTableProps {
  filters: {
    confidence: string;
    status: string;
  };
}

const mockTransactions = [
  {
    id: "1",
    date: "2022-06-15",
    type: "Receive",
    asset: "Bitcoin (BTC)",
    amount: "0.25 BTC",
    fmvUsd: "$5,250.00",
    aiClassification: "Income",
    confidence: 65,
    status: "Confirmed",
    icon: "₿"
  },
  {
    id: "2", 
    date: "2022-07-02",
    type: "Swap",
    asset: "Ethereum (ETH)",
    amount: "1.5 ETH",
    fmvUsd: "$2,850.00",
    aiClassification: "Trade",
    confidence: 78,
    status: "Suggested",
    icon: "Ξ"
  },
  {
    id: "3",
    date: "2022-08-14",
    type: "Send",
    asset: "Bitcoin (BTC)", 
    amount: "0.15 BTC",
    fmvUsd: "$3,750.00",
    aiClassification: "Expense",
    confidence: 45,
    status: "Flagged",
    icon: "₿"
  },
  {
    id: "4",
    date: "2022-09-05",
    type: "Receive",
    asset: "USD Coin (USDC)",
    amount: "500 USDC",
    fmvUsd: "$500.00",
    aiClassification: "Unclassified",
    confidence: 0,
    status: "Pending",
    icon: "$"
  },
  {
    id: "5",
    date: "2022-10-22",
    type: "Merge",
    asset: "Ethereum (ETH)",
    amount: "0.75 ETH",
    fmvUsd: "$1,125.00",
    aiClassification: "Transfer",
    confidence: 92,
    status: "Confirmed",
    icon: "Ξ"
  },
  {
    id: "6",
    date: "2022-11-08",
    type: "Swap",
    asset: "Bitcoin (BTC)",
    amount: "0.08 BTC",
    fmvUsd: "$1,050.00",
    aiClassification: "Trade",
    confidence: 82,
    status: "Suggested",
    icon: "₿"
  },
  {
    id: "7",
    date: "2022-12-01",
    type: "Receive",
    asset: "Solana (SOL)",
    amount: "10 SOL",
    fmvUsd: "$350.00",
    aiClassification: "Income",
    confidence: 55,
    status: "Flagged",
    icon: "◎"
  }
];

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 70) return "text-green-600";
  if (confidence >= 40) return "text-yellow-600";
  return "text-red-600";
};

const getStatusVariant = (status: string): "success" | "warning" | "error" | "pending" => {
  switch (status) {
    case "Confirmed": return "success";
    case "Suggested": return "warning";
    case "Flagged": return "error";
    case "Pending": return "pending";
    default: return "pending";
  }
};

const getClassificationBadgeColor = (classification: string) => {
  switch (classification) {
    case "Income": return "bg-green-100 text-green-800";
    case "Trade": return "bg-blue-100 text-blue-800";
    case "Expense": return "bg-red-100 text-red-800";
    case "Transfer": return "bg-purple-100 text-purple-800";
    case "Unclassified": return "bg-gray-100 text-gray-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export function TransactionsTable({ filters }: TransactionsTableProps) {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const filteredTransactions = mockTransactions.filter(transaction => {
    const confidenceMatch = filters.confidence === "All" || 
      (filters.confidence === "High" && transaction.confidence >= 70) ||
      (filters.confidence === "Medium" && transaction.confidence >= 40 && transaction.confidence < 70) ||
      (filters.confidence === "Low" && transaction.confidence < 40);
    
    const statusMatch = filters.status === "All" || transaction.status === filters.status;
    
    return confidenceMatch && statusMatch;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTransactions(displayedTransactions.map(t => t.id));
    } else {
      setSelectedTransactions([]);
    }
  };

  const handleSelectTransaction = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedTransactions(prev => [...prev, id]);
    } else {
      setSelectedTransactions(prev => prev.filter(t => t !== id));
    }
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedTransactions.length === displayedTransactions.length && displayedTransactions.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>
              <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                Date
                <ArrowUpDown className="ml-1 h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>FMV (USD)</TableHead>
            <TableHead>AI Classification</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <Checkbox
                  checked={selectedTransactions.includes(transaction.id)}
                  onCheckedChange={(checked) => handleSelectTransaction(transaction.id, !!checked)}
                />
              </TableCell>
              <TableCell className="font-medium">{transaction.date}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-orange-500">{transaction.icon}</span>
                  {transaction.asset}
                </div>
              </TableCell>
              <TableCell className="font-mono">{transaction.amount}</TableCell>
              <TableCell className="font-mono">{transaction.fmvUsd}</TableCell>
              <TableCell>
                <Badge className={getClassificationBadgeColor(transaction.aiClassification)}>
                  {transaction.aiClassification}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${getConfidenceColor(transaction.confidence)}`}>
                    {transaction.confidence}%
                  </span>
                  {transaction.confidence < 40 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge variant={getStatusVariant(transaction.status)}>
                  {transaction.status}
                </StatusBadge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Check className="mr-2 h-4 w-4" />
                      Confirm
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Flag className="mr-2 h-4 w-4" />
                      Flag
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </div>

      {/* Table Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} of {filteredTransactions.length} transactions
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Bulk Actions:</span>
          <Button variant="outline" size="sm" disabled={selectedTransactions.length === 0}>
            Accept All
          </Button>
          <Button variant="outline" size="sm" disabled={selectedTransactions.length === 0}>
            Tag
          </Button>
          <Button variant="outline" size="sm" disabled={selectedTransactions.length === 0}>
            Export
          </Button>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              );
            })}
            {totalPages > 5 && <span className="text-muted-foreground">...</span>}
            <span className="text-sm text-muted-foreground ml-2">{totalPages}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
