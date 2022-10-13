import { useToast } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "./Auth";

type IBalance = {
  _id: string;
  user_id: string;
  transaction_id: string;
  value: number;
  entry: boolean;
  created_at: string;
  updated_at: string;
}

type ICreataBalance = {
  value: number;
  entry: boolean;
};

type BalanceContextData = {
  balanceTotal: number;
  balances: IBalance[];
  createBalance: (data: ICreataBalance) => Promise<boolean>;
};

const BalanceContext = createContext({} as BalanceContextData);

type BalanceProviderProps = {
  children: ReactNode;
}

export function BalanceProvider({ children }: BalanceProviderProps) {
  const toast = useToast();
  const { isAuthenticated } = useAuth();

  const [balances, setBalances] = useState<IBalance[]>([]);
  const [balanceTotal, setBalanceTotal] = useState<number>(0);

  useEffect(() => {
    if (isAuthenticated) {
      api.get('balances/total').then(response => {
        const { balanceTotal: total } = response.data;
        setBalanceTotal(total);
      });
      
      api.get('balances').then(response => {
        setBalances(response.data);
      });
    }
  }, [isAuthenticated]);

  async function createBalance(data: ICreataBalance) {
    try {
      const response = await api.post('balances', data);
      const { balance, balanceTotal: total } = response.data;
      setBalanceTotal(total);
      setBalances([...balances, balance]);
      return true;
    } catch (error: any) {
      toast({
        title: 'Falha ao realizar saque.',
        description: error?.response?.data?.message || 'Entre em contato com o administrador do sistema.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      });
      return false;
    }
  }

  return (
    <BalanceContext.Provider value={{ balances, balanceTotal, createBalance }}>
      {children}
    </BalanceContext.Provider>
  );
}

export const useBalance = () => useContext(BalanceContext);