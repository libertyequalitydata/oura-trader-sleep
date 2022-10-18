import { Input } from "@chakra-ui/react";
import React from "react";

const SearchCoins = ({ handleInput }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        onChange={handleInput}
        placeholder="Search among the largest 250 digital assets"
        size="lg"
      ></Input>
    </form>
  );
};

export default SearchCoins;
