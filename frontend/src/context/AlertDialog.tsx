import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useEffect } from "react";

type AlertDialogContextData = UseDisclosureReturn;

const AlertDialogContext = createContext({} as AlertDialogContextData);

type AlertDialogProviderProps = {
  children: ReactNode;
}

export function AlertDialogProvider({ children }: AlertDialogProviderProps) {
  const disclosure = useDisclosure();

  useEffect(() => {
    disclosure.onClose();
  }, []);

  return (
    <AlertDialogContext.Provider value={disclosure}>
      {children}
    </AlertDialogContext.Provider>
  );
}

export const useAlertDialog = () => useContext(AlertDialogContext);