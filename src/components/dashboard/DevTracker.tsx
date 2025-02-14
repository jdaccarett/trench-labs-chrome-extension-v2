import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Star, Shield, AlertTriangle } from "lucide-react";

interface DevDeployment {
  address: string;
  reputation: number;
  deployments: number;
  riskLevel: "low" | "medium" | "high";
  lastSeen: string;
}

interface DevTrackerProps {
  deployments?: DevDeployment[];
}

const DevTracker = ({
  deployments = [
    {
      address: "0x1234...5678",
      reputation: 95,
      deployments: 12,
      riskLevel: "low",
      lastSeen: "2 mins ago",
    },
    {
      address: "0x8765...4321",
      reputation: 75,
      deployments: 5,
      riskLevel: "medium",
      lastSeen: "15 mins ago",
    },
    {
      address: "0x9876...1234",
      reputation: 35,
      deployments: 2,
      riskLevel: "high",
      lastSeen: "1 hour ago",
    },
  ] as DevDeployment[],
}: DevTrackerProps) => {
  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return <Shield className="w-4 h-4 text-green-500" />;
      case "medium":
        return <Star className="w-4 h-4 text-yellow-500" />;
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "default";
      case "medium":
        return "secondary";
      case "high":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <Card className="w-[350px] bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Dev Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            {deployments.map((dev, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-mono text-sm">{dev.address}</div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge
                          variant={getRiskBadgeVariant(dev.riskLevel)}
                          className="flex items-center gap-1"
                        >
                          {getRiskIcon(dev.riskLevel)}
                          {dev.riskLevel.toUpperCase()}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Risk assessment based on historical activity</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Reputation</span>
                    <span className="font-semibold">{dev.reputation}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Deployments</span>
                    <span>{dev.deployments}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Last Seen</span>
                    <span className="text-sm">{dev.lastSeen}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DevTracker;
