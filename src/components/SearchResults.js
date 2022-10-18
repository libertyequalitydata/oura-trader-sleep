import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  ChakraProvider,
  Button,
} from "@chakra-ui/react";

const SearchResults = ({ filteredCoins, onAdd }) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  return (
    <>
      {filteredCoins.map((filteredCoin) => {
        return (
          <div className="wrapper">
            <TableContainer color="white">
              <Table
                style={{
                  borderCollapse: "separate",
                  borderSpacing: "0 1em",
                  color: "white",
                }}
                variant="unstyled"
                size="sm"
              >
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      {" "}
                      {filteredCoin.name} ({filteredCoin.symbol.toUpperCase()})
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Button
              size="lg"
              onClick={() => onAdd(filteredCoin.id)}
              colorScheme="blackAlpha"
            >
              Add
            </Button>
          </div>
        );
      })}
    </>
  );
};

export default SearchResults;
