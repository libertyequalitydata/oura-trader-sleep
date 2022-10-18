import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ChakraProvider,
} from "@chakra-ui/react";
import SearchCoins from "./SearchCoins";
import SearchResults from "./SearchResults";

const CoinOptions = ({ coins, onAdd }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState("");

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ChakraProvider>
      <Button colorScheme="blackAlpha" size="xs" onClick={onOpen}>
        Choose an asset
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        isCentered
        motionPreset="slideInBottom"
        scrollBehavior="inside"
      >
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent bg="#212121" color="white" borderRadius="20">
          <ModalHeader>Choose an asset</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SearchCoins handleInput={handleInput} />
            {filteredCoins.length === 0 && <p>No results.</p>}
            {query.length >= 3 && (
              <SearchResults filteredCoins={filteredCoins} onAdd={onAdd} />
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blackAlpha" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default CoinOptions;
