import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedDashboardCards } from "./enhanced-dashboard-cards";
import { RecentUploads } from "./recent-uploads";
import { EnhancedPieChartSections } from "./enhanced-pie-charts";
import { AnomalyFlags } from "./anomaly-flags";

export function DashboardContent() {
  return (
    <div className="flex-1 h-0 bg-gray-50 overflow-auto">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">View all your key metrics and data here</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
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
                  <span className="font-semibold text-sm text-gray-900">Overview</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="reports"
                  className="relative px-0 py-3 ml-5 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-yellow-400 rounded-none"
                >
                  <span className="font-semibold text-sm text-gray-500">Reports</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="portfolio"
                  className="relative px-0 py-3 ml-5 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-yellow-400 rounded-none"
                >
                  <span className="font-semibold text-sm text-gray-500">Portfolio</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="p-6 space-y-6 mt-0">
              {/* Dashboard Cards */}
              <DashboardCards />

              {/* Charts Section */}
              <PieChartSections />

              {/* Anomaly Flags */}
              <AnomalyFlags />
            </TabsContent>

            <TabsContent value="reports" className="p-6 mt-0">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Reports</h3>
                <p className="text-gray-500">Reports content will be available soon.</p>
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="p-6 mt-0">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Portfolio</h3>
                <p className="text-gray-500">Portfolio content will be available soon.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
