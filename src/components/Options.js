import React from "react";
import { Badge, Box, Flex, Spacer } from "@chakra-ui/react";
import CoinOptions from "./CoinOptions";
const Options = ({ coins, getCoinDetails, handleChange }) => {
  return (
    <Flex
      h={25}
      justifyContent="space-between"
      alignItems="center"
      padding="0px 25px 0px 25px"
      minWidth="max-content"
      gap="2"
    >
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
      <Spacer />

      <CoinOptions coins={coins} onAdd={getCoinDetails} />
    </Flex>
  );
};

export default Options;
