import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
const PricePerformance = ({ preferredCoin }) => {
  return (
    <Box
      height={200}
      style={{
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingTop: 35,
      }}
    >
      <Flex width="100%" justifyContent="center" style={{ paddingRight: 10 }}>
        <Box
          width={150}
          height={75}
          bg={preferredCoin < 0 ? "#A25B5B" : "#1C6758"}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 8,
            position: "relative",
          }}
        >
          <Text as="b" fontSize={30} color="#ededed" lineHeight={1.1} mt={10}>
            {isNaN(preferredCoin) ? "-" : "%" + preferredCoin.toFixed(2)}
          </Text>
          <Text fontSize={12} color="white" position="absolute" mt={50}>
            PRICE CHANGE
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default PricePerformance;
