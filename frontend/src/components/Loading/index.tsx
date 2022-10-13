import { Flex, Spinner } from "@chakra-ui/react";

export function Loading() {
  return (
    <Flex align="center" justify="center">
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.300'
        size='xl'
      />
    </Flex>
  );
}