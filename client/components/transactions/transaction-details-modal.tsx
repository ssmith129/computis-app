import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Transaction {
  id: string;
  date: string;
  type: string;
  asset: string;
  amount: string;
  fmvUsd: string;
  aiClassification: string;
  confidence: number;
  status: string;
  icon: string;
}

interface TransactionDetailsModalProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 70) return "text-green-600";
  if (confidence >= 40) return "text-yellow-600";
  return "text-red-600";
};

const getStatusVariant = (
  status: string,
): "success" | "warning" | "error" | "pending" => {
  switch (status) {
    case "Confirmed":
      return "success";
    case "Suggested":
      return "warning";
    case "Flagged":
      return "error";
    case "Pending":
      return "pending";
    default:
      return "pending";
  }
};

const getClassificationBadgeColor = (classification: string) => {
  switch (classification) {
    case "Income":
      return "bg-green-100 text-green-800 border-green-200";
    case "Trade":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Expense":
      return "bg-red-100 text-red-800 border-red-200";
    case "Transfer":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Unclassified":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getTransactionTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "receive":
      return <ArrowDownLeft className="h-5 w-5 text-green-600" />;
    case "send":
      return <ArrowUpRight className="h-5 w-5 text-red-600" />;
    case "swap":
    case "merge":
      return <RefreshCw className="h-5 w-5 text-blue-600" />;
    default:
      return <RefreshCw className="h-5 w-5 text-gray-600" />;
  }
};

const isDebit = (type: string) => {
  return type.toLowerCase() === "send";
};

export function TransactionDetailsModal({
  transaction,
  open,
  onOpenChange,
}: TransactionDetailsModalProps) {
  if (!transaction) return null;

  const txIsDebit = isDebit(transaction.type);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        aria-describedby="transaction-details-description"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {getTransactionTypeIcon(transaction.type)}
            <span>Transaction Details</span>
          </DialogTitle>
        </DialogHeader>

        <div id="transaction-details-description" className="sr-only">
          Detailed information about transaction {transaction.id} including
          classification, amount, and status
        </div>

        <div className="space-y-6 py-4">
          {/* Transaction Summary Card */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Transaction ID
                </p>
                <p className="font-mono text-sm font-medium">
                  {transaction.id}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date</p>
                <p className="font-medium">{transaction.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Type</p>
                <div className="flex items-center gap-2">
                  {getTransactionTypeIcon(transaction.type)}
                  <p className="font-medium">{transaction.type}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <StatusBadge variant={getStatusVariant(transaction.status)}>
                  {transaction.status}
                </StatusBadge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Asset & Amount Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Asset Information</h3>
            <div className="space-y-4">
              <div className="flex items-start justify-between p-4 rounded-lg border bg-card">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Asset</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-2xl text-orange-500">
                      {transaction.icon}
                    </span>
                    <span className="font-semibold text-lg">
                      {transaction.asset}
                    </span>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p
                    className={cn(
                      "font-mono text-lg font-bold",
                      txIsDebit ? "text-red-600" : "text-green-600",
                    )}
                  >
                    {txIsDebit ? "-" : "+"} {transaction.amount}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-card">
                  <p className="text-sm text-muted-foreground mb-1">
                    Fair Market Value (USD)
                  </p>
                  <p
                    className={cn(
                      "font-mono text-xl font-bold",
                      txIsDebit ? "text-red-600" : "text-green-600",
                    )}
                  >
                    {txIsDebit ? "-" : "+"} {transaction.fmvUsd}
                  </p>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <p className="text-sm text-muted-foreground mb-1">
                    Transaction Hash
                  </p>
                  <p className="font-mono text-xs text-muted-foreground break-all">
                    0x{transaction.id}abc...def{transaction.id}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* AI Classification */}
          <div>
            <h3 className="text-lg font-semibold mb-4">AI Classification</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Classification
                  </p>
                  <Badge
                    className={cn(
                      "text-sm px-3 py-1 border",
                      getClassificationBadgeColor(transaction.aiClassification),
                    )}
                  >
                    {transaction.aiClassification}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-2">
                    Confidence Score
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-2xl font-bold",
                        getConfidenceColor(transaction.confidence),
                      )}
                    >
                      {transaction.confidence}%
                    </span>
                    {transaction.confidence < 40 && (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Confidence Indicator Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      transaction.confidence >= 70
                        ? "bg-green-600"
                        : transaction.confidence >= 40
                          ? "bg-yellow-600"
                          : "bg-red-600",
                    )}
                    style={{ width: `${transaction.confidence}%` }}
                    role="progressbar"
                    aria-valuenow={transaction.confidence}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Confidence score: ${transaction.confidence}%`}
                  />
                </div>
              </div>

              {transaction.confidence < 70 && (
                <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <div className="flex gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">
                        {transaction.confidence < 40
                          ? "Low Confidence Detection"
                          : "Medium Confidence Detection"}
                      </p>
                      <p className="text-xs text-yellow-700 mt-1">
                        This transaction may require manual review to ensure
                        accurate classification.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Additional Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Network</span>
                <span className="font-medium">
                  {transaction.asset.includes("BTC")
                    ? "Bitcoin"
                    : transaction.asset.includes("ETH")
                      ? "Ethereum"
                      : transaction.asset.includes("SOL")
                        ? "Solana"
                        : "ERC-20"}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Gas Fee</span>
                <span className="font-medium font-mono">$2.45</span>
              </div>
              <Separator />
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Block Number</span>
                <span className="font-medium font-mono">
                  {15000000 + parseInt(transaction.id) * 1000}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Confirmations</span>
                <span className="font-medium">12,543</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
