import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Info,
  Activity,
} from "lucide-react";

interface TrendAnalysisProps {
  momentum?: number;
  riskLevel?: "Low" | "Medium" | "High";
  trendDirection?: "up" | "down";
  volatility?: number;
  volume24h?: number;
  priceChange24h?: number;
}

const TrendAnalysis = ({
  momentum = 75,
  riskLevel = "Medium",
  trendDirection = "up",
  volatility = 65,
  volume24h = 1250000,
  priceChange24h = 12.5,
}: TrendAnalysisProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <Card className="w-[350px] bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Trend Analysis
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Real-time market trend analysis and risk assessment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Momentum</span>
            <Progress value={momentum} className="w-32" />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Risk Level</span>
            <Badge className={getRiskColor(riskLevel)}>
              <AlertTriangle className="w-3 h-3 mr-1" />
              {riskLevel}
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Trend</span>
            <div className="flex items-center gap-2">
              {trendDirection === "up" ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`font-semibold ${trendDirection === "up" ? "text-green-500" : "text-red-500"}`}
              >
                {priceChange24h}%
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Volatility</span>
            <div className="flex items-center gap-2">
              <Progress value={volatility} className="w-24" />
              <span className="text-sm">{volatility}%</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">24h Volume</span>
            <span className="font-mono">${volume24h.toLocaleString()}</span>
          </div>
        </div>

        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <Info className="w-4 h-4" />
            <span>
              Market sentiment is {momentum > 50 ? "bullish" : "bearish"} with{" "}
              {riskLevel.toLowerCase()} risk
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendAnalysis;
