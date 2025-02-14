import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  ExternalLink,
  Info,
} from "lucide-react";

interface SignalCardProps {
  tokenName?: string;
  tokenSymbol?: string;
  signalType?: "buy" | "sell";
  confidence?: number;
  price?: number;
  platform?: "Axiom" | "BullX";
  timestamp?: string;
  onTrade?: () => void;
}

const SignalCard = ({
  tokenName = "Sample Token",
  tokenSymbol = "STKN",
  signalType = "buy",
  confidence = 85,
  price = 0.00001234,
  platform = "Axiom",
  timestamp = new Date().toLocaleTimeString(),
  onTrade = () => console.log("Trade action"),
}: SignalCardProps) => {
  return (
    <Card className="w-[330px] bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg">{tokenName}</h3>
            <Badge variant="outline">{tokenSymbol}</Badge>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant={signalType === "buy" ? "default" : "destructive"}
                  className="flex items-center gap-1"
                >
                  {signalType === "buy" ? (
                    <ArrowUpCircle className="w-4 h-4" />
                  ) : (
                    <ArrowDownCircle className="w-4 h-4" />
                  )}
                  {signalType.toUpperCase()}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{signalType === "buy" ? "Buy Signal" : "Sell Signal"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Price</span>
            <span className="font-mono">${price.toFixed(8)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Confidence</span>
            <div className="flex items-center gap-1">
              <span className="font-semibold">{confidence}%</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Signal confidence based on multiple indicators</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Platform</span>
            <span>{platform}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-xs text-gray-500">{timestamp}</span>
        <Button onClick={onTrade} className="flex items-center gap-2">
          Trade Now
          <ExternalLink className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignalCard;
