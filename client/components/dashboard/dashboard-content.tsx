import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedDashboardCards } from "./enhanced-dashboard-cards";
import { RecentUploads } from "./recent-uploads";
import { EnhancedPieChartSections } from "./enhanced-pie-charts";
import { AnomalyFlags } from "./anomaly-flags";

export function DashboardContent() {
  return (
    <div className="app-content bg-gray-50">
      {/* Page Header */}
      <div className="page-titlebar">
        <div className="flex flex-col p-6 text-left">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            View all your key metrics and data here
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6 no-h-scroll">
        {/* Recent Uploads */}
        <RecentUploads />

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200">
          <Tabs defaultValue="overview" className="w-full">
            <div className="border-b border-gray-200 px-6">
              <TabsList className="h-auto p-0 bg-transparent border-0">
                <TabsTrigger
                  value="overview"
                  className="relative px-0 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-yellow-400 rounded-none"
                >
                  <span className="font-semibold text-sm text-gray-900">
                    Overview
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="relative px-0 py-3 ml-5 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-yellow-400 rounded-none"
                >
                  <span className="font-semibold text-sm text-gray-500">
                    Reports
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="portfolio"
                  className="relative px-0 py-3 ml-5 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-yellow-400 rounded-none"
                >
                  <span className="font-semibold text-sm text-gray-500">
                    Portfolio
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="p-6 space-y-8 mt-0 no-h-scroll">
              {/* Enhanced Dashboard Cards */}
              <EnhancedDashboardCards />

              {/* Enhanced Charts Section */}
              <EnhancedPieChartSections />

              {/* Anomaly Flags */}
              <AnomalyFlags />
            </TabsContent>

            <TabsContent value="reports" className="p-6 mt-0 space-y-6 no-h-scroll">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        IRS Form 8949
                      </h3>
                      <p className="text-sm text-gray-500">
                        Capital gains and losses
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Forms Ready:</span>
                      <span className="font-medium">3 of 3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium">2 hours ago</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    View Reports
                  </button>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <svg
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Gain/Loss Analysis
                      </h3>
                      <p className="text-sm text-gray-500">
                        Detailed P&L breakdown
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Net Gain/Loss:</span>
                      <span className="font-medium text-green-600">
                        +$127,456
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax Liability:</span>
                      <span className="font-medium">$25,491</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    View Analysis
                  </button>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <svg
                        className="h-6 w-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Export Package
                      </h3>
                      <p className="text-sm text-gray-500">Ready for filing</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Forms Included:</span>
                      <span className="font-medium">8949, Schedule D</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">File Size:</span>
                      <span className="font-medium">2.4 MB</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Download Package
                  </button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="p-6 mt-0 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Asset Allocation
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium">
                          Bitcoin (BTC)
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">45.2%</div>
                        <div className="text-xs text-gray-500">$234,567</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">
                          Ethereum (ETH)
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">32.1%</div>
                        <div className="text-xs text-gray-500">$166,234</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">
                          Other Assets
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">22.7%</div>
                        <div className="text-xs text-gray-500">$117,845</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Performance Summary
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Total Portfolio Value
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        $518,646
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Unrealized Gain/Loss
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        +$127,456 (32.4%)
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Realized Gain/Loss
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        +$45,234 (11.8%)
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cost Basis</span>
                      <span className="text-lg font-bold text-gray-900">
                        $391,190
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
