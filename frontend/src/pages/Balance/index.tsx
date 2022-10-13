import { Box, Button, Flex, Heading, List, ListIcon, ListItem, SimpleGrid, Text, VStack, AlertDialogBody, AlertDialogCloseButton,
  AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialog as AlertDialogChakra } from "@chakra-ui/react";
import { useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../../components/Header";
import { InputNumeric } from "../../components/InputNumeric";
import { NumberFormat } from "../../components/NumberFormat";
import { Sidebar } from "../../components/Sidebar";
import { MdCheckCircle } from 'react-icons/md';
import { RiCurrencyLine } from "react-icons/ri";
import { useBalance } from "../../context/Balance";
import { useAlertDialog } from "../../context/AlertDialog";

type IBalance = {
  value: number;
}

export function Balance(){
  const { handleSubmit, watch, control, formState: { isSubmitting }, setValue } = useForm<IBalance>();
  const { createBalance, balanceTotal } = useBalance();
  
  const cancelRef = useRef(null);
  const { onOpen, isOpen, onClose } = useAlertDialog();

  const balanceParams = useMemo(() => {
    const value = watch('value');

    let balanceCount = 0;
    let hundred = 0;
    let fifty = 0;
    let twenty = 0;
    let ten = 0;

    if (!value) return {
      isValueInvalid: false,
      hundred,
      fifty,
      twenty,
      ten,
      value,
    };
    
    while (balanceCount < value && ((value - balanceCount) >= 100)) {
      balanceCount += 100;
      hundred++;
    }
    
    while (balanceCount < value && ((value - balanceCount) >= 50)) {
      balanceCount += 50;
      fifty++;
    }
    
    while (balanceCount < value && ((value - balanceCount) >= 20)) {
      balanceCount += 20;
      twenty++;
    }
    
    while (balanceCount < value && ((value - balanceCount) >= 10)) {
      balanceCount += 10;
      ten++;
    }

    if (balanceCount !== value) {
      return {
        isValueInvalid: true,
        hundred,
        fifty,
        twenty,
        ten,
        value,
      }
    };

    return {
      isValueInvalid: false,
      hundred,
      fifty,
      twenty,
      ten,
      value,
    }
  }, [watch('value')]);

  async function handleConfirmBalance() {
    onClose();
    const created = await createBalance({ value: balanceParams.value, entry: false });
    if (created) setValue('value', 0);
  }

  return (
    <Flex direction="column" h="100vh">
      <Header />
      
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="blackAlpha.300" p={["4", "8"]} mb="6">
          <Heading size="md" fontWeight="medium" display="flex" alignItems="center">
            <RiCurrencyLine />
            &nbsp; Saque Eletrônico
          </Heading>

          <VStack spacing={["4", "8"]} mt="10" as="form" onSubmit={handleSubmit(onOpen)}>
            <SimpleGrid minChildWidth="240px" spacing={["4", "8"]} w="100%">
              <Box
                bg="gray.100"
                w="60%"
                borderRadius={8}
                p="4"
              >
                <Text mb="3" fontWeight="medium">Cédulas disponíveis: 100, 50, 20, 10.</Text>
                <Text mb="3" fontWeight="medium">Saldo disponível em conta: R$ <NumberFormat value={balanceTotal} /></Text>

                <Text mb="3">Informe o valor desejado para sacar, apenas números inteiros.</Text>

                <InputNumeric control={control} name="value" />
                
                {balanceParams.isValueInvalid && <Text mt="3" color="red">Valor informado indisponível.</Text>}

                {!balanceParams.isValueInvalid && balanceParams.value > 0 && (
                  <List mt="3" display="flex" alignItems="center" justifyContent="space-around">
                    {balanceParams.hundred && (
                      <ListItem alignItems="center" display="flex">
                        <ListIcon as={MdCheckCircle} color='green.500' />
                        R$ 100 X {balanceParams.hundred}
                      </ListItem>
                    )}                    
                    
                    {balanceParams.fifty && (
                      <ListItem alignItems="center" display="flex">
                        <ListIcon as={MdCheckCircle} color='green.500' />
                        R$ 50 X {balanceParams.fifty}
                      </ListItem>
                    )}     

                    {balanceParams.twenty && (
                      <ListItem alignItems="center" display="flex">
                        <ListIcon as={MdCheckCircle} color='green.500' />
                        R$ 20 X {balanceParams.twenty}
                      </ListItem>
                    )}      

                    {balanceParams.ten && (
                      <ListItem alignItems="center" display="flex">
                        <ListIcon as={MdCheckCircle} color='green.500' />
                        R$ 10 X {balanceParams.ten}
                      </ListItem>
                    )}                    
                  </List>
                )}

                <Button
                  type="submit"
                  mt="5"
                  size="md"
                  colorScheme="blue"
                  _focus={{ border: 'none' }}
                  disabled={balanceParams.isValueInvalid || !balanceParams.value || isSubmitting}
                  isLoading={isSubmitting}
                >
                  Confirmar transação
                </Button>    
              </Box>
            </SimpleGrid>
          </VStack>
        </Box>
      </Flex>

      <AlertDialogChakra
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Confirmar Transação?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Deseja confirmar a transação? Está ação não poderá ser desfeita!
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Não
            </Button>
            <Button colorScheme="green" ml={3} onClick={handleConfirmBalance}>
              Sim
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogChakra>
    </Flex>
  );
}