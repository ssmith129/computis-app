import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Plus,
  Wallet,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

const mockWallets = [
  {
    id: "1",
    name: "MetaMask Wallet",
    type: "Wallet",
    address: "0x742d...4b82",
    status: "Connected",
    transactions: 156,
    lastSync: "2 hours ago",
    icon: "🦊",
  },
  {
    id: "2",
    name: "Coinbase Pro",
    type: "Exchange",
    address: "coinbase-pro",
    status: "Connected",
    transactions: 89,
    lastSync: "1 hour ago",
    icon: "🔷",
  },
  {
    id: "3",
    name: "Binance",
    type: "Exchange",
    address: "binance-main",
    status: "Syncing",
    transactions: 234,
    lastSync: "Syncing...",
    icon: "🟡",
  },
  {
    id: "4",
    name: "Hardware Wallet",
    type: "Wallet",
    address: "bc1q...7x8k",
    status: "Connected",
    transactions: 42,
    lastSync: "3 hours ago",
    icon: "🔒",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Connected":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "Syncing":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "Error":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Connected":
      return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
    case "Syncing":
      return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>;
    case "Error":
      return <Badge className="bg-red-100 text-red-800">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function WalletsContent() {
  return (
    <div className="flex-1 h-0 bg-background overflow-auto p-7">
      <div className="space-y-6">

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">4</div>
              <p className="text-sm text-muted-foreground">Connected Sources</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">521</div>
              <p className="text-sm text-muted-foreground">
                Total Transactions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">3</div>
              <p className="text-sm text-muted-foreground">Active Syncing</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">1h</div>
              <p className="text-sm text-muted-foreground">Last Sync</p>
            </CardContent>
          </Card>
        </div>

        {/* Wallets and Exchanges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockWallets.map((wallet) => (
            <Card key={wallet.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{wallet.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{wallet.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {wallet.type}
                      </Badge>
                    </div>
                  </div>
                  {getStatusIcon(wallet.status)}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Address */}
                <div>
                  <p className="text-sm text-muted-foreground">
                    Address/Account
                  </p>
                  <p className="font-mono text-sm">{wallet.address}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Transactions</p>
                    <p className="font-semibold">{wallet.transactions}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Sync</p>
                    <p className="font-semibold">{wallet.lastSync}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  {getStatusBadge(wallet.status)}
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Card */}
          <Link to="/wallet-ingestion">
            <Card className="border-dashed border-2 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-muted rounded-full p-4 mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Add New Connection</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect a wallet or exchange to import transactions
                </p>
                <Button variant="outline" size="sm">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sync Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-muted">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="font-medium">Coinbase Pro sync completed</p>
                    <p className="text-sm text-muted-foreground">
                      15 new transactions imported
                    </p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  1 hour ago
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-muted">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="font-medium">Binance sync in progress</p>
                    <p className="text-sm text-muted-foreground">
                      Fetching recent transactions...
                    </p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  2 hours ago
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="font-medium">MetaMask wallet connected</p>
                    <p className="text-sm text-muted-foreground">
                      42 transactions imported
                    </p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  3 hours ago
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
