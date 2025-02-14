import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";

interface WalletMovement {
  address: string;
  type: "entry" | "exit";
  amount: number;
  token: string;
  timestamp: string;
}

interface WalletAnalysisProps {
  movements?: WalletMovement[];
}

const WalletAnalysis = ({
  movements = [
    {
      address: "0x1234...5678",
      type: "entry",
      amount: 10000,
      token: "STKN",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toLocaleTimeString(),
    },
    {
      address: "0x8765...4321",
      type: "exit",
      amount: 5000,
      token: "MEME",
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toLocaleTimeString(),
    },
    {
      address: "0x9876...1234",
      type: "entry",
      amount: 15000,
      token: "PEPE",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toLocaleTimeString(),
    },
  ],
}: WalletAnalysisProps) => {
  return (
    <Card className="w-[350px] h-[450px] bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          <CardTitle>Wallet Analysis</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] w-full pr-4">
          <div className="space-y-4">
            {movements.map((movement, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border bg-gray-50 dark:bg-gray-900"
              >
                <div className="flex justify-between items-start mb-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="font-mono text-sm">
                          {movement.address}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click to view wallet details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Badge
                    variant={
                      movement.type === "entry" ? "default" : "destructive"
                    }
                    className="flex items-center gap-1"
                  >
                    {movement.type === "entry" ? (
                      <ArrowUpCircle className="w-3 h-3" />
                    ) : (
                      <ArrowDownCircle className="w-3 h-3" />
                    )}
                    {movement.type.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    {movement.amount.toLocaleString()} {movement.token}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {movement.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WalletAnalysis;
