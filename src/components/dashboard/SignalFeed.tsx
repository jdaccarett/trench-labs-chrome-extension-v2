import React from "react";
import { Card, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import SignalCard from "./SignalCard";
import { Bell, Filter } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface Signal {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  signalType: "buy" | "sell";
  confidence: number;
  price: number;
  platform: "Axiom" | "BullX";
  timestamp: string;
}

interface SignalFeedProps {
  signals?: Signal[];
  onSignalAction?: (signalId: string) => void;
}

const SignalFeed = ({
  signals = [
    {
      id: "1",
      tokenName: "Pepe Coin",
      tokenSymbol: "PEPE",
      signalType: "buy",
      confidence: 92,
      price: 0.00000123,
      platform: "Axiom",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: "2",
      tokenName: "Doge Coin",
      tokenSymbol: "DOGE",
      signalType: "sell",
      confidence: 78,
      price: 0.00004567,
      platform: "BullX",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: "3",
      tokenName: "Moon Token",
      tokenSymbol: "MOON",
      signalType: "buy",
      confidence: 85,
      price: 0.00000789,
      platform: "Axiom",
      timestamp: new Date().toLocaleTimeString(),
    },
  ],
  onSignalAction = (id) => console.log(`Signal action for ${id}`),
}: SignalFeedProps) => {
  return (
    <Card className="w-[350px] h-[600px] bg-white dark:bg-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-xl">Signal Feed</h2>
            <Badge variant="secondary" className="font-normal">
              {signals.length} signals
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <ScrollArea className="h-[520px] px-4">
        <div className="space-y-4 pb-4">
          {signals.map((signal) => (
            <SignalCard
              key={signal.id}
              tokenName={signal.tokenName}
              tokenSymbol={signal.tokenSymbol}
              signalType={signal.signalType}
              confidence={signal.confidence}
              price={signal.price}
              platform={signal.platform}
              timestamp={signal.timestamp}
              onTrade={() => onSignalAction(signal.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default SignalFeed;
