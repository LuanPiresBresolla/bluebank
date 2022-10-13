import { Button, Flex, Heading, Image, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../../components/Form/Input';
import { useAuth } from '../../context/Auth';

import logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import { useState } from 'react';
import { InputMask } from '../../components/InputMask';

type ISignInFormData = {
  cpf: string;
  password: string;
  name: string;
  email: string;
};

const signInSchema = yup.object().shape({
  cpf: yup.string().required('CPF obrigatório'),
  password: yup.string().required('Senha obrigatória'),
});

const signUpSchema = yup.object().shape({
  cpf: yup.string().required('CPF obrigatório'),
  password: yup.string().required('Senha obrigatória'),
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail deve ser válido'),
});

export function SignIn() {
  const { signIn, signUp } = useAuth();

  const [stage, setStage] = useState(1);
  const [isCheckingUserExists, setIsCheckingUserExists] = useState(false);
  const [userExists, setUserExists] = useState(true);
  const [userChecked, setUserChecked] = useState(false);

  const { control, register, handleSubmit, getValues, formState: { isSubmitting, errors } } = useForm<ISignInFormData>({
    resolver: yupResolver(userExists ? signInSchema : signUpSchema)
  });

  async function handleSignIn({ cpf, password, email, name }: ISignInFormData) {
    if (userExists) {
      await signIn({ cpf, password });
    } else {
      await signUp({ cpf, password, email, name });
    }
  }

  async function checkUserExists() {
    try {
      setIsCheckingUserExists(true);
      const cpf = getValues('cpf');
      const response = await api.get(`/users/check?cpf=${cpf}`);
      setUserExists(response.data.user);
      setIsCheckingUserExists(false);
      setUserChecked(true);
      setStage(2);
    } catch (error: any) {
      alert(error.message);
      setIsCheckingUserExists(false);
    }
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      flexDir="column"
    >
      <Image src={logo} mb="10" />

      <Heading size="lg" mb="10" textAlign="center">Informe seus dados <br/> para continuar</Heading>

      <Flex
        onSubmit={handleSubmit(handleSignIn)}
        as="form"
        width="100%"
        maxWidth={360}
        bg="blackAlpha.100"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="4">         
          <InputMask
            control={control}
            name="cpf"
            mask="###.###.###-##"
            placeholder="000.000.000-00"
            label="CPF"
            error={errors.cpf}
          />

          {userExists && userChecked && (
            <Input
              {...register('password')}
              name="password"
              type="password"
              placeholder="Senha"
              label="Senha"
              error={errors.password}
            />
          )}

          {!userExists && userChecked && (
            <>
              <Input
                {...register('name',)}
                name="name"
                type="text"
                placeholder="Nome"
                label="Nome"
                error={errors.name}
              />
              
              <Input
                {...register('email')}
                name="email"
                type="email"
                placeholder="E-mail"
                label="E-mail"
                error={errors.email}
              />
              
              <Input
                {...register('password')}
                name="password"
                type="password"
                placeholder="Senha"
                label="Senha"
                error={errors.password}
              />
            </>
          )}

          {stage === 1 && (
            <Button
              type="button"
              mt="6"
              size="md"
              colorScheme="blue"
              _focus={{ border: 'none' }}
              onClick={checkUserExists}
              isLoading={isCheckingUserExists}
            >
              Seguinte
            </Button>
          )}
          
          {stage === 2 && (
            <Button
              type="submit"
              mt="6"
              size="md"
              colorScheme="blue"
              _focus={{ border: 'none' }}
              isLoading={isSubmitting}
            >
              Seguinte
            </Button>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
}