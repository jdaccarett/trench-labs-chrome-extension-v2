import React from "react";
import SignalFeed from "./dashboard/SignalFeed";
import DevTracker from "./dashboard/DevTracker";
import WalletAnalysis from "./dashboard/WalletAnalysis";
import TrendAnalysis from "./dashboard/TrendAnalysis";

const Home = () => {
  return (
    <div className="w-[800px] h-[600px] bg-gray-100 dark:bg-gray-900 p-4 overflow-auto">
      <div>
        <header className="mb-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Trading Intelligence Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Real-time signals and analytics for Solana meme coins
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="flex flex-col gap-6">
            <SignalFeed />
          </div>

          <div className="flex flex-col gap-6">
            <DevTracker />
            <TrendAnalysis />
          </div>

          <div className="flex flex-col gap-6">
            <WalletAnalysis />
          </div>

          <div className="flex flex-col gap-6">
            {/* Reserved for future components */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
