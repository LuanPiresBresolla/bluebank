import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { NumberFormat } from "../../components/NumberFormat";
import { Sidebar } from "../../components/Sidebar";
import { useBalance } from "../../context/Balance";
import { GiCash } from "react-icons/gi";
import { format } from "date-fns";

export function Transactions() {
  const { balances, balanceTotal } = useBalance();

  const balancesFormatted = balances.map(item => ({
    ...item,
    createdAtFormatted: format(new Date(item.created_at), 'dd/MM/yyyy HH:mm'),
  }));

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="blackAlpha.300" p={["4", "8"]} mb="6">
          <Heading size="md" fontWeight="medium" display="flex" alignItems="center">
            <GiCash />
            &nbsp; Transações
          </Heading>

          <Table colorScheme="gray" mt="5">
            <Thead color="gray.100" width="8">
              <Tr>
                <Th p="3">ID Transação</Th>
                <Th p="3">Data</Th>
                <Th p="3">Espécie</Th>
                <Th p="3" textAlign="right">Valor</Th>
              </Tr>
            </Thead>
            <Tbody>
              {balancesFormatted.map(balance => (
                <Tr key={balance._id} fontSize="small">
                  <Td p="2">{balance.transaction_id}</Td>
                  <Td p="2">{balance.createdAtFormatted}</Td>
                  <Td p="2">{balance.entry ? 'Entrada' : 'Saída'}</Td>
                  <Td p="2" textAlign="right" fontWeight="medium">
                    <NumberFormat value={balance.value} />
                  </Td>
                </Tr>
              ))}
              <Tr fontWeight="bold">
                <Td p="2" colSpan={3}>Total</Td>
                <Td p="2" textAlign="right">
                  <NumberFormat value={balanceTotal} />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Flex>
  );
}