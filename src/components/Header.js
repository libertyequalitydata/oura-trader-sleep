import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import OuraIcon from "../assets/oura.svg";
const Header = () => {
  return (
    <Flex alignItems="center" mb={15}>
      <Text fontSize={14} fontWeight={700} ml={15} mr={100}>
        Trader's Sleep
      </Text>
      <Image src={OuraIcon} />
    </Flex>
  );
};

export default Header;
