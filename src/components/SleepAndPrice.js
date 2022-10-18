import React from "react";
import AvgSleepScore from "./AvgSleepScore";
import PricePerformance from "./PricePerformance";

const SleepAndPrice = ({ average, period, preferredCoin }) => {
  return (
    <div>
      <AvgSleepScore average={average} />
      {preferredCoin !== "" && period == 6 && (
        <PricePerformance
          preferredCoin={preferredCoin.market_data.price_change_percentage_7d}
        />
      )}
      {preferredCoin !== "" && period == 13 && (
        <PricePerformance
          preferredCoin={preferredCoin.market_data.price_change_percentage_14d}
        />
      )}
      {preferredCoin !== "" && period == 29 && (
        <PricePerformance
          preferredCoin={preferredCoin.market_data.price_change_percentage_30d}
        />
      )}
    </div>
  );
};

export default SleepAndPrice;
