import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const AvgSleepScore = ({ average, preferredCoin }) => {
  return (
    <Box
      height={200}
      style={{
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingTop: 35,
      }}
    >
      <Flex
        width="100%"
        justifyContent="center"
        style={{ paddingRight: 10, paddingLeft: 10 }}
      >
        <Box
          width={100}
          height={75}
          bg={average >= 85 ? "#1C6758" : "#A25B5B"}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 8,
            position: "relative",
          }}
        >
          <Text as="b" fontSize={30} color="#ededed" lineHeight={1.1} mt={10}>
            {isNaN(average) ? "-" : average}
          </Text>
          <Text fontSize={12} color="white" position="absolute" mt={50}>
            AVG SCORE
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default AvgSleepScore;
