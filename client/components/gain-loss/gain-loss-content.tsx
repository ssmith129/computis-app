import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Download, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Calendar,
  Filter,
  BarChart3,
  PieChart,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Equal
} from "lucide-react";

const gainLossData = [
  {
    asset: "Bitcoin",
    symbol: "BTC",
    shortTermGain: 12500.00,
    shortTermLoss: -3200.00,
    longTermGain: 25000.00,
    longTermLoss: -1800.00,
    totalGain: 32300.00,
    transactions: 45,
    avgHoldingPeriod: "8 months"
  },
  {
    asset: "Ethereum", 
    symbol: "ETH",
    shortTermGain: 8900.00,
    shortTermLoss: -2100.00,
    longTermGain: 18500.00,
    longTermLoss: -950.00,
    totalGain: 24350.00,
    transactions: 32,
    avgHoldingPeriod: "6 months"
  },
  {
    asset: "Cardano",
    symbol: "ADA", 
    shortTermGain: 1200.00,
    shortTermLoss: -4500.00,
    longTermGain: 2800.00,
    longTermLoss: -1200.00,
    totalGain: -1700.00,
    transactions: 18,
    avgHoldingPeriod: "4 months"
  },
  {
    asset: "Solana",
    symbol: "SOL",
    shortTermGain: 5600.00,
    shortTermLoss: -1200.00,
    longTermGain: 7800.00,
    longTermLoss: -800.00,
    totalGain: 11400.00,
    transactions: 24,
    avgHoldingPeriod: "5 months"
  }
];

const monthlyData = [
  { month: "Jan 2023", gains: 8500, losses: -2100, net: 6400 },
  { month: "Feb 2023", gains: 12200, losses: -3800, net: 8400 },
  { month: "Mar 2023", gains: 15600, losses: -1200, net: 14400 },
  { month: "Apr 2023", gains: 9800, losses: -5600, net: 4200 },
  { month: "May 2023", gains: 18200, losses: -2800, net: 15400 },
  { month: "Jun 2023", gains: 22100, losses: -4200, net: 17900 }
];

const getGainLossColor = (amount: number) => {
  if (amount > 0) return "text-green-600";
  if (amount < 0) return "text-red-600";
  return "text-gray-600";
};

const getGainLossIcon = (amount: number) => {
  if (amount > 0) return <ArrowUpRight className="h-4 w-4 text-green-600" />;
  if (amount < 0) return <ArrowDownRight className="h-4 w-4 text-red-600" />;
  return <Equal className="h-4 w-4 text-gray-600" />;
};

const getGainLossBackground = (amount: number) => {
  if (amount > 0) return "bg-green-50 border-green-200";
  if (amount < 0) return "bg-red-50 border-red-200";
  return "bg-gray-50 border-gray-200";
};

export function GainLossContent() {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [activeTab, setActiveTab] = useState("summary");
  const [reportType, setReportType] = useState("All");

  const totalGains = gainLossData.reduce((sum, item) => sum + item.shortTermGain + item.longTermGain, 0);
  const totalLosses = gainLossData.reduce((sum, item) => sum + item.shortTermLoss + item.longTermLoss, 0);
  const netGainLoss = totalGains + totalLosses;
  const totalTransactions = gainLossData.reduce((sum, item) => sum + item.transactions, 0);

  const shortTermNet = gainLossData.reduce((sum, item) => sum + item.shortTermGain + item.shortTermLoss, 0);
  const longTermNet = gainLossData.reduce((sum, item) => sum + item.longTermGain + item.longTermLoss, 0);

  return (
    <div className="flex-1 h-0 bg-background overflow-auto">
      {/* Header */}
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">Gain/Loss Report</h1>
            <p className="text-muted-foreground">Comprehensive capital gains and losses analysis</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Report Tabs */}
        <div className="px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="by-asset">By Asset</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="tax-lots">Tax Lots</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className={getGainLossBackground(netGainLoss)}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-2xl font-bold ${getGainLossColor(netGainLoss)}`}>
                    ${Math.abs(netGainLoss).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Net Gain/Loss</p>
                </div>
                {getGainLossIcon(netGainLoss)}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">${totalGains.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Total Gains</p>
                </div>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-600">${Math.abs(totalLosses).toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Total Losses</p>
                </div>
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{totalTransactions}</div>
                  <p className="text-sm text-muted-foreground">Transactions</p>
                </div>
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Short-term vs Long-term */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Short-term Capital Gains/Losses</CardTitle>
              <p className="text-sm text-muted-foreground">Assets held 1 year or less</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Net Short-term</span>
                  <span className={`font-bold ${getGainLossColor(shortTermNet)}`}>
                    ${shortTermNet.toLocaleString()}
                  </span>
                </div>
                <Progress value={Math.abs(shortTermNet) / Math.abs(netGainLoss) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {((Math.abs(shortTermNet) / Math.abs(netGainLoss)) * 100).toFixed(1)}% of total
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Long-term Capital Gains/Losses</CardTitle>
              <p className="text-sm text-muted-foreground">Assets held more than 1 year</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Net Long-term</span>
                  <span className={`font-bold ${getGainLossColor(longTermNet)}`}>
                    ${longTermNet.toLocaleString()}
                  </span>
                </div>
                <Progress value={Math.abs(longTermNet) / Math.abs(netGainLoss) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {((Math.abs(longTermNet) / Math.abs(netGainLoss)) * 100).toFixed(1)}% of total
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="summary" className="space-y-6">
            {/* Asset Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Gain/Loss by Asset</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Short-term Gain</TableHead>
                      <TableHead>Short-term Loss</TableHead>
                      <TableHead>Long-term Gain</TableHead>
                      <TableHead>Long-term Loss</TableHead>
                      <TableHead>Total Gain/Loss</TableHead>
                      <TableHead>Transactions</TableHead>
                      <TableHead>Avg Holding</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gainLossData.map((item) => (
                      <TableRow key={item.symbol}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-xs font-bold text-blue-600">{item.symbol}</span>
                            </div>
                            <div>
                              <div className="font-medium">{item.asset}</div>
                              <div className="text-sm text-muted-foreground">{item.symbol}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-green-600">${item.shortTermGain.toLocaleString()}</TableCell>
                        <TableCell className="text-red-600">${item.shortTermLoss.toLocaleString()}</TableCell>
                        <TableCell className="text-green-600">${item.longTermGain.toLocaleString()}</TableCell>
                        <TableCell className="text-red-600">${item.longTermLoss.toLocaleString()}</TableCell>
                        <TableCell className={`font-bold ${getGainLossColor(item.totalGain)}`}>
                          ${item.totalGain.toLocaleString()}
                        </TableCell>
                        <TableCell>{item.transactions}</TableCell>
                        <TableCell>{item.avgHoldingPeriod}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="by-asset" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Detailed asset-by-asset analysis would be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Gain/Loss Timeline</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Gains</TableHead>
                      <TableHead>Losses</TableHead>
                      <TableHead>Net</TableHead>
                      <TableHead>Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyData.map((month) => (
                      <TableRow key={month.month}>
                        <TableCell className="font-medium">{month.month}</TableCell>
                        <TableCell className="text-green-600">${month.gains.toLocaleString()}</TableCell>
                        <TableCell className="text-red-600">${month.losses.toLocaleString()}</TableCell>
                        <TableCell className={`font-bold ${getGainLossColor(month.net)}`}>
                          ${month.net.toLocaleString()}
                        </TableCell>
                        <TableCell className="w-24">
                          <Progress 
                            value={Math.abs(month.net) / 20000 * 100} 
                            className={`h-2 ${month.net >= 0 ? 'text-green-600' : 'text-red-600'}`} 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax-lots" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Tax lots and specific identification methods would be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Tax Implications */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Implications Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900">Short-term Tax Rate</h4>
                <p className="text-2xl font-bold text-blue-600">22-37%</p>
                <p className="text-sm text-blue-700">Taxed as ordinary income</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900">Long-term Tax Rate</h4>
                <p className="text-2xl font-bold text-green-600">0-20%</p>
                <p className="text-sm text-green-700">Preferential tax rates</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900">Net Investment Income</h4>
                <p className="text-2xl font-bold text-purple-600">3.8%</p>
                <p className="text-sm text-purple-700">Additional tax may apply</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download Tax Summary
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Generate Schedule D
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Tax Planning Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
