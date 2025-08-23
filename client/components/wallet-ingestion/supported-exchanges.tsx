import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

const exchanges = [
  {
    name: "Coinbase",
    icon: "🪙",
    color: "text-orange-500"
  },
  {
    name: "Binance", 
    icon: "🏛️",
    color: "text-blue-500"
  },
  {
    name: "Kraken",
    icon: "💳",
    color: "text-green-500"
  },
  {
    name: "Metamask",
    icon: "🦊",
    color: "text-purple-500"
  },
  {
    name: "More",
    icon: <Plus className="w-6 h-6 text-muted-foreground" />,
    color: "text-muted-foreground"
  }
];

export function SupportedExchanges() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-foreground">Supported Exchanges & Wallets</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {exchanges.map((exchange) => (
          <Card key={exchange.name} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center space-y-2">
              <div className="flex justify-center">
                {typeof exchange.icon === "string" ? (
                  <span className="text-2xl">{exchange.icon}</span>
                ) : (
                  exchange.icon
                )}
              </div>
              <p className={`text-sm font-medium ${exchange.color}`}>
                {exchange.name}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
