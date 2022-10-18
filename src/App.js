import React from "react";
import { PrifinaProvider, PrifinaContext } from "@prifina/hooks";
import OuraTraderSleep from "./OuraTraderSleep";
import { ChakraProvider } from "@chakra-ui/react";

// this is only for local webpack server test  => yarn start
export const LocalComponent = (props) => {
  return (
    <PrifinaProvider stage={"dev"} Context={PrifinaContext}>
      <OuraTraderSleep {...props} />
    </PrifinaProvider>
  );
};
