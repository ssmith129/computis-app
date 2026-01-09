import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedDashboardCards } from "./enhanced-dashboard-cards";
import { RecentUploads } from "./recent-uploads";
import { EnhancedPieChartSections } from "./enhanced-pie-charts";
import { AnomalyFlags } from "./anomaly-flags";
import { TouchZoomContainer } from "@/components/ui/touch-zoom-container";
import { Shield, Users, Briefcase } from "lucide-react";

export function DashboardContent() {
  const [roleView, setRoleView] = useState("admin");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (value: string) => {
    setIsLoading(true);
    setRoleView(value);
    // Simulate content loading
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="app-content bg-gray-50">
      {/* Page Header */}
      <div className="page-titlebar">
        <div className="flex flex-col p-4 sm:p-6 text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            View all your key metrics and data here
          </p>

          {/* Role View Selector */}
          <div className="mt-4">
            <Tabs
              value={roleView}
              onValueChange={handleRoleChange}
              className="w-full"
            >
              <TabsList className="inline-flex h-11 items-center justify-start rounded-lg bg-gray-100 p-1">
                <TabsTrigger
                  value="admin"
                  className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
                  aria-label="Admin view - Full access to all dashboard features"
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </TabsTrigger>
                <TabsTrigger
                  value="client"
                  className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
                  aria-label="Client view - Limited to client-accessible data"
                >
                  <Users className="h-4 w-4" />
                  <span>Client</span>
                </TabsTrigger>
                <TabsTrigger
                  value="cpa"
                  className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
                  aria-label="CPA view - Tax preparer tools and client management"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>CPA</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Main Content with Loading State */}
      <div
        className={`p-4 sm:p-6 space-y-4 sm:space-y-6 no-h-scroll transition-opacity duration-300 w-full max-w-full overflow-hidden ${isLoading ? "opacity-50" : "opacity-100"}`}
      >
        <Tabs value={roleView} className="w-full">
          {/* Admin View */}
          <TabsContent value="admin" className="mt-0 space-y-6">
            <RecentUploads />

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

                <TabsContent
                  value="overview"
                  className="p-6 space-y-8 mt-0 no-h-scroll"
                >
                  <EnhancedDashboardCards />
                  <TouchZoomContainer className="rounded-lg">
                    <EnhancedPieChartSections />
                  </TouchZoomContainer>
                  <AnomalyFlags />
                </TabsContent>

                <TabsContent
                  value="reports"
                  className="p-6 mt-0 space-y-6 no-h-scroll"
                >
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
                          <p className="text-sm text-gray-500">
                            Ready for filing
                          </p>
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
                            <div className="text-xs text-gray-500">
                              $234,567
                            </div>
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
                            <div className="text-xs text-gray-500">
                              $166,234
                            </div>
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
                            <div className="text-xs text-gray-500">
                              $117,845
                            </div>
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
                          <span className="text-sm text-gray-600">
                            Cost Basis
                          </span>
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
          </TabsContent>

          {/* Client View */}
          <TabsContent value="client" className="mt-0 space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">
                    Client View Active
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Displaying data and features accessible to client users
                  </p>
                </div>
              </div>
            </div>

            <RecentUploads />

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
                      value="portfolio"
                      className="relative px-0 py-3 ml-5 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-yellow-400 rounded-none"
                    >
                      <span className="font-semibold text-sm text-gray-500">
                        Portfolio
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent
                  value="overview"
                  className="p-6 space-y-8 mt-0 no-h-scroll"
                >
                  <EnhancedDashboardCards />
                  <TouchZoomContainer className="rounded-lg">
                    <EnhancedPieChartSections />
                  </TouchZoomContainer>
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
                            <div className="text-xs text-gray-500">
                              $234,567
                            </div>
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
                            <div className="text-xs text-gray-500">
                              $166,234
                            </div>
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
                            <div className="text-xs text-gray-500">
                              $117,845
                            </div>
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
                          <span className="text-sm text-gray-600">
                            Cost Basis
                          </span>
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
          </TabsContent>

          {/* CPA View */}
          <TabsContent value="cpa" className="mt-0 space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-900">
                    CPA View Active
                  </h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Tax preparer tools and expanded client management features
                  </p>
                </div>
              </div>
            </div>

            <RecentUploads />

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
                    <TabsTrigger
                      value="clients"
                      className="relative px-0 py-3 ml-5 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-yellow-400 rounded-none"
                    >
                      <span className="font-semibold text-sm text-gray-500">
                        Client Management
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent
                  value="overview"
                  className="p-6 space-y-8 mt-0 no-h-scroll"
                >
                  <EnhancedDashboardCards />
                  <TouchZoomContainer className="rounded-lg">
                    <EnhancedPieChartSections />
                  </TouchZoomContainer>
                  <AnomalyFlags />
                </TabsContent>

                <TabsContent
                  value="reports"
                  className="p-6 mt-0 space-y-6 no-h-scroll"
                >
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
                          <p className="text-sm text-gray-500">
                            Ready for filing
                          </p>
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
                            <div className="text-xs text-gray-500">
                              $234,567
                            </div>
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
                            <div className="text-xs text-gray-500">
                              $166,234
                            </div>
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
                            <div className="text-xs text-gray-500">
                              $117,845
                            </div>
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
                          <span className="text-sm text-gray-600">
                            Cost Basis
                          </span>
                          <span className="text-lg font-bold text-gray-900">
                            $391,190
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="clients" className="p-6 mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-blue-900">
                          Total Clients
                        </h4>
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-blue-900">47</p>
                      <p className="text-xs text-blue-700 mt-1">
                        +3 this month
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-green-900">
                          Active Returns
                        </h4>
                        <svg
                          className="h-4 w-4 text-green-600"
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
                      <p className="text-2xl font-bold text-green-900">23</p>
                      <p className="text-xs text-green-700 mt-1">In progress</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-purple-900">
                          Pending Review
                        </h4>
                        <svg
                          className="h-4 w-4 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-2xl font-bold text-purple-900">8</p>
                      <p className="text-xs text-purple-700 mt-1">
                        Needs attention
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-orange-900">
                          Completed
                        </h4>
                        <svg
                          className="h-4 w-4 text-orange-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-2xl font-bold text-orange-900">16</p>
                      <p className="text-xs text-orange-700 mt-1">
                        This tax year
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Client Portfolio Overview
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-blue-900">
                              JD
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              John Doe
                            </p>
                            <p className="text-xs text-gray-500">
                              Portfolio: $518,646
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                            In Review
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-green-900">
                              AS
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Alice Smith
                            </p>
                            <p className="text-xs text-gray-500">
                              Portfolio: $1,234,890
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            Complete
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-purple-900">
                              BJ
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Bob Johnson
                            </p>
                            <p className="text-xs text-gray-500">
                              Portfolio: $789,234
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                            In Progress
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
