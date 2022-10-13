import { useToast } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

type ISignIn = {
  cpf: string;
  password: string;
};

type ISignUp = {
  cpf: string;
  password: string;
  name: string;
  email: string;
};

type IUser = {
  _id: string;
  cpf: string;
  password: string;
  name: string;
  email: string;
}

type AuthContextData = {
  isAuthenticated: boolean;
  user: IUser;
  signIn: (user: ISignIn) => Promise<void>;
  signUp: (user: ISignUp) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
}

export function signOut() {
  localStorage.clear();
  window.location.reload();
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    
  }, []);

  const [user, setUser] = useState<IUser>(() => {
    const data = localStorage.getItem('@bluebank/user');

    if (data) {
      const dataParse = JSON.parse(data || '') as IUser;
      return dataParse;
    }

    return {} as IUser;    
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function signIn({ cpf, password }: ISignIn) {
    try {
      const response = await api.post('sessions', { cpf, password });

      const { user, token } = response.data;

      localStorage.setItem('@bluebank/token', token);
      localStorage.setItem('@bluebank/user', JSON.stringify(user));
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      setUser(user);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Falha ao realizar login.',
        description: error?.response?.data?.message || 'Entre em contato com o administrador do sistema.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      });
    }
  }
  
  async function signUp({ cpf, password, email, name }: ISignUp) {
    try {
      const response = await api.post('users', { cpf, password, email, name });

      const { user, token } = response.data;

      localStorage.setItem('@bluebank/token', token);
      localStorage.setItem('@bluebank/user', JSON.stringify(user));
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      setUser(user);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Falha ao criar sua conta.',
        description: error?.response?.data?.message || 'Entre em contato com o administrador do sistema.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      });
    }
  }

  function signOut() {
    localStorage.clear();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, signUp, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);