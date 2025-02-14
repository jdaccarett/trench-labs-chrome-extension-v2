import React, { useState, useEffect } from "react";
import { useURLParams } from "./hooks/useURLParams";
import { TokenData } from "./types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { ChevronRight, Shield, AlertTriangle, Star } from "lucide-react";

const TokenAnalyzer = () => {
  const [step, setStep] = useState("initial");
  const [isOpen, setIsOpen] = useState(false);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const params = useURLParams();

  useEffect(() => {
    console.log("[TokenAnalyzer] Address changed:", params.address);
    setStep("initial");
    setIsOpen(false);
    setTokenData(null);
  }, [params.address]);

  const validateToken = async (tokenAddress: string) => {
    console.log("[Validation] Starting for address:", tokenAddress);
    setStep("searching");

    try {
      const response = await chrome.runtime.sendMessage({
        action: "getTokenData",
        tokenAddress,
      });

      if (response?.success) {
        setTokenData({
          ...response.data,
          isLoading: false,
        });
        setStep("found");
        setIsOpen(true);
      } else {
        console.error("[Validation] Failed:", response?.error);
        setStep("initial");
      }
    } catch (error) {
      console.error("[Validation] Error:", error);
      setStep("initial");
    }
  };

  if (!params.isValidPage) return null;

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-end space-y-4 z-40">
      {isOpen && tokenData && (
        <Card className="w-[400px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{tokenData.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                ×
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-medium">
                  ${tokenData.price?.toFixed(8) || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Market Cap</p>
                <p className="font-medium">
                  ${tokenData.marketCap?.toLocaleString() || "N/A"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Risk Status</p>
              <Badge
                variant={
                  tokenData.riskStatus === "UNKNOWN"
                    ? "secondary"
                    : "destructive"
                }
              >
                {tokenData.riskStatus}
              </Badge>
            </div>

            {tokenData.links && Object.keys(tokenData.links).length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Links</p>
                <div className="flex gap-2">
                  {tokenData.links.website && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(tokenData.links?.website, "_blank")
                      }
                    >
                      Website
                    </Button>
                  )}
                  {tokenData.links.twitter && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(tokenData.links?.twitter, "_blank")
                      }
                    >
                      Twitter
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="bg-muted/50 flex justify-between items-center p-4">
            <span className="text-sm text-muted-foreground">Trench Labs</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </CardFooter>
        </Card>
      )}

      <Button
        className="shadow-lg"
        onClick={() => {
          if (step === "found" && !isOpen) {
            setIsOpen(true);
          } else if (params.address) {
            validateToken(params.address);
          }
        }}
      >
        {step === "searching"
          ? "Analyzing..."
          : step === "found"
            ? isOpen
              ? "Analyzing..."
              : "Show Analysis"
            : "Analyze Token"}
      </Button>
    </div>
  );
};

export default TokenAnalyzer;
