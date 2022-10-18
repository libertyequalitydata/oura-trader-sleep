import React from "react";
import { InfoIcon } from "@chakra-ui/icons";
import { Badge, ChakraProvider, Stack } from "@chakra-ui/react";
const FooterMessage = () => {
  return (
    <ChakraProvider>
      <Stack mt={-50}>
        <Badge bg="transparent" color="#ededed">
          <InfoIcon /> 85 or higher: Optimal
        </Badge>

        <Badge bg="#212121" color="#ededed">
          {" "}
          <InfoIcon /> 70-84: Good
        </Badge>
        <Badge bg="#212121" color="#ededed">
          {" "}
          <InfoIcon /> Below 70: Not good
        </Badge>
      </Stack>
    </ChakraProvider>
  );
};

export default FooterMessage;
