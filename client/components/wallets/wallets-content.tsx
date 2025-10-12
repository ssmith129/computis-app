import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

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
    color: "from-orange-500 to-amber-500",
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
    color: "from-blue-500 to-cyan-500",
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
    color: "from-yellow-500 to-orange-400",
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
    color: "from-slate-500 to-gray-600",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Connected":
      return <CheckCircle className="h-3.5 w-3.5 text-green-600" />;
    case "Syncing":
      return <Clock className="h-3.5 w-3.5 text-blue-600 animate-pulse" />;
    case "Error":
      return <AlertCircle className="h-3.5 w-3.5 text-red-600" />;
    default:
      return <Clock className="h-3.5 w-3.5 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Connected":
      return "text-green-600 bg-green-50 border-green-200";
    case "Syncing":
      return "text-blue-600 bg-blue-50 border-blue-200";
    case "Error":
      return "text-red-600 bg-red-50 border-red-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

function WalletCard({ wallet }: { wallet: typeof mockWallets[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer border border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => toast({ title: `Opening ${wallet.name}` })}
    >
      {/* Gradient Background Accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${wallet.color} transition-all duration-300 ${isHovered ? "h-2" : "h-1"}`}
      />

      <CardContent className="p-4">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="text-xl leading-none">{wallet.icon}</div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm text-gray-900 truncate">
                {wallet.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-gray-500">{wallet.type}</span>
                <span className="text-xs text-gray-300">•</span>
                <span className="text-xs font-mono text-gray-500 truncate">
                  {wallet.address}
                </span>
              </div>
            </div>
          </div>
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium transition-all ${getStatusColor(wallet.status)}`}
          >
            {getStatusIcon(wallet.status)}
            <span className="hidden sm:inline">{wallet.status}</span>
          </div>
        </div>

        {/* Stats Section - Progressive Disclosure */}
        <div
          className={`grid grid-cols-2 gap-3 overflow-hidden transition-all duration-300 ${isHovered ? "max-h-20 opacity-100 mb-3" : "max-h-0 opacity-0 mb-0"}`}
        >
          <div className="bg-gray-50 rounded-lg px-2.5 py-2">
            <p className="text-xs text-gray-500">Transactions</p>
            <p className="text-sm font-semibold text-gray-900">
              {wallet.transactions}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg px-2.5 py-2">
            <p className="text-xs text-gray-500">Last Sync</p>
            <p className="text-sm font-semibold text-gray-900">
              {wallet.lastSync}
            </p>
          </div>
        </div>

        {/* Action Section */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-gray-600 hover:text-gray-900 px-2 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              toast({ title: `Syncing ${wallet.name}` });
            }}
          >
            {wallet.status === "Syncing" ? "Cancel Sync" : "Sync Now"}
          </Button>
          <ChevronRight
            className={`h-4 w-4 text-gray-400 transition-all duration-300 ${isHovered ? "translate-x-1 text-gray-600" : ""}`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function WalletsContent() {
  return (
    <div className="app-content">
      <div className="page-titlebar">
        <div className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">
              Wallets and Exchanges
            </h1>
            <p className="text-gray-500 mt-1">
              Connect and manage your crypto wallets and exchange accounts
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild>
              <Link to="/wallet-ingestion">
                <Plus className="h-4 w-4 mr-2" />
                Add Wallet
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/wallet-ingestion">
                <Plus className="h-4 w-4 mr-2" />
                Add Exchange
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">4</div>
              <p className="text-sm text-gray-500">Connected Sources</p>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">521</div>
              <p className="text-sm text-gray-500">Total Transactions</p>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">3</div>
              <p className="text-sm text-gray-500">Active Syncing</p>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">1h</div>
              <p className="text-sm text-gray-500">Last Sync</p>
            </CardContent>
          </Card>
        </div>

        {/* Wallets and Exchanges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockWallets.map((wallet) => (
            <WalletCard key={wallet.id} wallet={wallet} />
          ))}

          {/* Add New Card */}
          <Link to="/wallet-ingestion" className="group">
            <Card className="h-full border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-md bg-gray-50/50 hover:bg-gray-50">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full min-h-[140px]">
                <div className="bg-white rounded-full p-3 mb-3 shadow-sm group-hover:shadow transition-shadow">
                  <Plus className="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">
                  Add New Connection
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  Connect wallet or exchange
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs border-gray-300 hover:border-gray-400"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-base text-gray-900 mb-4">
              Recent Sync Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-green-50 rounded-full p-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Coinbase Pro sync completed
                    </p>
                    <p className="text-xs text-gray-500">
                      15 new transactions imported
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">1 hour ago</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 rounded-full p-1.5">
                    <Clock className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Binance sync in progress
                    </p>
                    <p className="text-xs text-gray-500">
                      Fetching recent transactions...
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="bg-green-50 rounded-full p-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      MetaMask wallet connected
                    </p>
                    <p className="text-xs text-gray-500">
                      42 transactions imported
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">3 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
