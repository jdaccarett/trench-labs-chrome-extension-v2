// Function to convert timestamp to relative time
function getRelativeTime(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;

  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  if (diff < 0) {
    return "just now";
  }

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const value = Math.floor(diff / secondsInUnit);
    if (value >= 1) {
      return `${value}${unit.charAt(0)}`;
    }
  }

  return "just now";
}

// Check token on Axiom
async function checkTokenInAxiom(address: string): Promise<any> {
  if (!address) {
    console.log("[Background] No valid address to search.");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.axiom.trade/v1/tokens/${address}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`API fetch failed with status: ${response.status}`);
    }

    const data = await response.json();
    return {
      name: data.name,
      symbol: data.symbol,
      price: data.price,
      marketCap: data.marketCap,
      volume24h: data.volume24h,
      createdAt: data.createdAt,
      relativeTime: getRelativeTime(
        Math.floor(new Date(data.createdAt).getTime() / 1000),
      ),
    };
  } catch (err) {
    console.error("[Background] Error searching Axiom API:", err);
    return null;
  }
}

// Check token on BullX
async function checkTokenInBullX(address: string): Promise<any> {
  if (!address) {
    console.log("[Background] No valid address to search.");
    return null;
  }

  try {
    const response = await fetch(
      `https://api-neo.bullx.io/v2/api/resolveTokensV2`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          name: "resolveTokensV2",
          data: {
            addresses: [address],
            chainId: "solana",
          },
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`API fetch failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.data[address];
  } catch (err) {
    console.error("[Background] Error searching BullX API:", err);
    return null;
  }
}

// Check dev history
async function checkDevHistory(creatorAddress: string): Promise<any> {
  try {
    console.log("[Background] Fetching dev history for:", creatorAddress);
    const response = await fetch(
      `https://api.solscan.io/account/tokens?address=${creatorAddress}&limit=50`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Dev history fetch failed with status: ${response.status}`,
      );
    }

    const data = await response.json();
    const tokens = data.data || [];

    // Calculate dev stats
    const totalTokens = tokens.length;
    const activeTokens = tokens.filter(
      (token: any) => token.tokenAmount.uiAmount > 0,
    ).length;
    const successRate =
      totalTokens > 0 ? (activeTokens / totalTokens) * 100 : 0;

    return {
      tokens,
      totalTokens,
      activeTokens,
      successRate: successRate.toFixed(1),
    };
  } catch (err) {
    console.error("[Background] Error fetching dev history:", err);
    return null;
  }
}

// Message handlers
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getTokenData") {
    const tokenAddress = message.tokenAddress;

    (async () => {
      try {
        const [axiomData, bullxData] = await Promise.all([
          checkTokenInAxiom(tokenAddress),
          checkTokenInBullX(tokenAddress),
        ]);

        // Combine data from both sources
        const combinedData = {
          address: tokenAddress,
          name: axiomData?.name || bullxData?.name,
          symbol: axiomData?.symbol || bullxData?.symbol,
          price: axiomData?.price || bullxData?.priceUSD,
          marketCap: axiomData?.marketCap || bullxData?.marketCap,
          volume24h: axiomData?.volume24h || bullxData?.volume24,
          createdAt: axiomData?.createdAt || bullxData?.creationBlockTimestamp,
          riskStatus: bullxData?.riskStatus || "UNKNOWN",
          links: bullxData?.links || {},
        };

        sendResponse({
          success: true,
          data: combinedData,
        });
      } catch (error: any) {
        sendResponse({ success: false, error: error.message });
      }
    })();
    return true;
  }

  if (message.action === "getDevHistory") {
    const { creatorAddress } = message;

    (async () => {
      try {
        const devHistory = await checkDevHistory(creatorAddress);
        sendResponse({
          success: true,
          data: { devHistory },
        });
      } catch (error: any) {
        sendResponse({ success: false, error: error.message });
      }
    })();
    return true;
  }
});

// URL monitoring
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url) {
    const isAxiomPage = tab.url.includes("axiom.trade");
    const isBullXPage = tab.url.includes("bullx.io");
    const hasUrlChange = changeInfo.url;
    const hasStatusComplete = changeInfo.status === "complete";

    if ((isAxiomPage || isBullXPage) && (hasUrlChange || hasStatusComplete)) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id === tabId) {
          chrome.tabs.sendMessage(
            tabId,
            {
              message: "TabUpdated",
              url: tab.url,
              isAxiomPage,
              isBullXPage,
            },
            (response) => {
              if (chrome.runtime.lastError) {
                console.log("[Background] Message send attempt failed:", {
                  error: chrome.runtime.lastError,
                  tabId,
                });
              }
            },
          );
        }
      });
    }
  }
});
