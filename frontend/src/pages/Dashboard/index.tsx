import { Box, Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { NumberFormat } from "../../components/NumberFormat";
import { Sidebar } from "../../components/Sidebar";
import { useBalance } from "../../context/Balance";
import { RiDashboardLine } from "react-icons/ri";

export function Dashboard() {
  const { balanceTotal } = useBalance();

  return (
    <Flex direction="column" h="100vh">
      <Header />
      
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="blackAlpha.300" p={["4", "8"]} mb="6">
          <Heading size="md" fontWeight="medium" display="flex" alignItems="center">
            <RiDashboardLine />
            &nbsp; Dashboard
          </Heading>

          <VStack spacing={["4", "8"]} mt="10">
            <SimpleGrid minChildWidth="240px" spacing={["4", "8"]} w="100%">
              <Box
                bg="gray.100"
                w="20rem"
                borderRadius={8}
                p="4"
              >
                <Heading size="md" fontWeight="normal" mb="4">SALDO DISPONÍVEL</Heading>

                <Heading size="md" fontWeight="medium" color="blue.500">
                  R$ <NumberFormat value={balanceTotal} />
                </Heading>                
              </Box>
            </SimpleGrid>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}