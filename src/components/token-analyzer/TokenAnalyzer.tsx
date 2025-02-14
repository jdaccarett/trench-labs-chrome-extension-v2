import React, { useState, useEffect } from "react";
import { useURLParams } from "./hooks/useURLParams";
import { TokenData } from "./types";
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
        <div className="bg-white rounded-lg shadow-lg w-[400px] max-w-[90vw] max-h-[90vh] overflow-y-auto p-4">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{tokenData.name}</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-medium">
                  ${tokenData.price?.toFixed(8) || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Market Cap</p>
                <p className="font-medium">
                  ${tokenData.marketCap?.toLocaleString() || "N/A"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-500">Risk Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {tokenData.riskStatus}
              </span>
            </div>

            {tokenData.links && Object.keys(tokenData.links).length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Links</p>
                <div className="flex gap-2">
                  {tokenData.links.website && (
                    <button
                      className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50"
                      onClick={() =>
                        window.open(tokenData.links?.website, "_blank")
                      }
                    >
                      Website
                    </button>
                  )}
                  {tokenData.links.twitter && (
                    <button
                      className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50"
                      onClick={() =>
                        window.open(tokenData.links?.twitter, "_blank")
                      }
                    >
                      Twitter
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-between items-center text-gray-500 text-sm">
            <span>Trench Labs</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      )}

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
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
      </button>
    </div>
  );
};

export default TokenAnalyzer;
