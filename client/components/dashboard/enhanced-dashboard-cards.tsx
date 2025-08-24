import { useState } from "react";
import {
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  FileText,
  Settings,
  DollarSign,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AnimatedMiniChart } from "./animated-mini-chart";
import { Link } from "react-router-dom";

interface EnhancedDashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: any;
  iconColor: string;
  iconBg: string;
  chartData?: number[];
  chartColor?:
    | "blue"
    | "green"
    | "orange"
    | "yellow"
    | "cyan"
    | "red"
    | "purple";
  progress?: number;
  status?: "success" | "warning" | "error" | "info";
  actionLabel?: string;
  actionLink?: string;
  badge?: {
    text: string;
    variant: "success" | "warning" | "error" | "info";
  };
  animate?: boolean;
}

export function EnhancedDashboardCard({
  title,
  value,
  subtitle,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor,
  iconBg,
  chartData,
  chartColor = "blue",
  progress,
  status,
  actionLabel,
  actionLink,
  badge,
  animate = true,
}: EnhancedDashboardCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const changeColorClass = {
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-gray-500",
  }[changeType];

  const statusColors = {
    success: "border-green-200 bg-green-50",
    warning: "border-yellow-200 bg-yellow-50",
    error: "border-red-200 bg-red-50",
    info: "border-blue-200 bg-blue-50",
  };

  const cardClassName = status
    ? `${statusColors[status]} transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer`
    : "bg-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer";

  const cardContent = (
    <Card
      className={cardClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl ${iconBg} transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}
            >
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                {title}
              </h3>
              {badge && (
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    badge.variant === "success"
                      ? "bg-green-100 text-green-700"
                      : badge.variant === "warning"
                        ? "bg-yellow-100 text-yellow-700"
                        : badge.variant === "error"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {badge.text}
                </Badge>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="h-4 w-4 text-gray-400" />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <div
                className={`text-3xl font-bold text-gray-900 transition-all duration-300 ${animate && isHovered ? "scale-105" : ""}`}
              >
                {typeof value === "number" ? value.toLocaleString() : value}
              </div>
              {subtitle && (
                <div className="text-sm text-gray-500">{subtitle}</div>
              )}
              {change && (
                <div
                  className={`text-sm flex items-center gap-1 ${changeColorClass}`}
                >
                  {changeType === "positive" && (
                    <TrendingUp className="h-3 w-3" />
                  )}
                  {changeType === "negative" && (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {change}
                </div>
              )}
            </div>

            {chartData && (
              <div className="flex-shrink-0">
                <AnimatedMiniChart
                  data={chartData}
                  color={chartColor}
                  animate={isHovered}
                />
              </div>
            )}
          </div>

          {progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress
                value={progress}
                className="h-2 transition-all duration-500"
              />
            </div>
          )}

          {actionLabel && (
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {actionLabel}
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (actionLink) {
    return (
      <Link to={actionLink} className="block group">
        {cardContent}
      </Link>
    );
  }

  return <div className="group">{cardContent}</div>;
}

export function EnhancedDashboardCards() {
  const cardsData = [
    {
      title: "Total Gain/Loss",
      value: "$127,456",
      subtitle: "Current tax year",
      change: "+$12,300 this month",
      changeType: "positive" as const,
      icon: DollarSign,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      chartData: [45, 52, 38, 65, 42, 73, 58, 67, 89, 76],
      chartColor: "green" as const,
      actionLabel: "View Gain/Loss Report",
      actionLink: "/gain-loss",
      animate: true,
    },
    {
      title: "Data Anomalies",
      value: 7,
      subtitle: "Issues requiring attention",
      change: "-3 resolved today",
      changeType: "positive" as const,
      icon: AlertTriangle,
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-100",
      status: "warning" as const,
      badge: {
        text: "Action Required",
        variant: "warning" as const,
      },
      actionLabel: "Investigate Issues",
      actionLink: "/data-anomaly-detection",
      animate: true,
    },
    {
      title: "IRS 8949 Forms",
      value: "Ready",
      subtitle: "3 forms generated",
      change: "Updated 2 hours ago",
      changeType: "neutral" as const,
      icon: FileText,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      progress: 95,
      status: "success" as const,
      actionLabel: "Download Forms",
      actionLink: "/irs-8949",
      animate: true,
    },
    {
      title: "Active Clients",
      value: 24,
      subtitle: "18 firms, 6 individuals",
      change: "+2 new this week",
      changeType: "positive" as const,
      icon: Users,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      chartData: [12, 19, 15, 22, 18, 24, 21, 25, 23, 24],
      chartColor: "purple" as const,
      actionLabel: "Manage Clients",
      actionLink: "/clients",
      animate: true,
    },
    {
      title: "Transactions Processed",
      value: "98,765",
      subtitle: "Across all wallets",
      change: "+2,134 today",
      changeType: "positive" as const,
      icon: Activity,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      chartData: [890, 920, 1100, 980, 1200, 1350, 1180, 1400, 1250, 1380],
      chartColor: "blue" as const,
      actionLabel: "View Transactions",
      actionLink: "/transactions",
      animate: true,
    },
    {
      title: "Automation Rules",
      value: 15,
      subtitle: "Active classification rules",
      change: "89% accuracy rate",
      changeType: "positive" as const,
      icon: Settings,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-100",
      progress: 89,
      actionLabel: "Manage Rules",
      actionLink: "/rule-engine",
      animate: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Key Metrics & Tools
          </h2>
          <p className="text-sm text-gray-500">
            Overview of your crypto tax preparation status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            All Systems Operational
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsData.map((card, index) => (
          <EnhancedDashboardCard key={index} {...card} />
        ))}
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Ready to File?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  All transactions classified and forms generated
                </p>
                <Link to="/exports">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Generate Tax Package
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="text-4xl opacity-20">📊</div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Upload New Data
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Import transactions from wallets and exchanges
                </p>
                <Link to="/wallet-ingestion">
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                  >
                    Upload Transactions
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="text-4xl opacity-20">📈</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
