import { Box } from "@chakra-ui/react";
import React from "react";
import CoinOptions from "./CoinOptions";

const PeriodOptions = ({ coins, getCoinDetails, handleChange }) => {
  return (
    <Box p="2">
      <select
        onChange={handleChange}
        style={{
          background: "#3F4E4F",
          color: "#ededed",
          border: 0,
          borderRadius: 10,
          padding: 5,
          outline: "none",
        }}
      >
        <option value={6}>Last week</option>
        <option value={13}>Last 14 days</option>
        <option value={29}>Last 30 days</option>
      </select>
    </Box>
  );
};

export default PeriodOptions;
